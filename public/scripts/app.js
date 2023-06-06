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
    }).done((response) => {
      console.log("response", response);
      const cId = response['categoryId'];
      console.log("cid1: ", cId);
      const item = response.title;

      $.ajax({
        url: `/api/categories/${cId}`,
        type: 'GET',
      }).done((response) => {
        console.log("cId", response.title);
        const category = response.title;
        $('#add-result').text(`${item} : ${category}`);
      }).fail((xhr, status, error) => {
        console.error("Error occurred in GET /api/categories: ", error);
      });

    }).fail((xhr, status, error) => {
      console.error("Error occurred in POST /api/items: ", error);
    });


  });

});
