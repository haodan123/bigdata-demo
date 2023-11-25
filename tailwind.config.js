/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // #30bf6c    选中前面的颜色  按住command+k command+g 一键生成颜色  vscode插件tailwind shades
      //       colors:{
      //         green: {
      //           100: "#d6f2e2",
      //           200: "#ace5c4",
      //           300: "#83d9a7",
      //           400: "#59cc89",
      //           500: "#30bf6c",
      //           600: "#269956",
      //           700: "#1d7341",
      //           800: "#134c2b",
      //           900: "#0a2616"
      // },
      //       }
    },
  },
  plugins: [],
}