document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('signup-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            
            if (!nome || !email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
          
            alert('Conta criada com sucesso!');
            form.reset();
        });
    }
    
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
  
    const shoeImage = document.getElementById('shoe-image');
    
    if (shoeImage) {
        
        shoeImage.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(-5deg) scale(1.05)';
        });
        
        shoeImage.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(-15deg)';
        });
        
       
        let position = 0;
        const floatAnimation = () => {
            position += 0.01;
            const yOffset = Math.sin(position) * 10;
            shoeImage.style.transform = `rotate(-15deg) translateY(${yOffset}px)`;
            requestAnimationFrame(floatAnimation);
        };
        
     
        floatAnimation();
    }
    
    
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        
        if (header) {
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.classList.add('mobile-menu-btn');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            header.querySelector('.container').appendChild(mobileMenuBtn);
            
            mobileMenuBtn.addEventListener('click', function() {
                
                alert('Menu mobile seria aberto aqui');
            });
        }
    };
    
 
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    

    window.addEventListener('resize', function() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (window.innerWidth < 768 && !mobileMenuBtn) {
            createMobileMenu();
        } else if (window.innerWidth >= 768 && mobileMenuBtn) {
            mobileMenuBtn.remove();
        }
    });
});