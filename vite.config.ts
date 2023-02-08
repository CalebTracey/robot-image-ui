import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(
  ({ command, mode }: ConfigEnv): UserConfig | Promise<UserConfig> => {
    // const env = loadEnv(mode, process.cwd(), '')
    return {
      // vite config
      base: '/robot-image-ui/',
      plugins: [react()],
      // define: {
      //   API_URL: '',
      // },
    }
  },
)
