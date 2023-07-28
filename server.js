const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Importa la librería de CORS

app.use(cors());

const app = express();
const port = 8081;

app.use(express.static('public'));

app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const wikipediaApiUrl = 'https://en.wikipedia.org/w/api.php';
    const response = await axios.get(wikipediaApiUrl, {
      params: {
        action: 'query',
        list: 'search',
        format: 'json',
        srsearch: searchTerm
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor de proxy escuchando en http://localhost:${port}`);
});
