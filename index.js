var input_textarea = document.querySelector('.content-input');
var output_div = document.querySelector('.content-output');
var save_button = document.querySelector('.save-button');

save_button.addEventListener('click', updateOutput);

output_div.textContent = localStorage.getItem('content');
input_textarea.value = localStorage.getItem('content');


function updateOutput() {
	localStorage.setItem('content', input_textarea.value);
	
	output_div.textContent = input_textarea.value;
}