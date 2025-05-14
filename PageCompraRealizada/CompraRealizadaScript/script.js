document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    /
    const printReceiptBtn = document.getElementById('print-receipt');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            alert('Menu mobile será exibido aqui!');
        });
    }
    
    
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', function() {
           
            const originalContent = document.body.innerHTML;
            
           
            let printContent = document.querySelector('.success-card').cloneNode(true);
            
           
            const printHeader = document.createElement('div');
            printHeader.innerHTML = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #e83e8c; font-size: 24px; margin-bottom: 5px;">Digital Store</h1>
                    <p>Recibo de Compra</p>
                    <p>Data: ${new Date().toLocaleDateString()}</p>
                </div>
            `;
            
            
            const actionButtons = printContent.querySelector('.action-buttons');
            if (actionButtons) {
                actionButtons.remove();
            }
            
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Recibo de Compra - Digital Store</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            padding: 20px;
                        }
                        .success-card {
                            max-width: 800px;
                            margin: 0 auto;
                        }
                        .info-section {
                            margin-bottom: 20px;
                        }
                        h2, h3 {
                            color: #333;
                        }
                        .info-grid {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            gap: 10px;
                        }
                        .label {
                            color: #777;
                            font-size: 14px;
                        }
                        .value {
                            font-weight: 500;
                        }
                        .product-item {
                            display: flex;
                            align-items: center;
                            padding: 10px;
                            background-color: #f9f9f9;
                            border-radius: 5px;
                            margin-bottom: 15px;
                        }
                        .product-thumbnail {
                            width: 50px;
                            height: 50px;
                            background-color: #ddd;
                            border-radius: 5px;
                            margin-right: 15px;
                        }
                        .total-section {
                            display: flex;
                            justify-content: space-between;
                            margin: 20px 0;
                            border-top: 1px solid #eee;
                            padding-top: 15px;
                        }
                        .total-price {
                            font-size: 20px;
                            font-weight: 700;
                        }
                        @media print {
                            body {
                                print-color-adjust: exact;
                                -webkit-print-color-adjust: exact;
                            }
                        }
                    </style>
                </head>
                <body>
                    ${printHeader.outerHTML}
                    ${printContent.outerHTML}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            
            printWindow.onload = function() {
                printWindow.print();
                
            };
        });
    }
    
    
    function simulateDataLoading() {
       
        console.log('Dados do pedido carregados com sucesso!');
    }
    
    
    simulateDataLoading();
});