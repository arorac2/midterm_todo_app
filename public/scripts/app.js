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

const populateTable = function(data) {
  const tableBody = $('tbody');

  for (const item of data) {
    const row = `
      <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${item.description}</td>
        <td>${item.created_at}</td>
        <td>${item.updated_at}</td>
        <td>${item.category}</td>
        <td>${item.user}</td>
      </tr>
    `;
    tableBody.append(row);
  }
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
      let categories = "";

      for (let id of response) {
        categories += `${id.title}, `;

      }

      categories = categories.slice(0, -2);

      console.log("response", response);
      console.log("cId", response['title']);
      clearInterval(intervalId);
      $('#add-result').text(`${item} : ${categories}`);
    }).fail((xhr, status, error) => {
      console.error("Error occurred in GET /api/categories: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    });

  }).fail((xhr, status, error) => {
    if (error === 'abort') {
      console.log('Request aborted');
      $('#add-result').text('Request Timed Out. Please try again');
    } else {
      console.error("Error occurred in POST /api/items: ", error);
      clearInterval(intervalId);
      $('#add-result').text('Error occurred');
    }
  });

  // After five seconds, abort the request
  setTimeout(() => {
    ajaxRequest.abort();
  }, 10000);
};

$(document).ready(() => {
  console.log('ready!');

  $.ajax({
    url: '/api/items', // what url we need to use?
    method: 'GET',
    dataType: 'json',
  })
    .done(function(response) {
      console.log(response);
      populateTable(response);
    })
    .fail(function(error) {
      console.log('Error:', error);
    });


  $('#item-form').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();

    aiForm(formData);
  });

  $('#loginForm').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();


    performLogin(formData).then(result => {
      const welcomeMessage = $("#welcomeMessage");
      welcomeMessage.text(`Welcome, ${result.user.name}!`);
    });
  });

});



