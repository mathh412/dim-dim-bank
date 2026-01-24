class User {
    static init() {
        if (!localStorage.getItem("db_users")) {
            localStorage.setItem("db_users", JSON.stringify([]));
        }
    }

    static getLoggedIndex() {
        const idx = localStorage.getItem("logged_index");
        return idx !== null ? parseInt(idx) : -1;
    }

    static getCurrentUser() {
        const index = this.getLoggedIndex();
        if (index === -1) return null;
        const users = JSON.parse(localStorage.getItem("db_users"));
        return users[index] || null;
    }

    static login(cpf, password) {
        const cleanCpf = cpf.replace(/\D/g, "");
        const users = JSON.parse(localStorage.getItem("db_users") || "[]");
        
        const index = users.findIndex(u => u.cpf === cleanCpf && u.password === password);
        if (index !== -1) {
            localStorage.setItem("logged_index", index);
            return true;
        }
        return false;
    }

    static logout() {
        localStorage.removeItem("logged_index");
        window.location.href = "login.html";
    }

    static register(userData) {
        const users = JSON.parse(localStorage.getItem("db_users") || "[]");
        userData.cpf = userData.cpf.replace(/\D/g, "");

        if (users.find(u => u.cpf === userData.cpf)) {
            return { success: false, msg: "CPF já cadastrado!" };
        }

        userData.balance = 1000.00;
        userData.extract = [];
        users.push(userData);
        localStorage.setItem("db_users", JSON.stringify(users));
        return { success: true, msg: "Conta criada com sucesso!" };
    }

    static updateBalance(amount, description, type) {
        const index = this.getLoggedIndex();
        if (index === -1) return false;

        const users = JSON.parse(localStorage.getItem("db_users"));
        const user = users[index];

        if (type === 'out' && user.balance < amount) return false;

        const finalAmount = type === 'out' ? -amount : amount;
        user.balance += finalAmount;
        
        user.extract.unshift({
            date: new Date().toLocaleDateString('pt-BR'),
            desc: description,
            value: finalAmount
        });

        users[index] = user;
        localStorage.setItem("db_users", JSON.stringify(users));
        return true;
    }
}
User.init();