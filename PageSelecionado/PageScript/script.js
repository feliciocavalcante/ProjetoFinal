const mainImage = document.getElementById('main-product-image');
const thumbnails = document.querySelectorAll('.thumbnails img');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');
const mainNav = document.getElementById('main-nav');

document.querySelectorAll('.sizes span').forEach(span => {
  span.addEventListener('click', function() {
   
    document.querySelectorAll('.sizes span').forEach(s => s.classList.remove('active'));
    
    
    this.classList.add('active');
  });
});

mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    mainNav.classList.toggle('open');
    document.body.classList.toggle('mobile-menu-open'); 
});

mobileMenuClose.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mainNav.classList.remove('open');
    document.body.classList.remove('mobile-menu-open'); 
});


document.addEventListener('click', (event) => {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(event.target) && event.target !== mobileMenuToggle) {
        mobileMenu.classList.remove('open');
        mainNav.classList.remove('open');
        document.body.classList.remove('mobile-menu-open'); 
    }
});

thumbnails.forEach(thumb => {
  thumb.addEventListener('click', function () {
    
    const newSrc = this.getAttribute('src');
    mainImage.setAttribute('src', newSrc);

    
    thumbnails.forEach(img => img.classList.remove('active'));
    this.classList.add('active');
  });
});
