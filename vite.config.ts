import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    // vite config
    define: {
      APP_ENV: env.API_KEY,
      publicPath: process.env.NODE_ENV === 'github-pages' ? 
      ('/robot-image-ui/') : ( '/')
    },
  }
  // plugins: [react()],
  // publicPath: process.env.NODE_ENV === 'production' ? '/robot-image-ui/' : '/'
})

// module.exports = {  
//   config,
//   publicPath: process.env.NODE_ENV === 'production' ? '/robot-image-ui/' : '/'
// };