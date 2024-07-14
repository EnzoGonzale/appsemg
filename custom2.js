//LISTA DE OBJETIVOS
var input1 = document.getElementById("saveobj1");
var input2 = document.getElementById("saveobj2");
var input3 = document.getElementById("saveobj3");
var input4 = document.getElementById("saveobj4");
var input5 = document.getElementById("saveobj5");

var outputo_div1 = document.querySelector('.content-outputo1');
var outputo_div2 = document.querySelector('.content-outputo2');
var outputo_div3 = document.querySelector('.content-outputo3');
var outputo_div4 = document.querySelector('.content-outputo4');
var outputo_div5 = document.querySelector('.content-outputo5');

//SAVE
function save_datao(){
    localStorage.setItem("obj1", input1.value);
    localStorage.setItem("obj2", input2.value);
    localStorage.setItem("obj3", input3.value);
    localStorage.setItem("obj4", input4.value);
    localStorage.setItem("obj5", input5.value);
}

    outputo_div1.textContent = localStorage.getItem('obj1');
    input1.value = localStorage.getItem('obj1');

    outputo_div2.textContent = localStorage.getItem('obj2');
    input2.value = localStorage.getItem('obj2');

    outputo_div3.textContent = localStorage.getItem('obj3');
    input3.value = localStorage.getItem('obj3');

    outputo_div4.textContent = localStorage.getItem('obj4');
    input4.value = localStorage.getItem('obj4');

    outputo_div5.textContent = localStorage.getItem('obj5');
    input5.value = localStorage.getItem('obj5');

//Delete
function Deleteo(){
    localStorage.removeItem('obj1');
    localStorage.removeItem('obj2');
    localStorage.removeItem('obj3');
    localStorage.removeItem('obj4');
    localStorage.removeItem('obj5');
    location.reload();
}

//RUTINA MATUTINA
var rminput1 = document.getElementById("saverm1");
var rminput2 = document.getElementById("saverm2");
var rminput3 = document.getElementById("saverm3");
var rminput4 = document.getElementById("saverm4");
var rminput5 = document.getElementById("saverm5");
var rminput6 = document.getElementById("saverm6");

var rminputtext = document.getElementById("rminput");

var rmoutputo_div1 = document.querySelector('.content-outputorm1');
var rmoutputo_div2 = document.querySelector('.content-outputorm2');
var rmoutputo_div3 = document.querySelector('.content-outputorm3');
var rmoutputo_div4 = document.querySelector('.content-outputorm4');
var rmoutputo_div5 = document.querySelector('.content-outputorm5');
var rmoutputo_div6 = document.querySelector('.content-outputorm6');

var rmoutputtxt = document.querySelector('.rmoutput');

function saveRM(){
    localStorage.setItem("rm1", rminput1.value);
    localStorage.setItem("rm2", rminput2.value);
    localStorage.setItem("rm3", rminput3.value);
    localStorage.setItem("rm4", rminput4.value);
    localStorage.setItem("rm5", rminput5.value);
    localStorage.setItem("rm6", rminput6.value);

    localStorage.setItem("rmtxt", rminputtext.value);
}

    rmoutputo_div1.textContent = localStorage.getItem('rm1');
    rminput1.value = localStorage.getItem('rm1');

    rmoutputo_div2.textContent = localStorage.getItem('rm2');
    rminput2.value = localStorage.getItem('rm2');

    rmoutputo_div3.textContent = localStorage.getItem('rm3');
    rminput3.value = localStorage.getItem('rm3');

    rmoutputo_div4.textContent = localStorage.getItem('rm4');
    rminput4.value = localStorage.getItem('rm4');

    rmoutputo_div5.textContent = localStorage.getItem('rm5');
    rminput5.value = localStorage.getItem('rm5');

    rmoutputo_div6.textContent = localStorage.getItem('rm6');
    rminput6.value = localStorage.getItem('rm6');

    rmoutputtxt.textContent = localStorage.getItem('rmtxt');
    rminputtext.value = localStorage.getItem('rmtxt');

function deleteRM(){
    localStorage.removeItem('rm1');
    localStorage.removeItem('rm2');
    localStorage.removeItem('rm3');
    localStorage.removeItem('rm4');
    localStorage.removeItem('rm5');
    localStorage.removeItem('rm6');
    
    localStorage.removeItem('rmtxt');
    location.reload();
}

var fecha = new Date();
var diaActual = fecha.getDate();
console.log(diaActual);
var diaGuardado = localStorage.getItem('diaActual');
console.log(diaGuardado);

if(diaActual !== diaGuardado){
    //Rutina matutina
    localStorage.removeItem('rm1');
    localStorage.removeItem('rm2');
    localStorage.removeItem('rm3');
    localStorage.removeItem('rm4');
    localStorage.removeItem('rm5');
    localStorage.removeItem('rm6');
    
    localStorage.removeItem('rmtxt');
    //

    //Planificacion del dia
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
    //
    localStorage.setItem('diaActual', diaActual);
}