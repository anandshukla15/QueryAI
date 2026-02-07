import app from './app.js';
import initDb from './config/initDb.js';

const PORT =  8000;
console.log(`Server is running on port ${PORT}`);

app.get('/', (req, res) => {
  res.send('Welcome to the QueryAI Backend Server!');
});

const start = async () => {
  try {
    await initDb();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start due to DB init error', err);
    process.exit(1);
  }
};

start();