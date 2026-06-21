import app from './backend/src/app';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { PORT } from './backend/src/config/config';
import { connectDB } from './backend/src/config/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  // Connect to Database (MongoDB or local fallback store)
  await connectDB();

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      root: path.resolve(__dirname, 'frontend'),
      configFile: path.resolve(__dirname, 'frontend/vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('\n✅ FinanceFlow is running!');
    console.log(`🚀 Local:            http://localhost:${PORT}`);
    console.log(`🌍 Network:          http://0.0.0.0:${PORT}`);
    console.log('\nPress Ctrl+C to stop\n');
  });
}

startServer();
