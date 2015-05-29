function play(){
    nombreUsuario = document.getElementById("usuario").value;
    if(nombreUsuario == ""){        
        alert("¡Ingrese un nombre de usuario!")
    }else{
        window.location.replace("juego.html")
    }
}

