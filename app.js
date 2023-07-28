// Función para hacer una solicitud a la API de Wikipedia usando Axios
async function fetchArticles(searchTerm) {
    try {
      const wikipediaApiUrl = 'http://localhost:8081/api/search';
      const response = await axios.get(wikipediaApiUrl, {
        params: {
          action: 'query',
          list: 'search',
          format: 'json',
          srsearch: searchTerm
        }
      });

      console.log(response.data);
  
      const articles = response?.data?.query?.search || [];
      return articles;
    } catch (error) {
      console.error('Error al obtener los artículos:', error);
      return [];
    }
  }
  
  // Mostrar los resultados en la página
  function displayArticles(articles) {
    const articlesList = document.getElementById('articlesList');
    articlesList.innerHTML = '';
  
    articles.forEach(article => {
      const articleCard = document.createElement('div');
      articleCard.classList.add('article-card');
  
      const title = document.createElement('h2');
      title.textContent = article.title;
  
      const snippet = document.createElement('p');
      snippet.textContent = article.snippet;
  
      const link = document.createElement('a');
      link.textContent = 'Ver artículo';
      link.href = `https://en.wikipedia.org/?curid=${article.pageid}`;
      link.target = '_blank';
  
      articleCard.appendChild(title);
      articleCard.appendChild(snippet);
      articleCard.appendChild(link);
  
      articlesList.appendChild(articleCard);
    });
  }
  
  // Mnejar el clic del botón de búsqueda
  async function handleSearchButtonClick() {
    const searchTerm = document.getElementById('searchInput').value;
    const articles = await fetchArticles(searchTerm);
    displayArticles(articles);
  }
  
  // Asignar evento click al botón de búsqueda
  document.getElementById('searchButton').addEventListener('click', handleSearchButtonClick);
  
