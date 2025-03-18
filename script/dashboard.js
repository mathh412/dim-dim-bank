let user = new User()
user.init()
if(!user.isLogged()){ window.location.href="login.html" }
let localUser = user.getLocalUser()

console.log(localUser.extrato)

// INFO TO UI
document.getElementById("userName").innerText = localUser.name
document.getElementById("userMoney").innerText = "R$ "+(localUser.money.toFixed(2))

function openWindow(title, filepath){
    var popupWidth = 600;
    var popupHeight = 700;
    var left = (screen.width - popupWidth) / 2;
    var top = (screen.height - popupHeight) / 2;
    window.open(filepath, title, 'width=' + popupWidth + ',height=' + popupHeight + ',top=' + top + ',left=' + left);
}

document.getElementById('pagamentosButton').addEventListener('click', function() {
    openWindow('Pagamento', '../iframes/pagamentos.html')
});
document.getElementById('investimentosButton').addEventListener('click', function() {
    openWindow('Investimento', '../iframes/investimentos.html')
});

document.getElementById('extratoButton').addEventListener('click', function() {
    openWindow('Extrato', '../iframes/extrato.html')
});