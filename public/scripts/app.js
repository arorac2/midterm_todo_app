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

const printResult = function(selector) {
  let text = $(selector).val();
  let count = 140 - text.length;
  $('.counter').text(count);
  $('.counter').toggleClass('negative', count < 0);
};

$(document).ready(() => {
  console.log('ready!');

  $('#item-form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();

    $.ajax({
      url: '/api/items',
      type: 'POST',
      data: formData,
      success: function(response) {
        console.log(response);
        $('#add-result').text(response['title']);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });

  });

});
