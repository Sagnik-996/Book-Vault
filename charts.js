// js/charts.js

document.addEventListener('DOMContentLoaded', () => {
    
    let progressChartInstance = null;
    let genreChartInstance = null;

    window.renderCharts = function() {
        const progressCtx = document.getElementById('progressChart');
        const genreCtx = document.getElementById('genreChart');
        
        if (!progressCtx || !genreCtx) return;

        const books = JSON.parse(localStorage.getItem('bookvault_books')) || [];
        const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim();
        const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--glass-border').trim();

        // Destroy previous instances to avoid rendering overlap
        if (progressChartInstance) progressChartInstance.destroy();
        if (genreChartInstance) genreChartInstance.destroy();

        // --- Progress Chart (Status Distribution - Doughnut) ---
        let completed = 0, reading = 0, toRead = 0;
        books.forEach(b => {
            if (b.status === 'Completed') completed++;
            else if (b.status === 'Currently Reading') reading++;
            else toRead++;
        });

        progressChartInstance = new Chart(progressCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Currently Reading', 'To Read'],
                datasets: [{
                    data: [completed, reading, toRead],
                    backgroundColor: ['#10B981', '#4F46E5', '#F59E0B'],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: textColor, font: { family: 'Outfit' } }
                    }
                },
                cutout: '70%'
            }
        });

        // --- Genre Chart (Bar) ---
        const genreCounts = {};
        books.forEach(b => {
            genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1;
        });
        
        const genres = Object.keys(genreCounts);
        const counts = Object.values(genreCounts);

        genreChartInstance = new Chart(genreCtx, {
            type: 'bar',
            data: {
                labels: genres,
                datasets: [{
                    label: 'Books by Genre',
                    data: counts,
                    backgroundColor: 'rgba(79, 70, 229, 0.6)',
                    borderColor: '#4F46E5',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: { stepSize: 1, color: textColor },
                        grid: { color: gridColor }
                    },
                    x: {
                        ticks: { color: textColor },
                        grid: { display: false }
                    }
                }
            }
        });
    };

    // Initial Render
    setTimeout(renderCharts, 100); // small delay to ensure CSS variables are loaded
});
