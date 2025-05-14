document.addEventListener("DOMContentLoaded", () => {
  
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".carousel-arrow.prev")
  const nextButton = document.querySelector(".carousel-arrow.next")

  let currentSlide = 0
  const totalSlides = slides.length


  function showSlide(index) {
    
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

   
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })


    slides[index].classList.add("active")
    dots[index].classList.add("active")

   
    currentSlide = index

   
    updateNavButtons()
  }

  
  function updateNavButtons() {
    prevButton.style.opacity = currentSlide === 0 ? "0.5" : "1"
    nextButton.style.opacity = currentSlide === totalSlides - 1 ? "0.5" : "1"

    prevButton.disabled = currentSlide === 0
    nextButton.disabled = currentSlide === totalSlides - 1
  }

 
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1)
    }
  }

  
  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1)
    }
  }


  nextButton.addEventListener("click", nextSlide)
  prevButton.addEventListener("click", prevSlide)


  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  
  showSlide(0)

 
  let autoSlideInterval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      nextSlide()
    } else {
      showSlide(0)
    }
  }, 5000)

 
  const carouselContainer = document.querySelector(".carousel-container")
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval)
  })

 
  carouselContainer.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      if (currentSlide < totalSlides - 1) {
        nextSlide()
      } else {
        showSlide(0)
      }
    }, 5000)
  })
})

const toggleButton = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

toggleButton.addEventListener('click', () => {
    navList.classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartOverlay = document.getElementById('cartOverlay');
    const emptyCartBtn = document.querySelector('.empty-cart-btn');
    
    // Toggle cart dropdown when clicking on cart icon
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            toggleCartDropdown();
        });
        
        // Close cart when clicking outside
        document.addEventListener('click', function(e) {
            if (cartDropdown.classList.contains('active') && 
                !cartDropdown.contains(e.target) && 
                e.target !== cartIcon && 
                !cartIcon.contains(e.target)) {
                closeCartDropdown();
            }
        });
        
        // Close cart when clicking overlay (mobile)
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCartDropdown);
        }
        
        // Empty cart functionality
        if (emptyCartBtn) {
            emptyCartBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Clear cart items
                const cartItems = document.querySelector('.cart-items');
                if (cartItems) {
                    cartItems.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio</p>';
                    
                    // Update total
                    const totalPrice = document.querySelector('.total-price');
                    if (totalPrice) {
                        totalPrice.textContent = 'R$ 0,00';
                    }
                }
                
                // Style the empty message
                const emptyMessage = document.querySelector('.empty-cart-message');
                if (emptyMessage) {
                    emptyMessage.style.textAlign = 'center';
                    emptyMessage.style.padding = '20px 0';
                    emptyMessage.style.color = '#666';
                }
            });
        }
    }
    
    // Helper functions
    function toggleCartDropdown() {
        cartDropdown.classList.toggle('active');
        
        // For mobile, toggle overlay
        if (window.innerWidth <= 768 && cartOverlay) {
            cartOverlay.classList.toggle('active');
            
            // Prevent body scrolling when cart is open
            if (cartDropdown.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
        
        // Add animation to cart items
        if (cartDropdown.classList.contains('active')) {
            animateCartItems();
        }
    }
    
    function closeCartDropdown() {
        cartDropdown.classList.remove('active');
        if (cartOverlay) {
            cartOverlay.classList.remove('active');
        }
        document.body.style.overflow = '';
    }
    
    function animateCartItems() {
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach((item, index) => {
            // Reset animation
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            
            // Apply animation with delay based on index
            item.style.animation = `fadeInUp 0.3s ease forwards ${index * 0.1}s`;
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
        });
        
        // Add keyframes for animation if not already added
        if (!document.querySelector('#cart-animations')) {
            const style = document.createElement('style');
            style.id = 'cart-animations';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
});