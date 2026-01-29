import app from './app.js';

const PORT =  5000;
//console.log(`Server is running on port ${PORT}`);

app.get('/', (req, res) => {
  res.send('Welcome to the QueryAI Backend Server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});