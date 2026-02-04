import app from './app.js';

const PORT =  8000;
console.log(`Server is running on port ${PORT}`);

app.get('/', (req, res) => {
  res.send('Welcome to the QueryAI Backend Server!');
});

app.listen(8000, '0.0.0.0', () => {
  console.log("Backend running on port 8000");
});