// Validar CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (cpf.length != 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    // Máscara CPF
    const cpfInputs = document.querySelectorAll(".cpf-mask");
    if (cpfInputs.length > 0 && window.Cleave) {
        cpfInputs.forEach(input => {
            new Cleave(input, { numericOnly: true, blocks: [3, 3, 3, 2], delimiters: ['.', '.', '-'] });
        });
    }

    // LOGIN
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        if (User.getCurrentUser()) window.location.href = "dashboard.html";

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cpf = document.getElementById("cpfCnpj").value;
            const password = document.getElementById("password").value;

            if (User.login(cpf, password)) window.location.href = "dashboard.html";
            else alert("Dados incorretos!");
        });

        document.querySelectorAll(".toggleLoginInputs").forEach(link => {
            link.addEventListener("click", () => {
                const loginArea = document.getElementById("loginInputs");
                const forgotArea = document.getElementById("esqueceuInputs");
                if(loginArea.style.display === "none") {
                    loginArea.style.display = "block"; forgotArea.style.display = "none";
                } else {
                    loginArea.style.display = "none"; forgotArea.style.display = "block";
                }
            });
        });
    }

    // CADASTRO
    const cadastroForm = document.getElementById("cadastroForm");
    if (cadastroForm) {
        cadastroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cpf = document.getElementById("cpfCnpj").value;
            
            if (!validarCPF(cpf)) { alert("CPF Inválido!"); return; }

            const newUser = {
                name: document.getElementById("name").value,
                cpf: cpf,
                email: document.getElementById("email").value,
                birthDate: document.getElementById("birthDate").value,
                password: document.getElementById("password").value
            };

            const result = User.register(newUser);
            if (result.success) {
                alert(result.msg); window.location.href = "login.html";
            } else {
                alert(result.msg);
            }
        });
    }
});