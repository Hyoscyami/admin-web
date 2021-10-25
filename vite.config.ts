import { defineConfig } from 'vite'
import { resolve } from 'path' // 主要用于alias文件路径别名
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svgBuilder'

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgBuilder('./src/icons/svg/')], // 配置需要使用的插件列表，这里将vue和图标添加进去
  // 配置文件别名 vite1.0是/@/  2.0改为/@
  // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件

  resolve: {
    alias: {
      '@': pathResolve('src'),
      //解决path不能在浏览器使用的问题
      path: 'path-browserify'
    }
  },
  // 强制预构建插件包
  optimizeDeps: {
    include: ['axios']
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    chunkSizeWarningLimit: 1500 //打包单文件大小
  },
  // 本地运行配置，及反向代理配置
  server: {
    port: 9528,
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
