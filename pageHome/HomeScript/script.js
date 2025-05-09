document.addEventListener("DOMContentLoaded", () => {
  // Elementos do carrossel
  const slides = document.querySelectorAll(".carousel-slide")
  const dots = document.querySelectorAll(".dot")
  const prevButton = document.querySelector(".carousel-arrow.prev")
  const nextButton = document.querySelector(".carousel-arrow.next")

  let currentSlide = 0
  const totalSlides = slides.length

  // Função para mostrar um slide específico
  function showSlide(index) {
    // Esconde todos os slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Remove a classe active de todos os dots
    dots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Mostra o slide atual
    slides[index].classList.add("active")
    dots[index].classList.add("active")

    // Atualiza o índice do slide atual
    currentSlide = index

    // Atualiza o estado dos botões de navegação
    updateNavButtons()
  }

  // Função para atualizar o estado dos botões de navegação
  function updateNavButtons() {
    prevButton.style.opacity = currentSlide === 0 ? "0.5" : "1"
    nextButton.style.opacity = currentSlide === totalSlides - 1 ? "0.5" : "1"

    prevButton.disabled = currentSlide === 0
    nextButton.disabled = currentSlide === totalSlides - 1
  }

  // Função para ir para o próximo slide
  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      showSlide(currentSlide + 1)
    }
  }

  // Função para ir para o slide anterior
  function prevSlide() {
    if (currentSlide > 0) {
      showSlide(currentSlide - 1)
    }
  }

  // Adiciona eventos aos botões de navegação
  nextButton.addEventListener("click", nextSlide)
  prevButton.addEventListener("click", prevSlide)

  // Adiciona eventos aos dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Inicializa o carrossel
  showSlide(0)

  // Adiciona navegação automática a cada 5 segundos
  let autoSlideInterval = setInterval(() => {
    if (currentSlide < totalSlides - 1) {
      nextSlide()
    } else {
      showSlide(0)
    }
  }, 5000)

  // Pausa a navegação automática quando o mouse estiver sobre o carrossel
  const carouselContainer = document.querySelector(".carousel-container")
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval)
  })

  // Retoma a navegação automática quando o mouse sair do carrossel
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
