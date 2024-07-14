//Eliminar Marca de Agua de 000web
document.addEventListener("DOMContentLoaded",()=>{
    var disclaimer=document.querySelector("img[alt='www.000webhost.com']");
    if(disclaimer){
        disclaimer.remove();
    }
});
//

//Local Storage
var input6 = document.getElementById("saveServer6");
var input7 = document.getElementById("saveServer7");
var input8 = document.getElementById("saveServer8");
var input9 = document.getElementById("saveServer9");
var input10 = document.getElementById("saveServer10");
var input11 = document.getElementById("saveServer11");
var input12 = document.getElementById("saveServer12");

//TARDE
var input14 = document.getElementById("saveServer14");
var input15 = document.getElementById("saveServer15");
var input16 = document.getElementById("saveServer16");
var input17 = document.getElementById("saveServer17");
var input18 = document.getElementById("saveServer18");
var input19 = document.getElementById("saveServer19");
var input20 = document.getElementById("saveServer20");
var input21 = document.getElementById("saveServer21");

var output_div6 = document.querySelector('.content-output6');
var output_div7 = document.querySelector('.content-output7');
var output_div8 = document.querySelector('.content-output8');
var output_div9 = document.querySelector('.content-output9');
var output_div10 = document.querySelector('.content-output10');
var output_div11 = document.querySelector('.content-output11');
var output_div12 = document.querySelector('.content-output12');

var output_div14 = document.querySelector('.content-output14');
var output_div15 = document.querySelector('.content-output15');
var output_div16 = document.querySelector('.content-output16');
var output_div17 = document.querySelector('.content-output17');
var output_div18 = document.querySelector('.content-output18');
var output_div19 = document.querySelector('.content-output19');
var output_div20 = document.querySelector('.content-output20');
var output_div21 = document.querySelector('.content-output21');


//SAVE
function save_data(){
    localStorage.setItem("server6", input6.value);
    localStorage.setItem("server7", input7.value);
    localStorage.setItem("server8", input8.value);
    localStorage.setItem("server9", input9.value);
    localStorage.setItem("server10", input10.value);
    localStorage.setItem("server11", input11.value);
    localStorage.setItem("server12", input12.value);

    localStorage.setItem("server14", input14.value);
    localStorage.setItem("server15", input15.value);
    localStorage.setItem("server16", input16.value);
    localStorage.setItem("server17", input17.value);
    localStorage.setItem("server18", input18.value);
    localStorage.setItem("server19", input19.value);
    localStorage.setItem("server20", input20.value);
    localStorage.setItem("server21", input21.value);
}

    output_div6.textContent = localStorage.getItem('server6');
    input6.value = localStorage.getItem('server6');

    output_div7.textContent = localStorage.getItem('server7');
    input7.value = localStorage.getItem('server7');

    output_div8.textContent = localStorage.getItem('server8');
    input8.value = localStorage.getItem('server8');

    output_div9.textContent = localStorage.getItem('server9');
    input9.value = localStorage.getItem('server9');

    output_div10.textContent = localStorage.getItem('server10');
    input10.value = localStorage.getItem('server10');

    output_div11.textContent = localStorage.getItem('server11');
    input11.value = localStorage.getItem('server11');

    output_div12.textContent = localStorage.getItem('server12');
    input12.value = localStorage.getItem('server12');

    output_div14.textContent = localStorage.getItem('server14');
    input14.value = localStorage.getItem('server14');

    output_div15.textContent = localStorage.getItem('server15');
    input15.value = localStorage.getItem('server15');

    output_div16.textContent = localStorage.getItem('server16');
    input16.value = localStorage.getItem('server16');

    output_div17.textContent = localStorage.getItem('server17');
    input17.value = localStorage.getItem('server17');

    output_div18.textContent = localStorage.getItem('server18');
    input18.value = localStorage.getItem('server18');

    output_div19.textContent = localStorage.getItem('server19');
    input19.value = localStorage.getItem('server19');

    output_div20.textContent = localStorage.getItem('server20');
    input20.value = localStorage.getItem('server20');

    output_div21.textContent = localStorage.getItem('server21');
    input21.value = localStorage.getItem('server21');

//Delete
function Delete(){
    localStorage.removeItem('server6');
    localStorage.removeItem('server7');
    localStorage.removeItem('server8');
    localStorage.removeItem('server9');
    localStorage.removeItem('server10');
    localStorage.removeItem('server11');
    localStorage.removeItem('server12');

    localStorage.removeItem('server14');
    localStorage.removeItem('server15');
    localStorage.removeItem('server16');
    localStorage.removeItem('server17');
    localStorage.removeItem('server18');
    localStorage.removeItem('server19');
    localStorage.removeItem('server20');
    localStorage.removeItem('server21');
    location.reload();
}
//Fin Local Storage

//Notificaciones
var horaactual=new Date();
console.log(horaactual.getHours().toLocaleString());

//5AM
if(horaactual.getHours()=="5"){
    if(horaactual.getMinutes()<"20"){
        swal("Hacer actividad física durante 20 minutos.",{
            button: false,
            title: 'Ley 20-20-20',
        });
    }
    if(horaactual.getMinutes()>="20" && horaactual.getMinutes()<"40"){
        swal("Hacer la Rutina Matutina, planificar tu día, revisa tus objetivos, meditar o escribir en tu diario por 20 minutos.",{
            button: false,
            title: 'Ley 20-20-20',
        });
    }
    if(horaactual.getMinutes()>="40"){
        swal("Formarte en un tema relacionado al crecimiento personal durante 20 minutos (mirar videos, leer o estudiar sobre la temática elegida).",{
            button: false,
            title: 'Ley 20-20-20',
        });
    }
}

//Planificacion
it=0;
fin=0;
i=horaactual.getHours();
while(fin==0){
    if(localStorage.getItem('server'+i)==""){
        i--;
        if(i==13){
            i=12;
        }
    }
    if(localStorage.getItem('server'+i)==null){
        fin=1;
    }else if(localStorage.getItem('server'+i)!=""){
        swal(localStorage.getItem('server'+i.toLocaleString()),{
            button: false,
            title: 'Lo Planificado es',
        });
        fin=1;
    }
}
//Fin Notificaciones