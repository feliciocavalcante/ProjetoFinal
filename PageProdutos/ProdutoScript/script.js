document.addEventListener('DOMContentLoaded', function() {
  
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const filterMobileToggle = document.querySelector('.filter-mobile-toggle');
    const filtersPanel = document.querySelector('.filters');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const priceSortSelect = document.getElementById('price-sort');
    const productGrid = document.querySelector('.product-grid');
    

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
   
    filterMobileToggle.addEventListener('click', function() {
        filtersPanel.classList.toggle('active');
    });
    
 
    applyFiltersBtn.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            filtersPanel.classList.remove('active');
        }
    });
    
  
    priceSortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const productCards = Array.from(document.querySelectorAll('.product-card'));
        
       
        productCards.sort(function(a, b) {
            const priceA = parseFloat(a.getAttribute('data-price'));
            const priceB = parseFloat(b.getAttribute('data-price'));
            
            if (sortValue === 'low-to-high') {
                return priceA - priceB; 
            } else if (sortValue === 'high-to-low') {
                return priceB - priceA; 
            } else {
                
                return priceA - priceB;
            }
        });
        
        
        while (productGrid.firstChild) {
            productGrid.removeChild(productGrid.firstChild);
        }
        
       
        productCards.forEach(function(card) {
            productGrid.appendChild(card);
        });
    });
    
    
    document.addEventListener('click', function(event) {
        
        if (!mobileMenu.contains(event.target) && !mobileMenuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
        
        
        if (window.innerWidth <= 768) {
            if (!filtersPanel.contains(event.target) && !filterMobileToggle.contains(event.target) && filtersPanel.classList.contains('active')) {
                filtersPanel.classList.remove('active');
            }
        }
    });
    
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            filtersPanel.style.display = 'block';
        } else {
            if (!filtersPanel.classList.contains('active')) {
                filtersPanel.style.display = 'none';
            }
        }
    });
    
    
    priceSortSelect.dispatchEvent(new Event('change'));
});