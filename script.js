       document.getElementById('searchForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const query = document.getElementById('query').value;
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`)
                .then(response => response.json())
                .then(data => {
                    const results = data.query.search;
                    results.forEach(result => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <h3>${result.title}</h3>
                            <p>${result.snippet}...</p>
                            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Read more</a>
                        `;
                        resultsDiv.appendChild(resultItem);
                    });
                })
                .catch(error => {
                    resultsDiv.innerHTML = '<p>An error occurred while fetching the search results.</p>';
                    console.error('Error fetching search results:', error);
                });
        });
