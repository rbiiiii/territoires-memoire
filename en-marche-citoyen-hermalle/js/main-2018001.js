var buttons = document.querySelectorAll('.poi__question__results__btn');

function showResults(e) {
    this.parentNode.parentNode.parentNode.classList.add('show-results');
}

for (var i = 0; i < buttons.length; i++ ) {
    buttons[i].addEventListener('click', showResults);
}





