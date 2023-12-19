import { useRouter } from 'vue-router';
import request from './refreshTokenRequest';
import { ElMessage } from 'element-plus'

const MAX_ERROR_COUNT = 5;
let currentCount = 0;
const queue = [];
let isRefresh = false;

const { router } = useRouter()
export default async function refreshToken(error) {
  // 退出登录
  const logout = () => {
    ElMessage.error('身份过期，请重新登录')

    router.replace('/login')
    // 清空数据 token的数据  
    // Session.clear();
    localStorage.clear()

    return Promise.reject(error);
  };
  if (error.config.url?.includes('refresh')) {
    // 如果url中包含refresh 退出登录
    logout();
  }
  const refresh = localStorage.getItem('refresh') ?? null;

  const { config } = error;
  if (!refresh) {  //如果没找到替换的refreshtoken退出登录
    logout();
  }
  // 判断当前是否为刷新状态中（防止多个请求导致多次调refresh接口）
  if (!isRefresh) {
    // 设置当前状态为刷新中
    isRefresh = true;
    // 如果重发次数超过，直接退出登录
    if (currentCount > MAX_ERROR_COUNT) {
      logout();
    }
    // 增加重试次数
    currentCount += 1;

    try {
      const {
        data: { access },
      } = await UserAuthApi.refreshToken(refresh);  //用refreshToken刷新token

      localStorage.setItem('token', access)   //把新token存到本地
      // 重置重发次数
      currentCount = 0;
      // 遍历队列，重新发起请求
      queue.forEach((cb) => cb(access));//用新token吧阻塞的接口全部重新请求
      // 返回请求数据
      return request(error.config);
    } catch {
     // 刷新token失败，直接退出登录
      ElMessage.error('请重新登录')
      localStorage.clear()

      router.replace('/login')
      return Promise.reject(error);
    } finally {
       // 重置状态
      isRefresh = false;
    }
  } else {
    // 当前正在尝试刷新token，先返回一个promise阻塞请求并推进请求列表中
    return new Promise((resolve) => {
      // 缓存网络请求，等token刷新后直接执行
      queue.push((newToken) => {
        Reflect.set(config.headers, 'authorization', newToken);
        resolve(request(config));
      });
    });
  }
}