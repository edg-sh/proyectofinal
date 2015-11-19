function registro(){    
    nombre = document.getElementById('nombre').value;
    email = document.getElementById('email').value;    
    pass1 = document.getElementById('password').value;
    pass2 = document.getElementById('password2').value;
    //Validación de contraseñas
    if (nombre != "" && email != "" && pass1 != "" && pass2 != ""){
        if(pass1==pass2){
            //Almacenamiento local
            //setItem(llave,valor)
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('password', pass1);
            localStorage.setItem('email',email);
            //Mostrando mensaje, registro exitoso
            mensajeCorrecto("Registro Exitoso!");
            //Redirigir
            setTimeout(function(){
                window.location.assign('login.html');
            }, 1000);
        }else{
            document.getElementById('password').style.border="3px solid purple";
            document.getElementById('password2').style.border="3px solid purple";
            mensajeError("Las contraseñas no coinciden");
        }
    } else {
        mensajeError("Deber Rellenar Todos los Campos");
    }
}

function mensajeError(msg){
    mensaje = document.getElementById('mensaje');
    mensaje.style.opacity = "1";
    mensaje.style.transition = ".3s all";
    mensaje.innerHTML = msg;
    mensaje.style.backgroundColor = "purple";
    navigator.vibrate('100');
    navigator.vibrate('100');
    navigator.vibrate('50');
}

function mensajeCorrecto(msg){
    mensaje = document.getElementById('mensaje');
    mensaje.style.opacity = "1";
    mensaje.style.transition = ".3s all";
    mensaje.innerHTML = msg;
    mensaje.style.backgroundColor = "blue";
}

function login(){
    correo = document.getElementById('lCorreo').value;
    password = document.getElementById('lPass').value;
    
    if (correo != "" && password != ""){
        correoAlmacenado = localStorage.getItem('email');
        passwordAlmacenado = localStorage.getItem('password');

        if(correo == correoAlmacenado && password == passwordAlmacenado) {
            document.getElementById('lCorreo').style.border="3px solid blue";
            document.getElementById('lPass').style.border="3px solid blue";
            mensajeCorrecto("OK---OK---OK");
            setTimeout(function(){
                    window.location.assign('main.html');
                }, 1000);
        }else{
            document.getElementById('lCorreo').style.border="3px solid purple";
            document.getElementById('lPass').style.border="3px solid purple";
            mensajeError("El Correo proporcionado o la contraseña son incorrectos");
            navigator.vibrate('100');
            navigator.vibrate('200');
        }     
    } else {
        mensajeError("Deber Rellenar Todos los Campos");
    }
}



function verLugares(){
    lugares = localStorage.getItem('contador');
    lugares--;
    i=1;
    while(i <= lugares){
        nombreLugar = localStorage.getItem('nombre'+i);
        costoLugar = localStorage.getItem('costo'+i);
        categLugar = localStorage.getItem('categ'+i);
        contenido = '<div class="filas" id="lugar'+i+'">'+
            '<table>'+
        '<tr>'+
            '<td colspan="3" class="tb_nombre"><label>'+nombreLugar+'</label></td>'+
        '</tr>'+
        '<tr>'+
            '<td class="tb_precio"><label>$'+costoLugar+'</label></td>'+
            '<td class="tb_calif" id="tb_calif'+i+'"><label></label></td>'+
            '<td class="tb_mapa" onclick="showMap('+i+')"><img src="img/map.png"></td>'+
        '</tr>'+
    '</table>'+
             '</div>';
        document.getElementById('bIndex').innerHTML+=contenido;
        llenarEstrellas(i);
        i++;
    }
}

function showMap(id){
    localLugar = localStorage.getItem('local'+id);
    document.getElementById('bIndex').innerHTML+='<div id="negro" onclick="quitar();"></div>';
    document.getElementById("temp_mapa").style.visibility="visible"
    document.getElementById('temp_mapa').innerHTML=localLugar;
    
}

function quitar(){
    document.getElementById('bIndex').innerHTML="";
    document.getElementById('bIndex').innerHTML+=' <div id="header">'+
            '<a href="main.html">'+
            '<img id="return" src="img/der.png">'+
            '</a>'+
        '</div><div id="temp_mapa"></div>';
    verLugares();
    document.getElementById("temp_mapa").style.visibility="hidden";
}

function llenarEstrellas(id){
    llena = '<img src="img/llena.png">';
    vacia = '<img src="img/vacia.png">';
    califLugar = localStorage.getItem('score'+id);
    califLugar = parseInt(califLugar);
    switch(califLugar){
        case 1:
            document.getElementById('tb_calif'+id).innerHTML=llena+vacia+vacia+vacia+vacia;
        break;
        case 2:
            document.getElementById('tb_calif'+id).innerHTML=llena+llena+vacia+vacia+vacia;
        break;
        case 3:
            document.getElementById('tb_calif'+id).innerHTML=llena+llena+llena+vacia+vacia;
        break;
        case 4:
            document.getElementById('tb_calif'+id).innerHTML=llena+llena+llena+llena+vacia;
        break;
        case 5:
            document.getElementById('tb_calif'+id).innerHTML=llena+llena+llena+llena+llena;
        break;
        default: alert("no hay valor");
    }
    
}


 function inicializar(){

     if (localStorage.getItem('contador') == null){
            contador=1;
            localStorage.setItem('contador', contador);
         }
    navigator.geolocation.getCurrentPosition(localizacion);
    }
        
    function localizacion(posicion){
        lat = posicion.coords.latitude;
        long = posicion.coords.longitude;
        grados = posicion.coords.heading;
        //Guardar en almacenamiento local
        localStorage.setItem('long', long);
        localStorage.setItem('lat', lat);
        localStorage.setItem('grados', grados);
        mapaestatico="http://maps.google.com/maps/api/staticmap?center="+lat+","+long+"&zoom=15&markers="+lat+","+long+"|"+lat+","+long+"&size=350x350";
        document.getElementById('map').innerHTML='<img id="mapa" src='+mapaestatico+">";
    }

    function guardar(){
        //Almacenar
        nombre = document.getElementById('lugar').value;
        costo = document.getElementById('costo').value;
        score=document.getElementById('score').value;
        categ=document.getElementById('categ').value;
        if (nombre != "" && costo != "" && score != "" && categ != ""){
            contador = localStorage.getItem('contador');

            localizacion = document.getElementById('map').innerHTML;
            localStorage.setItem('local'+contador, localizacion);

            localStorage.setItem('nombre'+contador, nombre);
            localStorage.setItem('costo'+contador, costo);
            localStorage.setItem('score'+contador,score);
            localStorage.setItem('categ'+contador,categ);

            contador++;
            localStorage.setItem('contador', contador);

            document.getElementById('lugar').value="";
            document.getElementById('costo').value="";
            document.getElementById('score').value="";
            document.getElementById('categ').value="";
            document.getElementById('lugar').disabled="true";
            document.getElementById('costo').disabled="true";
            document.getElementById('score').disabled="true";
            document.getElementById('categ').disabled="true";
            
            mensajeCorrecto("¡SE HA AÑADIDO ESTE LUGAR!");
            
            document.getElementById('map').innerHTML='<button id="up" onclick="update()">ACTUALIZAR</button>';
        } else {
            mensajeError("Deber Rellenar Todos los Campos");
        }
    }

function update(){
    window.location.assign('main.html');
}

function restablecer(){
    localStorage.clear();
    window.location.assign('index.html');
}