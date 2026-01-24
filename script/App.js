const app = {
    currentUser: null,

    init: () => {
        app.currentUser = User.getCurrentUser();
        if (!app.currentUser) {
            window.location.href = "login.html";
            return;
        }

        app.updateUI();
        app.setupListeners();
        app.setupMasks();
        app.router('home'); // Inicia na home
    },

    updateUI: () => {
        const user = User.getCurrentUser();
        document.getElementById("uiName").innerText = user.name.split(" ")[0]; // Primeiro nome
        document.getElementById("uiBalance").innerText = `R$ ${user.balance.toFixed(2).replace('.', ',')}`;
        app.renderExtract(user.extract);
    },

    router: (viewName) => {
        // Esconde todas as seções
        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        // Remove active dos botões
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
        
        // Mostra a desejada
        const target = document.getElementById(`view-${viewName}`);
        if(target) target.classList.remove('hidden');

        // Atualiza botão lateral (busca por atributo ou índice se necessário, aqui simplificado)
        // Se precisar de highlight no menu, adicione IDs aos botões
        
        if(viewName === 'investments') app.renderChart();
    },

    setupListeners: () => {
        // Pagamento
        document.getElementById("paymentForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const amount = app.parseMoney(document.getElementById("payAmount").value);
            if (User.updateBalance(amount, "Pagamento / Transferência", "out")) {
                alert("Pagamento realizado!");
                e.target.reset();
                app.updateUI();
                app.router('home');
            } else {
                alert("Saldo insuficiente!");
            }
        });

        // Investimento
        document.getElementById("investForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const amount = app.parseMoney(document.getElementById("investAmount").value);
            const type = document.getElementById("investType").value;
            
            if (User.updateBalance(amount, `Investimento em ${type}`, "out")) {
                alert("Investimento realizado!");
                e.target.reset();
                app.updateUI();
            } else {
                alert("Saldo insuficiente!");
            }
        });
    },

    renderExtract: (extract) => {
        const list = document.getElementById("extractList");
        list.innerHTML = "";
        
        if(extract.length === 0) {
            list.innerHTML = "<li style='padding:20px; text-align:center;'>Nenhuma transação.</li>";
            return;
        }

        extract.forEach(item => {
            const li = document.createElement("li");
            li.className = "transaction-item";
            li.innerHTML = `
                <div>
                    <strong>${item.desc}</strong> <br> <small style="color:#ccc">${item.date}</small>
                </div>
                <span class="amount ${item.value < 0 ? 'negative' : 'positive'}">
                    R$ ${item.value.toFixed(2).replace('.', ',')}
                </span>
            `;
            list.appendChild(li);
        });
    },

    renderChart: () => {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        if(window.myChart) window.myChart.destroy();

        window.myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Projeção de Rendimento',
                    data: [1000, 1020, 1050, 1080, 1150, 1200],
                    borderColor: '#7dd5f6',
                    backgroundColor: 'rgba(125, 213, 246, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true }
        });
    },

    setupMasks: () => {
        if(document.querySelector('.money-mask')) {
            new Cleave('.money-mask', {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                prefix: 'R$ '
            });
        }
    },

    parseMoney: (str) => {
        return parseFloat(str.replace('R$', '').replace(/\./g, '').replace(',', '.').trim());
    }
};

document.addEventListener("DOMContentLoaded", app.init);