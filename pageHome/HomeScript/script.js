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


