async function carregarNoticias() {
    const container = document.getElementById('tech-news');

    // Exemplo usando uma URL de notícias de tecnologia (usando GNews como exemplo gratuito)
    const url = 'https://gnews.io/api/v4/top-headlines?category=technology&lang=pt&country=br&apikey=f93fd30ffd8c9e0137b8797ef8a903d3';

    // Indicador de carregamento
    container.innerHTML = '<p>Carregando notícias...</p>';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }

        const data = await response.json();

        // Validação dos dados
        if (!data.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
            container.innerHTML = '<p>Nenhuma notícia encontrada.</p>';
            return;
        }

        // Limpar container e construir elementos dinamicamente
        container.innerHTML = '';
        const fragment = document.createDocumentFragment();

        data.articles.slice(0, 3).forEach(article => {
            const div = document.createElement('div');
            div.className = 'news-card';

            // Adicionar imagem se disponível
            let imageHtml = '';
            if (article.image) {
                imageHtml = `<img src="${article.image}" alt="Imagem da notícia" style="max-width: 100%; height: auto; margin-bottom: 10px;">`;
            }

            // Adicionar descrição se disponível
            let descriptionHtml = '';
            if (article.description) {
                descriptionHtml = `<p>${article.description}</p>`;
            }

            div.innerHTML = `
                ${imageHtml}
                <h4>${article.title}</h4>
                ${descriptionHtml}
                <a href="${article.url}" target="_blank">Acessar Notícia</a>
            `;

            fragment.appendChild(div);
        });

        container.appendChild(fragment);

    } catch (error) {
        console.error('Erro ao carregar notícias:', error);
        if (error.message.includes('Erro na API')) {
            container.innerHTML = '<p>Erro ao acessar o feed de notícias. Verifique a chave da API.</p>';
        } else if (error.name === 'TypeError') {
            container.innerHTML = '<p>Erro de conexão. Verifique sua internet.</p>';
        } else {
            container.innerHTML = '<p>Erro ao carregar notícias. Tente novamente mais tarde.</p>';
        }
    }
}

carregarNoticias();