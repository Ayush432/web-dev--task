document.addEventListener('DOMContentLoaded', () => {
    const trendingContent = [
      { id: 1, title: 'Movie 1', image: 'images/movie1.jpg' },
      { id: 2, title: 'Movie 2', image: 'images/movie2.jpg' },
      // Add more content as needed
    ];
  
    const seriesContent = [
      { id: 3, title: 'Series 1', image: 'images/series1.jpg' },
      { id: 4, title: 'Series 2', image: 'images/series2.jpg' },
      // Add more content as needed
    ];
  
    const recommendedContent = [
      { id: 5, title: 'Recommended 1', image: 'images/recommended1.jpg' },
      { id: 6, title: 'Recommended 2', image: 'images/recommended2.jpg' },
      // Add more content as needed
    ];
  
    function renderContent(containerId, content) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';
      content.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('content-item');
        div.innerHTML = `<img src="${item.image}" alt="${item.title}"><p>${item.title}</p>`;
        div.addEventListener('click', () => {
          window.location.href = `details.html?id=${item.id}`;
        });
        container.appendChild(div);
      });
    }
  
    renderContent('trending-content', trendingContent);
    renderContent('series-content', seriesContent);
    renderContent('recommended-content', recommendedContent);
  
    document.getElementById('search-bar').addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const filteredTrending = trendingContent.filter(item => item.title.toLowerCase().includes(query));
      const filteredSeries = seriesContent.filter(item => item.title.toLowerCase().includes(query));
      const filteredRecommended = recommendedContent.filter(item => item.title.toLowerCase().includes(query));
      
      renderContent('trending-content', filteredTrending);
      renderContent('series-content', filteredSeries);
      renderContent('recommended-content', filteredRecommended);
    });
  });
  