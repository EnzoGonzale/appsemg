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

var rminputtext = document.getElementById("rminput");

var rmoutputtxt = document.getElementById('rmoutput');

function saveRM(){
    localStorage.setItem("rmtxt", rminputtext.value);
}

    rmoutputtxt.textContent = localStorage.getItem('rmtxt');
    rminputtext.value = localStorage.getItem('rmtxt');

function deleteRM(){
    localStorage.removeItem('rmtxt');
    location.reload();
}