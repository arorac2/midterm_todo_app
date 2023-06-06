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

  const textBox = document.getElementById("item-title");
  textBox.value = 'Loading from AI';

  const intervalId = setInterval(() => {
    // textBox.value.append('.');
  }, 300);

  const ajaxRequest = $.ajax({
    url: '/api/open-ai',
    type: 'POST',
    data: formData,
  }).done((response) => {

    const item = response.item;
    console.log("response", response.item);
    const cId = response['categoryId'];
    console.log("cid1: ", cId);
    textBox.value = item;

    $.ajax({
      url: `/api/categories/${cId}`,
      type: 'GET',
    }).done((response) => {
      let categories = [];

      for (let id of response) {
        categories.push(id.title);
      }

      console.log("categories", categories);

      const toEatCheckbox = document.getElementById("to-eat");
      const toReadCheckbox = document.getElementById("to-read");
      const toWatchCheckbox = document.getElementById("to-watch");
      const toBuyCheckbox = document.getElementById("to-buy");

      toEatCheckbox.checked = false;
      toReadCheckbox.checked = false;
      toWatchCheckbox.checked = false;
      toBuyCheckbox.checked = false;

      if (categories.includes('To Eat')) {
        toEatCheckbox.checked = true;
      }

      if (categories.includes('To Watch')) {
        toWatchCheckbox.checked = true;
      }

      if (categories.includes('To Read')) {
        toReadCheckbox.checked = true;
      }

      if (categories.includes('To Buy')) {
        toBuyCheckbox.checked = true;
      }

      clearInterval(intervalId);
      //$('#item-title').text(`${item} : ${categories}`);
      console.log("item", item);

    }).fail((xhr, status, error) => {
      console.error("Error occurred in GET /api/categories: ", error);
      clearInterval(intervalId);
      $('#item-title').text('Error occurred');
    });

  }).fail((xhr, status, error) => {
    if (error === 'abort') {
      console.log('Request aborted');
      $('#item-title').text('Request Timed Out. Please try again');
    } else {
      console.error("Error occurred in POST /api/items: ", error);
      clearInterval(intervalId);
      $('#item-title').text('Error occurred');
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

    $('.container').slideDown();
  });

  $('#userInteraction').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();

    console.log(formData);

    const ajaxRequest = $.ajax({
      url: '/api/items',
      type: 'POST',
      data: formData,
    }).done((response) => {
      $('.container').slideUp();

    });

  });

  $('#registrationForm').submit(function(event) {
    event.preventDefault();  
    showRegistrationSuccessMessage();
  });

  $('#logoutButton').on('click', logout);


  $('#loginForm').submit(function(event) {
    event.preventDefault();

    const $form = $(this);
    const formData = $form.serialize();


    performLogin(formData).then(result => {
      const welcomeMessage = $("#welcomeMessage");
      welcomeMessage.text(`Welcome, ${result.user.name}!`);
    })
    .catch(error => {
      showLoginErrorMessage(error);
    });
  });

});



