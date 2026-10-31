
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function chatApiPlugin() {
  return {
    name: 'portfolio-chat-api',

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (
          req.url === '/api/chat' ||
          req.url?.startsWith('/api/chat?')
        ) {
          const { handleChatRequest } = await import('./server/chatService.js')
          return handleChatRequest(req, res)
        }

        next()
      })
    },

    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (
          req.url === '/api/chat' ||
          req.url?.startsWith('/api/chat?')
        ) {
          const { handleChatRequest } = await import('./server/chatService.js')
          return handleChatRequest(req, res)
        }

        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), chatApiPlugin()],
})
