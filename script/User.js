class User{
    init(){
        if (!localStorage.getItem("users")){
            localStorage.setItem("users", btoa("[]"))
        } if (!localStorage.getItem("loggedAs")){
            localStorage.setItem("loggedAs", "-1")
        }
    }

    getAllUsers(){
        return JSON.parse(atob(localStorage.getItem("users")))
    }

    addUser(userObj){
        let users=this.getAllUsers()
        users.push(userObj)
        localStorage.setItem("users", btoa(JSON.stringify(users)))
    }

    isLogged(){
        let loggedAs=localStorage.getItem("loggedAs")
        if (!loggedAs){ return false }
        if (isNaN(loggedAs) || Number(loggedAs) < 0 || Number(loggedAs) >= this.getAllUsers().length){ return false }
        return true
    }

    getLocalUser(){
        if (this.isLogged()){
            let loggedAs=Number(localStorage.getItem("loggedAs"))
            return this.getAllUsers()[loggedAs]
        }
        return false
    }

    saveCurrentUser(user){
        let users=this.getAllUsers()
        users=users.map(u => {
            if (u.cpfcnpj == user.cpfcnpj && u.password == user.password){
                return user
            } else{
                return u
            }
        })
        localStorage.setItem("users", btoa(JSON.stringify(users)))
    }

    login(cpfcnpj, password){
        let users=this.getAllUsers()
        for(let i=0; i<users.length; i++){
            if (users[i].cpfcnpj == cpfcnpj && users[i].password == password){
                localStorage.setItem("loggedAs", String(i))
                return true
            }
        }
        return false
    }

    logout(){
        localStorage.setItem("loggedAs", "-1")
    }
}