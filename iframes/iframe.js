// deno-lint-ignore-file
let user = new User()
user.init()
let localUser = user.getLocalUser()

// PAGAMENTO
if ($("#paymentForm").length > 0) {
    document.getElementById("paymentForm").addEventListener("submit", (e) => {
        e.preventDefault()
        let value = Number(document.getElementById("valor").value.replace("-", "").replace("R$ ", "").replace(",", ""))
        if (!document.getElementById("creditOption").checked) {
            if (localUser.money >= value && value != 0) {
                localUser.money -= value
                localUser.extrato.push({ "value": -value, "desc": "PIX" })
                user.saveCurrentUser(localUser)
                //generateReceipt("PIX", value)
                document.body.innerHTML="<h1>Pagamento realizado com sucesso!</h1><p>Pode fechar esta janela se quiser</p><button onclick='generateReceipt(\"PIX\", "+value+")' class='btn btn-outline-success'>Baixar Recibo</button>"
                //window.close()
            } else {
                alert("Você não possui este dinheiro!")
            }
        } else {
            if (value != 0) {
                localUser.extrato.push({ "value": -value, "desc": "Crédito" })
                user.saveCurrentUser(localUser)
                //generateReceipt("Crédito", value)
                document.body.innerHTML="<h1>Pagamento realizado com sucesso!</h1><p>Pode fechar esta janela se quiser</p><button onclick='generateReceipt(\"Crédito\", "+value+")' class='btn btn-outline-success'>Baixar Recibo</button>"
            } else {
                alert("Coloque um valor válido!")
            }
            //window.close()
        }
    })

    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardInputs = document.getElementById('creditCardInputs');
    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (this.value === 'credit') {
                creditCardInputs.style.display = 'block';
            } else {
                creditCardInputs.style.display = 'none';
            }
        });
    });
    new Cleave('#valor', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: 'R$ ',
        noImmediatePrefix: true,
        rawValueTrimPrefix: true
    });
}

// INVESTIMENTO
else if ($("#investmentForm").length > 0) {
    $("#investmentForm").on("submit", e => {
        e.preventDefault()
        //var investmentType = $('#investmentType').val();
        //var investmentValue = $('#investmentValue').val();
        var chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Investment Performance',
                data: generateRandomData(7, 50, 100),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                fill: true
            }]
        };
        updateChart(chartData);
    })
    $("#btnSubmit").on("click", e => {
        let value = Number(document.getElementById("investmentValue").value.replace("-", "").replace("R$ ", "").replace(",", ""))
        if (localUser.money >= value && value != 0) {
            localUser.money -= value
            localUser.extrato.push({ "value": -value, "desc": $("#investmentType").val() })
            user.saveCurrentUser(localUser)
            window.close()
        } else {
            alert("Você não possui este dinheiro para investir!")
        }
    })

    new Cleave('#investmentValue', {
        numeral: true,
        numeralThousandsGroupStyle: 'thousand',
        prefix: 'R$ ',
        noImmediatePrefix: true,
        rawValueTrimPrefix: true
    });

    var investmentChart;

    function generateRandomData(points, min, max) {
        let data = [];
        for (let i = 0; i < points; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return data;
    }

    function updateChart(data) {
        if (investmentChart) {
            investmentChart.destroy();
        }
        var ctx = document.getElementById('investmentChart').getContext('2d');
        investmentChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    $('#investmentType').change(function () {

        $('#investmentForm').trigger('submit');
    });
}
//GERADOR DE COMPROVANTE
function generateReceipt(paymentMethod, value) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let logo = new Image()
    logo.src = "../imgs/logo.png"
    doc.addImage(logo, "PNG", 5, 5, 35, 20)

    doc.setFontSize(22);
    doc.text("Comprovante de Pagamento", 105, 20, null, null, "center");

 
    doc.setFontSize(16);
    doc.text(`Método de Pagamento: ${paymentMethod}`, 20, 40);
    doc.text(`Valor: R$ ${value.toFixed(2)}`, 20, 50);

    doc.text(`Data: ${new Date().toLocaleString()}`, 20, 60);

    doc.setLineWidth(0.5);
    doc.rect(10, 30, 190, 40);

    doc.setFontSize(12);
    doc.text("Obrigado por utilizar nossos serviços!", 105, 80, null, null, "center");

    let date=new Date()
    let datetime = date.getDate() + "_" + (date.getMonth()+1)  + "_" + date.getFullYear() + "@"  + date.getHours() + "_"  + date.getMinutes() + "_" + date.getSeconds();

    doc.save("comprovante"+datetime+".pdf");
}