// Client facing scripts here
const loginButton = document.querySelector('.button-container .button');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#closeButton');

loginButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

$(document).ready(() => {
  console.log('ready!');

  $('#item-form').submit(function(event) {
    event.preventDefault();
  });

});
