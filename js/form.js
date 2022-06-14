let formulario = document.getElementById("idForm")
    let arrayComentarios = []
    
    formulario.addEventListener("submit" , (event) => {
        event.preventDefault()
       let email = document.getElementById("exampleFormControlInput1").value
       let mensaje = document.getElementById("exampleFormControlTextarea1").value
    
       let comentario = {email: email, mensaje: mensaje}
       arrayComentarios.push(comentario)
       localStorage.setItem("comentario", JSON.stringify(comentario));
    })