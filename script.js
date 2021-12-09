$(document).ready(function() {
    $('#tabla-banda').DataTable();
});

/* Validacion formulario*/
function concidenciaContrasenas(){
    var contrasena = document.getElementById("contrasena").value;
    var contrasenaConfirmacion = document.getElementById("contrasenaConfirmacion").value;
    var verificar = document.getElementById("verificar");
    var botonEnviar = document.getElementById("botonEnviar");
    if(contrasena.length!=0 && contrasenaConfirmacion.length!=0){
        if(contrasena===contrasenaConfirmacion){
            verificar.innerHTML="<span> Las contraseñas son iguales </span>";
            verificar.style.color = 'green';
            botonEnviar.disabled = false;
        }
        else{
            verificar.innerHTML="<span> Las contraseñas no son iguales </span>";
            verificar.style.color = 'red';
            botonEnviar.disabled = true;
        }
    }
}

function alIngresarDatosEnContrasena() {
    concidenciaContrasenas()
    var contrasena = this.event.target.value;
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,11}$/
    var contrasenaCumplePatron = Boolean(pattern.test(contrasena));
    if(!contrasena || !contrasenaCumplePatron){
        verificar = document.getElementById('verificar');
        verificar.innerHTML = `<span>Ingresa una contraseña válida, debe tener como minimo una letra en mayuscula, una en minuscula, un caracter y un tamaño de 8 caracteres</span>`;
        verificar.style.color = 'red';
        botonEnviar.disabled = true;
    }
}

function validarCheck(){
    var esConfirmacionSeleccionada = Boolean(document.querySelector('[name="checkConfirmacionFormulario"]:checked'))
    var botonEnviar = document.getElementById("botonEnviar");
    if(!esConfirmacionSeleccionada){
        checkSeleccionado = document.getElementById('checkSeleccionado');
        checkSeleccionado.innerHTML = `<span>Por favor confirma que aceptas los terminos y condiciones</span>`;
        checkSeleccionado.style.color = 'red';
        botonEnviar.disabled = true;
    }
    else{
        checkSeleccionado.style.display= 'none';
        botonEnviar.disabled = false;
    }

}

function validacionFormulario(){
    alIngresarDatosEnContrasena();
    validarCheck();
}

/* Grafica con datos proveniente de una API en formato JSON */
function consumirAPI(){
    var mes = [];
    var caldas = [];
    var antioquia = [];
    var bogota_dc = [];
    var quindio = [];


//consumo de la API
fetch("https://www.datos.gov.co/resource/ci85-cyhe.json")
    .then(respuesta_exitosa => respuesta_exitosa.json())
    .then(function(datos_obtenidos) {
        datos_obtenidos.forEach(elemento => {
            if(elemento.mes != undefined && elemento.caldas != undefined && elemento.antioquia!=undefined && elemento.bogota_dc!=undefined && elemento.quindio!=undefined){
                caldas.push(elemento.caldas);
                antioquia.push(elemento.antioquia);
                bogota_dc.push(elemento.bogota_dc);
                quindio.push(elemento.quindio);
                mes.push(elemento.mes);

            }
    
        });

        //variables para las graficas
        var graf1 = {
            y: caldas,
            x: mes,
            name: 'Caldas',
            type: 'bar'
        };

        var graf2 = {
            y: antioquia,
            x: mes,
            name: 'Antioquia',
            type: 'bar'
        };

        var graf3 = {
            y: bogota_dc,
            x: mes,
            name: 'Bogotá',
            type: 'bar'
        };

        var graf4 = {
            y: quindio,
            x: mes,
            name: 'Quindio',
            type: 'bar'
        };

        var datosGraficas = [graf1, graf2, graf3, graf4];

        var layout = {
            barmode: 'stack',
            title: {
                text: 'Prueba Antigeno realizadas en Colombia',
            },
        };

        Plotly.newPlot('graficaDatos', datosGraficas, layout);


    });
}

consumirAPI();
