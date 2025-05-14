document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('signup-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
           
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    highlightField(field, true);
                } else {
                    highlightField(field, false);
                }
            });
            
            
            const email = document.getElementById('email');
            if (email.value && !isValidEmail(email.value)) {
                isValid = false;
                highlightField(email, true);
                showError(email, 'Por favor, insira um email válido');
            }
            
            
            const cpf = document.getElementById('cpf');
            if (cpf.value && !isValidCPF(cpf.value)) {
                isValid = false;
                highlightField(cpf, true);
                showError(cpf, 'Por favor, insira um CPF válido');
            }
            
          
            const ddd = document.getElementById('ddd');
            const telefone = document.getElementById('telefone');
            if ((ddd.value && !isValidDDD(ddd.value)) || (telefone.value && !isValidPhone(telefone.value))) {
                isValid = false;
                highlightField(ddd.value && !isValidDDD(ddd.value) ? ddd : telefone, true);
                showError(telefone, 'Por favor, insira um telefone válido');
            }
            
            
            const senha = document.getElementById('senha');
            const confirmarSenha = document.getElementById('confirmar-senha');
            if (senha.value !== confirmarSenha.value) {
                isValid = false;
                highlightField(confirmarSenha, true);
                showError(confirmarSenha, 'As senhas não coincidem');
            }
            
           
            const cep = document.getElementById('cep');
            if (cep.value && !isValidCEP(cep.value)) {
                isValid = false;
                highlightField(cep, true);
                showError(cep, 'Por favor, insira um CEP válido');
            }
            
            if (isValid) {
                
                alert('Conta criada com sucesso!');
                form.reset();
            } else {
                alert('Por favor, corrija os erros no formulário antes de continuar.');
            }
        });
        
        
        const allInputs = form.querySelectorAll('input');
        allInputs.forEach(input => {
            input.addEventListener('input', function() {
                highlightField(this, false);
                clearError(this);
            });
        });
        
       
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                this.value = formatCPF(this.value);
            });
        }
        
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', function() {
                this.value = formatCEP(this.value);
            });
        }
        
        const dddInput = document.getElementById('ddd');
        if (dddInput) {
            dddInput.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, '').substring(0, 2);
            });
        }
        
        const telefoneInput = document.getElementById('telefone');
        if (telefoneInput) {
            telefoneInput.addEventListener('input', function() {
                this.value = formatPhone(this.value);
            });
        }
        
       
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                if (isValidCEP(this.value)) {
                    
                    setTimeout(() => {
                        
                        if (this.value === '60150-161') {
                            document.getElementById('endereco').value = 'Av. Santos Dumont';
                            document.getElementById('bairro').value = 'Aldeota';
                            document.getElementById('cidade').value = 'Fortaleza';
                            document.getElementById('estado').value = 'CE';
                        }
                    }, 500);
                }
            });
        }
    }
    
    
    function highlightField(field, isError) {
        if (isError) {
            field.style.borderColor = '#e53935';
        } else {
            field.style.borderColor = '';
        }
    }
    
    function showError(field, message) {
        clearError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e53935';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearError(field) {
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidCPF(cpf) {
        
        cpf = cpf.replace(/\D/g, '');
        return cpf.length === 11;
    }
    
    function isValidDDD(ddd) {
        ddd = ddd.replace(/\D/g, '');
        return ddd.length === 2;
    }
    
    function isValidPhone(phone) {
        phone = phone.replace(/\D/g, '');
        return phone.length >= 8 && phone.length <= 9;
    }
    
    function isValidCEP(cep) {
        cep = cep.replace(/\D/g, '');
        return cep.length === 8;
    }
    
    function formatCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        if (cpf.length > 11) cpf = cpf.substring(0, 11);
        
        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cpf.length > 6) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
        } else if (cpf.length > 3) {
            cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
        }
        
        return cpf;
    }
    
    function formatCEP(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 8) cep = cep.substring(0, 8);
        
        if (cep.length > 5) {
            cep = cep.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }
        
        return cep;
    }
    
    function formatPhone(phone) {
        phone = phone.replace(/\D/g, '');
        if (phone.length > 9) phone = phone.substring(0, 9);
        
        if (phone.length > 4) {
            phone = phone.replace(/(\d{4,5})(\d{4})/, '$1-$2');
        }
        
        return phone;
    }

    
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileSidebar = document.getElementById('mobileSidebar');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (mobileMenuToggle && mobileSidebar && mobileMenuOverlay && closeMobileMenu) {
       
        mobileMenuToggle.addEventListener('click', function() {
            mobileSidebar.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; 
        });
        
        
        const closeMenu = function() {
            mobileSidebar.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = ''; 
        };
        
        closeMobileMenu.addEventListener('click', closeMenu);
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }
    
   
    const setupOrderFiltering = () => {
        
        const ordersHeader = document.querySelector('.orders-header');
        
        if (ordersHeader) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'filter-container';
            
            const filterLabel = document.createElement('span');
            filterLabel.textContent = 'Filtrar por: ';
            filterContainer.appendChild(filterLabel);
            
            const allButton = document.createElement('button');
            allButton.className = 'filter-btn active';
            allButton.textContent = 'Todos';
            allButton.dataset.filter = 'all';
            
            const transitButton = document.createElement('button');
            transitButton.className = 'filter-btn';
            transitButton.textContent = 'Em trânsito';
            transitButton.dataset.filter = 'transit';
            
            const completedButton = document.createElement('button');
            completedButton.className = 'filter-btn';
            completedButton.textContent = 'Finalizados';
            completedButton.dataset.filter = 'completed';
            
            const canceledButton = document.createElement('button');
            canceledButton.className = 'filter-btn';
            canceledButton.textContent = 'Cancelados';
            canceledButton.dataset.filter = 'canceled';
            
            filterContainer.appendChild(allButton);
            filterContainer.appendChild(transitButton);
            filterContainer.appendChild(completedButton);
            filterContainer.appendChild(canceledButton);
            
           
            if (window.innerWidth > 768) {
                ordersHeader.appendChild(filterContainer);
                
                
                const style = document.createElement('style');
                style.textContent = `
                    .filter-container {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .filter-btn {
                        background: none;
                        border: none;
                        padding: 5px 10px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                        color: #666;
                    }
                    .filter-btn:hover {
                        background-color: #f5f5f5;
                    }
                    .filter-btn.active {
                        background-color: #f5f5f5;
                        color: #d81b60;
                        font-weight: 500;
                    }
                    @media (max-width: 768px) {
                        .filter-container {
                            margin-top: 15px;
                            flex-wrap: wrap;
                        }
                    }
                `;
                document.head.appendChild(style);
                
              
                const filterButtons = document.querySelectorAll('.filter-btn');
                const orderItems = document.querySelectorAll('.order-item');
                
                filterButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        
                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        const filter = this.dataset.filter;
                        
                     
                        orderItems.forEach(item => {
                            if (filter === 'all') {
                                item.style.display = 'flex';
                            } else {
                                const status = item.querySelector('.order-status');
                                if (status && status.classList.contains(filter)) {
                                    item.style.display = 'flex';
                                } else {
                                    item.style.display = 'none';
                                }
                            }
                        });
                    });
                });
            }
        }
    };
    
    setupOrderFiltering();
    
 
    const orderItems = document.querySelectorAll('.order-item');
    
    orderItems.forEach(item => {
        item.addEventListener('click', function() {
            
            const productName = this.querySelector('.product-details h4').textContent;
            const status = this.querySelector('.order-status').textContent;
            
            console.log(`Viewing details for order: ${productName} (Status: ${status})`);
            
            
            this.style.backgroundColor = '#f9f9f9';
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
        
       
        item.style.cursor = 'pointer';
    });
    
   
    const simulateLoading = () => {
        const content = document.querySelector('.content');
        
        if (content) {
           
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Carregando pedidos...';
            
           
            loadingIndicator.style.textAlign = 'center';
            loadingIndicator.style.padding = '30px';
            loadingIndicator.style.color = '#666';
            
            
            const ordersList = document.querySelector('.orders-list');
            const ordersHeader = document.querySelector('.orders-header');
            
            if (ordersList && ordersHeader) {
                ordersList.style.display = 'none';
                ordersHeader.style.display = 'none';
                content.appendChild(loadingIndicator);
                
                
                setTimeout(() => {
                    loadingIndicator.remove();
                    ordersList.style.display = 'block';
                    ordersHeader.style.display = 'flex';
                }, 1000);
            }
        }
    };
    
    simulateLoading();

    const editInfoBtn = document.getElementById('editInfoBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const userInfoForm = document.getElementById('userInfoForm');
    
    if (editInfoBtn && cancelEditBtn && viewMode && editMode && userInfoForm) {
        
        editInfoBtn.addEventListener('click', function() {
            viewMode.style.display = 'none';
            editMode.style.display = 'block';
        });
        
        
        cancelEditBtn.addEventListener('click', function() {
            viewMode.style.display = 'block';
            editMode.style.display = 'none';
            
           
            userInfoForm.reset();
        });
        
       
        userInfoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            
            const formData = new FormData(userInfoForm);
            const userData = {};
            
            for (const [key, value] of formData.entries()) {
                userData[key] = value;
            }
            
            
            console.log('Saving user data:', userData);
            
           
            document.querySelector('.info-value:nth-of-type(1)').textContent = userData.nome;
            document.querySelector('.info-value:nth-of-type(2)').textContent = userData.cpf;
            document.querySelector('.info-value:nth-of-type(3)').textContent = userData.email;
            document.querySelector('.info-value:nth-of-type(4)').textContent = userData.celular;
            document.querySelector('.info-value:nth-of-type(5)').textContent = userData.endereco;
            document.querySelector('.info-value:nth-of-type(6)').textContent = userData.bairro;
            document.querySelector('.info-value:nth-of-type(7)').textContent = `${userData.cidade}, ${userData.estado}`;
            document.querySelector('.info-value:nth-of-type(8)').textContent = userData.cep;
           
            showNotification('Informações atualizadas com sucesso!');
            
            
            viewMode.style.display = 'block';
            editMode.style.display = 'none';
        });
        
        
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', function() {
                this.value = formatCPF(this.value);
            });
        }
        
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', function() {
                this.value = formatCEP(this.value);
            });
        }
        
        const celularInput = document.getElementById('celular');
        if (celularInput) {
            celularInput.addEventListener('input', function() {
                this.value = formatPhone(this.value);
            });
        }
    }
    
    
    
    function formatCEP(cep) {
        cep = cep.replace(/\D/g, '');
        if (cep.length > 8) cep = cep.substring(0, 8);
        
        if (cep.length > 5) {
            cep = cep.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2-$3');
        } else if (cep.length > 2) {
            cep = cep.replace(/(\d{2})(\d{0,6})/, '$1.$2');
        }
        
        return cep;
    }
    
    
    
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#4CAF50';
        notification.style.color = 'white';
        notification.style.padding = '12px 24px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '9999';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
      
        document.body.appendChild(notification);
        
       
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
   
    const animateEditButton = () => {
        const editBtn = document.querySelector('.edit-btn');
        
        if (editBtn) {
            editBtn.addEventListener('mouseover', function() {
                this.style.transform = 'scale(1.05)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            editBtn.addEventListener('mouseout', function() {
                this.style.transform = 'scale(1)';
            });
        }
    };
    
    animateEditButton();
    
    
    const setupCEPLookup = () => {
        const cepInput = document.getElementById('cep');
        
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                const cep = this.value.replace(/\D/g, '');
                
                if (cep.length === 8) {
                  
                    const endereco = document.getElementById('endereco');
                    const bairro = document.getElementById('bairro');
                    const cidade = document.getElementById('cidade');
                    const estado = document.getElementById('estado');
                    
                    if (endereco && bairro && cidade && estado) {
                        endereco.value = 'Carregando...';
                        bairro.value = 'Carregando...';
                        cidade.value = 'Carregando...';
                        estado.value = 'Carregando...';
                        
                    
                        setTimeout(() => {
                            
                            if (cep === '60000000') {
                                endereco.value = 'Rua João Pessoa';
                                bairro.value = 'Centro';
                                cidade.value = 'Fortaleza';
                                estado.value = 'Ceará';
                            } else {
                                
                                endereco.value = 'Rua João Pessoa, 123';
                                bairro.value = 'Centro';
                                cidade.value = 'Fortaleza';
                                estado.value = 'Ceará';
                            }
                        }, 1000);
                    }
                }
            });
        }
    };
    
    setupCEPLookup();
});