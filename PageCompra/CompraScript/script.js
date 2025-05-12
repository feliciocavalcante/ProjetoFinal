document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const quantityValue = document.getElementById('quantityValue');
    const itemTotal = document.getElementById('itemTotal');
    const subtotalValue = document.getElementById('subtotalValue');
    const totalValue = document.getElementById('totalValue');
    
    // Preços base
    const productPrice = 219.00;
    const shippingPrice = 19.90;
    const discountPrice = 21.90;
    
    // Quantidade inicial
    let quantity = 1;
    
    // Função para formatar preço
    function formatPrice(price) {
        return 'R$ ' + price.toFixed(2).replace('.', ',');
    }
    
    // Função para atualizar os totais
    function updateTotals() {
        const subtotal = productPrice * quantity;
        const total = subtotal + shippingPrice - discountPrice;
        
        itemTotal.textContent = formatPrice(subtotal);
        subtotalValue.textContent = formatPrice(subtotal);
        totalValue.textContent = formatPrice(total);
        
        // Atualiza o valor das parcelas
        const installmentElement = document.querySelector('.installments');
        if (installmentElement) {
            const installmentValue = total / 10;
            installmentElement.textContent = `ou 10x de ${formatPrice(installmentValue)} sem juros`;
        }
    }
    
    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Alterna o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Botões de quantidade
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                quantityValue.textContent = quantity;
                updateTotals();
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            quantity++;
            quantityValue.textContent = quantity;
            updateTotals();
        });
    }
    
    // Botão de remover item
    const removeBtn = document.querySelector('.remove-btn');
    if (removeBtn) {
        removeBtn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            if (cartItem) {
                cartItem.style.height = cartItem.offsetHeight + 'px';
                cartItem.style.overflow = 'hidden';
                
                setTimeout(() => {
                    cartItem.style.height = '0';
                    cartItem.style.padding = '0';
                    cartItem.style.margin = '0';
                    cartItem.style.opacity = '0';
                    cartItem.style.transition = 'all 0.3s ease';
                }, 10);
                
                setTimeout(() => {
                    cartItem.remove();
                    
                    // Atualiza o contador do carrinho
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        const currentCount = parseInt(cartCount.textContent);
                        if (currentCount > 0) {
                            cartCount.textContent = currentCount - 1;
                        }
                    }
                    
                    // Se não houver mais itens, exibe mensagem
                    const cartItems = document.querySelectorAll('.cart-item');
                    if (cartItems.length === 0) {
                        const cartTable = document.querySelector('.cart-table');
                        if (cartTable) {
                            const emptyMessage = document.createElement('div');
                            emptyMessage.className = 'empty-cart-message';
                            emptyMessage.textContent = 'Seu carrinho está vazio';
                            emptyMessage.style.padding = '30px';
                            emptyMessage.style.textAlign = 'center';
                            emptyMessage.style.color = '#777';
                            cartTable.appendChild(emptyMessage);
                        }
                    }
                }, 300);
            }
        });
    }
    
    // Adiciona estilo para o menu mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 767px) {
            .main-nav.active {
                display: block;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                padding: 15px;
                z-index: 100;
            }
            
            .main-nav.active ul {
                flex-direction: column;
                gap: 15px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Inicializa os totais
    updateTotals();
});