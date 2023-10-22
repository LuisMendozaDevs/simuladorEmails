// Asegurarse de que se haya descargado todo el código HMTL
document.addEventListener('DOMContentLoaded', function(){
    // Crear un objeto donde almacenaremos la informacion ingresada por el usuario en el formulario
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz con la que vamos a trabajar
    const inputEmail    = document.querySelector('#email');
    const inputCc       = document.querySelector('#cc');
    const inputAsunto   = document.querySelector('#asunto');
    const inputMensaje  = document.querySelector('#mensaje');
     //Seleccionar el formulario para agregar las alertas
    const formulario    = document.querySelector('#formulario');
    const btnSubmit     = document.querySelector('#formulario button[type="submit"]');
    const btnReset      = document.querySelector('#formulario button[type="reset"]');
    const spinner       = document.querySelector('#spinner');
    
    inputEmail.     addEventListener('input', validar);
    inputCc.        addEventListener('input', validarCc);
    inputAsunto.    addEventListener('input', validar)
    inputMensaje.   addEventListener('input', validar)
    formulario.     addEventListener('submit', enviarEmail);
    btnReset.       addEventListener('click', botonReset);

    function validar(e){ 
        if(e.target.value.trim() === ''){  
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){ 
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement); 
        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail(); 
    }

    function mostrarAlerta(mensaje, referencia){ 
        limpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        referencia.appendChild(error); 
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600'); 
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/; 
        const resultado = regex.test(email); 
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){ 
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }   btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }

    function enviarEmail(e){
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetearFormulario();
            const alertaExito = document.createElement('P'); 
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Los datos se han envíado exitosamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 3000);
        console.log(email);
    }

    function botonReset(e){
        e.preventDefault(); 
        resetearFormulario();
    }

    function resetearFormulario(e){ 
        email.email = '';
        email.cc = '';
        email.asunto = '';
        email.mensaje = '';
        delete email.cc;
        formulario.reset();
        comprobarEmail();
        console.log(email);
    }

    function validarCc(e){
        email[e.target.name] = e.target.value.trim().toLowerCase();
        if(e.target.value === ''){
            delete email.cc;
            limpiarAlerta(inputCc.parentElement);
            comprobarEmail();
            return;
        }
        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
        }else{
            limpiarAlerta(inputCc.parentElement);
        }
    }
})