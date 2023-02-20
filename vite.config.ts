/* eslint-disable max-len */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import linter from 'vite-plugin-linter'
import { defineConfig } from 'vite'

const { EsLinter, linterPlugin, TypeScriptLinter } = linter

// https://vitejs.dev/config/

export default defineConfig(({ command, mode, ssrBuild }) => {
    return {
        plugins: [react()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/setupTests.ts'],
        },
    }
    // define: {

    //   API_URL: '',
    // },
})
