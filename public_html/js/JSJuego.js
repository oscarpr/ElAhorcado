var categoriaEscogida;
var palabra;
var palabras;
var jsonFile;
resultado = "<img src=\"img/imagen_0.jpg\" alt=\"El ahorcado\">";
document.getElementById("muneco").innerHTML = resultado;
var imagen = 0;

function categoria(){    
    categoriaEscogida = parseInt(document.getElementById("categoriaSLCT").value);
    localStorage.setItem("persona", categoriaEscogida);    
    cargarJSON();    
}

function cargarJSON(){
    var jsonhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        jsonhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        jsonhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    jsonhttp.onreadystatechange=function()
    {
    if (jsonhttp.readyState==4 && jsonhttp.status==200)
      {
        jsonFile = JSON.parse(jsonhttp.responseText);
        escogerPalabra(categoriaEscogida);
        document.getElementById("espacios").innerHTML = crearEspacios();
      }
    }
    jsonhttp.open("GET","data.json",true);
    jsonhttp.send();    
}

function escogerPalabra(categoria){    
    var tamanno = jsonFile.length;
    var random = Math.floor((Math.random() * tamanno) + 1);
    if(categoria === 0) {
        categoria = Math.floor((Math.random() * 3) + 1);
        categoriaEscogida = categoria;
    }
    switch(categoria){
        case 1:
            palabra = jsonFile[random+1].city.toString();            
            break;
        case 2:
            palabra = jsonFile[random+1].company.toString();
            break;
        case 3:
            palabra = jsonFile[random+1].fullname.toString();
            break;
        default:
            return false;
            break;            
    }    
}

function crearEspacios(){
    var tamanyo = palabra.length;
    var aux = "";
    var id = 0;
    for (var i = 0; i< tamanyo; i++){
        if(palabra[i] !== " "){            
            aux += "<li id=\"char_"+id+"\">___ </li>";
            id += 1;
        } else{            
            aux += "<br/>";
        }
    }
    aux += "<br/>";
    return aux;
}

function letra(min,may,id){    
    var resultado = '';
    var tamanyo = palabra.length;    
    var error = 0;
    for(var i = 0; i<tamanyo; i++){
        if(palabra[i]==may || palabra[i] == min){
            error++;
            document.getElementById("char_"+i).textContent = may;            
            document.getElementById("alf_"+id).setAttribute("disabled", "disabled");
        }else{            
            document.getElementById("alf_"+id).setAttribute("disabled", "disabled");
        }
    }
    revision();
    if(imagen<5){     
        if (error===0){         
            imagen++; 
            resultado = "<img class=\"img-responsive\" src=\"img/imagen_"+imagen+".jpg\" alt=\"El ahorcado\">";
        }else{
            resultado = "<img src=\"img/imagen_"+imagen+".jpg\" alt=\"El ahorcado\">";
        }
    }else{
        imagen++; 
        resultado = "<img src=\"img/imagen_"+imagen+".jpg\" alt=\"El ahorcado\">";
        perder();
    }    
    document.getElementById("muneco").innerHTML = resultado;
}
function revision(){
    var tamanyo = palabra.length;    
    for(var j =0 ;j<palabra.length; j++){
        if(palabra[j]===" ") tamanyo--;
    }    
    var aux = 0;
    
    var letra = '';
    for(var i = 0; i<tamanyo; i++){
        letra = document.getElementById("char_"+i).textContent;        
        if(letra === '___ '){            
            aux++;
        }
    }            
    if(aux===0){
        var resultado = '<lable>¡Has ganado felicidades!, recarga la pagina para volver a empezar.</lable>';
        document.getElementById('result').innerHTML = resultado;
    }
}

function perder(){
    var resultado = '<lable>¡Has perdido!, recarga la pagina para volver a empezar.</lable>';     
    document.getElementById('result').innerHTML = resultado;
    for (var i = 1; i< 27; i++){
        document.getElementById("alf_"+i).setAttribute("disabled", "disabled");
    }
    alert("La palabra era: " + palabra);
}