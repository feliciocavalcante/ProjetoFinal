document.addEventListener('DOMContentLoaded', function() {
    
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const cartaoNumeroInput = document.getElementById('cartao-numero');
    const cartaoValidadeInput = document.getElementById('cartao-validade');
    
    
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})$/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{3})$/, '$1.$2');
            }
            
            e.target.value = value;
        });
    }
    
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            }
            
            e.target.value = value;
        });
    }
    
    
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 8) value = value.slice(0, 8);
            
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d{3})$/, '$1-$2');
            }
            
            e.target.value = value;
        });
        
        
        cepInput.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('endereco').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('estado').value = data.uf;
                            // Foca no campo número após preencher o endereço
                            document.getElementById('numero').focus();
                        }
                    })
                    .catch(error => console.error('Erro ao buscar CEP:', error));
            }
        });
    }
    
    
    if (cartaoNumeroInput) {
        cartaoNumeroInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 16) value = value.slice(0, 16);
            
         
            value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            
            e.target.value = value;
        });
    }
    
    
    if (cartaoValidadeInput) {
        cartaoValidadeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            
            if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{2})$/, '$1/$2');
            }
            
            e.target.value = value;
        });
    }
    
    
    const radioPagamentos = document.querySelectorAll('input[name="pagamento"]');
    const cartaoForm = document.getElementById('cartao-form');
    
    radioPagamentos.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.id === 'cartao') {
                cartaoForm.style.display = 'block';
            } else {
                cartaoForm.style.display = 'none';
            }
        });
    });
    
    
    const btnFinalizarCompra = document.getElementById('finalizar-compra');
    const btnFinalizarCompraMobile = document.getElementById('finalizar-compra-mobile');
    
    const finalizarCompra = function() {
       
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        
        if (!nome || !email) {
            alert('Por favor, preencha os campos obrigatórios.');
            return;
        }
        
        
        this.textContent = 'Processando...';
        this.disabled = true;
        
        setTimeout(() => {
            alert('Compra finalizada com sucesso! Obrigado por comprar na Digital Store.');
            // Redirecionaria para página de confirmação
            // window.location.href = '/confirmacao.html';
        }, 2000);
    };
    
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener('click', finalizarCompra);
    }
    
    if (btnFinalizarCompraMobile) {
        btnFinalizarCompraMobile.addEventListener('click', finalizarCompra);
    }
});