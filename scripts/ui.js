// UI Functions - Print, Offcanvas, Mobile Menu

function printResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer.classList.contains('hidden')) {
        alert('Please calculate your salary first!');
        return;
    }

    const printContent = resultsContainer.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');

    printWindow.document.write(`
        <html>
        <head>
            <title>Cyprus Salary Calculator Results</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .result-card { margin-bottom: 20px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                .result-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
                .result-item:last-child { border-bottom: none; }
                .net { background: #f0f9ff; font-weight: bold; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                th { background: #f5f5f5; }
            </style>
        </head>
        <body>
            <h1>Cyprus Salary Calculator Results</h1>
            ${printContent}
            <script>window.onload = function() { window.print(); }<\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

function toggleOffcanvas() {
    const overlay = document.getElementById('offcanvasOverlay');
    const panel = document.getElementById('offcanvasPanel');

    overlay.classList.add('active');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeOffcanvas() {
    const overlay = document.getElementById('offcanvasOverlay');
    const panel = document.getElementById('offcanvasPanel');

    overlay.classList.remove('active');
    panel.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Mobile menu functions
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const panel = document.getElementById('mobileMenuPanel');

    overlay.classList.add('active');
    panel.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    const panel = document.getElementById('mobileMenuPanel');

    overlay.classList.remove('active');
    panel.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close offcanvas and mobile menu with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeOffcanvas();
            closeMobileMenu();
        }
    });
});