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

const aiForm = (formData) => {
  $('#add-result').text(`Loading from AI`);

  const intervalId = setInterval(() => {
    $('#add-result').append('.');
  }, 300);

  const ajaxRequest = $.ajax({
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
      clearInterval(intervalId);
      $('#add-result').text(`${item} : ${category}`);
    }).fail((xhr, status, error) => {
      console.error("Error occurred in GET /api/categories: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    });

  }).fail((xhr, status, error) => {
    if (error === 'abort') {
      console.log('Request aborted');
    } else {
      console.error("Error occurred in POST /api/items: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    }
  });

  // After five seconds, abort the request
  setTimeout(() => {
    ajaxRequest.abort();
  }, 5000);
};



$(document).ready(() => {
  console.log('ready!');

  $('#item-form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();


    aiForm(formData);


  });

});
