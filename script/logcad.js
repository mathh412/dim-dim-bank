function validarCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/[^\d]+/g,'');
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

let user=new User()
user.init()
if(user.isLogged()){ window.location.href="dashboard.html" }

$("#extraInfoDiv").hide()

$("#cpfCnpj")[0].addEventListener("input", (e) => {
    let cpf=e.target.value.replace(/\D/g,"")
    if (cpf.length <= 11) {
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
        cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    } else {
        cpf=cpf.replace(/^(\d{2})(\d)/,"$1.$2")
        cpf=cpf.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
        cpf=cpf.replace(/\.(\d{3})(\d)/,".$1/$2")
        cpf=cpf.replace(/(\d{4})(\d)/,"$1-$2")  
    }
    e.target.value=cpf

    if ($("#loginForm").length == 0){
        if ($("#cpfCnpj").val().length == 18){
            $("#extraInfoDiv").slideDown()
            $("#cadastroForm .conditionalRequired").attr("required", "")
        } else{
            $("#extraInfoDiv").slideUp()
            $("#cadastroForm .conditionalRequired").removeAttr("required")
        }
    }
})

$("#cadastroForm, #loginForm").on("submit", e => {
    e.preventDefault()
    let cpfcnpj = $("#cpfCnpj").val()
    let invalido = false
    // CPF
    if (cpfcnpj.length == 14 || cpfcnpj.length == 18){
        invalido =  !(validarCPF(cpfcnpj) || validarCNPJ(cpfcnpj))
    } else{
        invalido=true
    }

    if (invalido){ 
        alert("CPF/CNPJ invalido!")
        return
    }
    if (e.target.id == "loginForm"){
        if (!user.login(cpfcnpj, $("#password").val())){
            alert("Este usuário não existe, verifique os dados e tente novamente!")
            return
        }
    } else if(e.target.id == "cadastroForm"){
        user.addUser({"extrato": [], "money": 1000.50, "cpfcnpj": cpfcnpj, "password": $("#password").val(), "name": $("#name").val(), "email": $("#email").val(), "responsavel": $("#responsavel").val(), "nomeFantasia": $("#nomeFantasia").val(), "cep": $("#cep").val(), "social": $("#social").val()})
    } else{ return }
    e.target.submit()
    // cadastro
    // localStorage.setItem("users", JSON.stringify({"name": "SLA", "cpf/cnpj": "2242242424"}))
    // login
    // USERS LIKE OBJECT = [ { "name": "sla", "password": "sla" } ]
    // if (JSON.parse(localStorage.getItem("users"))["cpf/cnpj"] == loginCnpj && senha)
})

$("#esqueceuInputs").hide()

$(".toggleLoginInputs").on("click", (e) => {
    $("#esqueceuInputs").toggle()
    $("#loginInputs").toggle()


    console.log($("#loginInputs").is(":hidden"))
    if($("#loginInputs").is(":hidden")){
        $("#loginInputs .conditionalRequired").removeAttr("required")
        $("#esqueceuInputs .conditionalRequired").attr("required", "")
    } else{
        $("#esqueceuInputs .conditionalRequired").removeAttr("required")
        $("#loginInputs .conditionalRequired").attr("required", "")
    }
})