$(document).ready(() => {
  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();

    // Send registration data to the server
    $.ajax({
      type: "POST",
      url: "/register",
      data: {
        name,
        email,
        password,
      },
      success: function (response) {
        console.log(response.message);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
});
