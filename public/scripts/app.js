// Client facing scripts here
const loginButton = document.querySelector('.button-container .button');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#closeButton');

loginButton.addEventListener('click', () => {
  modal.style.display = 'block';
  removeLoginErrorMessage()
  });

// document.addEventListener('click', function(event {
// let modal = document.getElementById('modal');

// //is the clicked element is outside the modal?
// if (!modal.container(event.target)) {
// modal.style.display = 'none'
// }
// });



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


  const resultForm = `
  <div class="container">
    <form id="userInteraction">
      <ul class="flex-outer">
        <li>
          <label for="item-title">Item Name</label>
          <input type="text" id="item-title" name="title">
        </li>
        <li>
          <label for="message">Description</label>
          <textarea rows="6" id="message" placeholder="Enter your description here" name="description"></textarea>
        </li>
        <li>
          <p>Categories</p>
          <ul class="flex-inner">
            <li>
              <input type="checkbox" id="to-eat" name="to-eat">
              <label for="to-eat">To Eat</label>
            </li>
            <li>
              <input type="checkbox" id="to-watch" name="to-watch">
              <label for="to-watch">To Watch</label>
            </li>
            <li>
              <input type="checkbox" id="to-buy" name="to-buy">
              <label for="to-buy">To Buy</label>
            </li>
            <li>
              <input type="checkbox" id="to-read" name="to-read">
              <label for="to-read">To Read</label>
            </li>
          </ul>
        </li>
        <li>
          <button type="submit">Submit</button>
        </li>
      </ul>
    </form>
  </div>
  `;

  const intervalId = setInterval(() => {
    // textBox.value.append('.');
  }, 300);

  const ajaxRequest = $.ajax({
    url: '/api/open-ai',
    type: 'POST',
    data: formData,
  }).done((response) => {

    const item = response.item;
    const description = response.description;
    console.log("response", response.item);
    const cId = response['categoryId'];
    console.log("cid1: ", cId);

    $('#loading-ai').remove();

    console.log("prepending");

    $('.flex-outer').prepend(resultForm);

    console.log("done");

    const textBox = document.getElementById("item-title");
    const descriptionBox = document.getElementById("message");
    descriptionBox.value = description;
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
      $("#error-message").remove()
    })
    .catch(error => {
      showLoginErrorMessage(error);
    });
  });

});



