/* eslint-disable max-len */
import { build, ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import linter from 'vite-plugin-linter'

const { EsLinter, linterPlugin, TypeScriptLinter } = linter
// https://vitejs.dev/config/

export default defineConfig(
    (configEnv: ConfigEnv): UserConfig | Promise<UserConfig> => {
        // const env = loadEnv(mode, process.cwd(), '')
        return {
            base: '/robot-image-ui/',
            plugins: [
                react(),
                linterPlugin({
                    include: ['./src/**/*.ts', './src/**/*.tsx'],
                    linters: [
                        new EsLinter({
                            configEnv: configEnv,
                            serveOptions: { clearCacheOnStart: true },
                        }),
                        new TypeScriptLinter(),
                    ],
                }),
            ],
            // define: {

            //   API_URL: '',
            // },
        }
    },
)
