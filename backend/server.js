import express from 'express';
import router from './src/index.js';
import cors from 'cors'; 


const app = express();
const PORT = 3000; 

app.use(cors())

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});