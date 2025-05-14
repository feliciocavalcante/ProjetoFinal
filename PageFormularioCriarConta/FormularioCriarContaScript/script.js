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
        
        // Format inputs as user types
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
        
        // Auto-fill address when CEP is entered
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
    
    // Helper functions
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
});