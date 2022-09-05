const signIn = document.getElementById("signIn");

signIn.addEventListener("click", () => {
    
    let email = document.getElementById('email').value;
    if(email.length === 0) {
        alert('Debe ingresar su e-mail')
        return;
    }

    let password = document.getElementById('password').value;
    if(password.length === 0) {
        alert('Debe ingresar su contraseña')
        return;
    }
    localStorage.setItem("email", email);
    window.location.href = "inicio.html";
});