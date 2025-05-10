document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const filterMobileToggle = document.querySelector('.filter-mobile-toggle');
    const filtersPanel = document.querySelector('.filters');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const priceSortSelect = document.getElementById('price-sort');
    const productGrid = document.querySelector('.product-grid');
    
    // Toggle menu mobile principal
    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // Toggle painel de filtros em dispositivos móveis
    filterMobileToggle.addEventListener('click', function() {
        filtersPanel.classList.toggle('active');
    });
    
    // Fechar filtros ao clicar em "Aplicar Filtros"
    applyFiltersBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            filtersPanel.classList.remove('active');
        }
    });
    
    // Função para ordenar produtos por preço
    priceSortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        
        // Ordenar produtos com base na seleção
        productCards.sort(function(a, b) {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            
            if (sortValue === 'low-to-high') {
                return priceA - priceB; // Do menor para o maior
            } else if (sortValue === 'high-to-low') {
                return priceB - priceA; // Do maior para o menor
            } else {
                // Ordenação padrão - poderia ser baseada na ordem original
                // Neste caso, vamos manter a ordenação por preço crescente como padrão
                return priceA - priceB;
            }
        });
        
        // Remover todos os produtos do grid
        while (productGrid.firstChild) {
            productGrid.removeChild(productGrid.firstChild);
        }
        
        // Adicionar produtos ordenados de volta ao grid
        productCards.forEach(function(card) {
            productGrid.appendChild(card);
        });
    });
    
    // Fechar menus ao clicar fora
    document.addEventListener('click', function(event) {
        // Fechar menu móvel se clicou fora
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
        
        // Fechar filtros móveis se clicou fora
        if (window.innerWidth <= 768) {
            if (!filtersPanel.contains(event.target) && !filterMobileToggle.contains(event.target) && filtersPanel.classList.contains('active')) {
                filtersPanel.classList.remove('active');
            }
        }
    });
    
    // Ajustar visibilidade dos filtros ao redimensionar a janela
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            filtersPanel.style.display = 'block';
        } else {
            if (!filtersPanel.classList.contains('active')) {
                filtersPanel.style.display = 'none';
            }
        }
    });
    
    // Inicializar a ordenação padrão
    priceSortSelect.dispatchEvent(new Event('change'));
});