async function carregarNoticias() {
    try {
        // Agora lemos o ficheiro local, evitando o erro de CORS
        const response = await fetch('./noticias.json'); 
        const data = await response.json();
        
        const container = document.getElementById('tech-news');
        container.innerHTML = ''; // Limpa o "Carregando..."

        data.articles.forEach(noticia => {
            container.innerHTML += `
                <div class="news-card">
                    <h4>${noticia.title}</h4>
                    <p>${noticia.description}</p>
                    <a href="${noticia.url}" target="_blank">Ler mais</a>
                </div>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar notícias locais:", error);
    }
}