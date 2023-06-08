let userLoggedIn = false;

function showRegistrationSuccessMessage() {
  const successMessage = document.createElement("div");
  successMessage.textContent =
    "Registration successful! Please login to continue.";
  successMessage.classList.add("success-message");

  // Append the success message to a specific location in your HTML
  const registrationFormContainer = document.getElementById(
    "registration-form-container"
  );
  registrationFormContainer.appendChild(successMessage);
}

function showLoginErrorMessage(error) {
  console.log("Attempting to display error message:", error);
  const errorMessage = document.createElement("div");
  errorMessage.textContent = 'Invalid username or password';
  // errorMessage.classList.add("error-message");
  errorMessage.id = "error-message";
  const loginFormContainer = document.getElementById("loginForm");
  loginFormContainer.appendChild(errorMessage);
}

function removeLoginErrorMessage(){
  console.log("attempt to remove msg: ");
  const successMessage = document.createElement("div");
  const errorMessageContainer = document.getElementById("error-message");
  console.log("container:", errorMessageContainer);
  errorMessageContainer.textContent = 'TEST';
  // errorMessageContainer.classList.add('error-message');
  // errorMessageContainer.style.display = 'none';
  // errorMessageContainer.innerHTML = 'test2';
  
}

function performLogin(formData) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "/login",
      method: "POST",
      data: formData,
      success: (data) => {
        resolve(data);
      },

      error: (error) => {
        console.log("Login failed:", error);
        console.log("Error message:", error.responseText);
        reject(error);
      },
    });
  });
}

function logout() {
  // Send an HTTP POST request to the logout route on your server
  $.ajax({
    url: "/logout",
    method: "POST",
    success: function (response) {
      // Handle successful logout
      console.log("Logged out successfully");
      // Perform any additional actions (e.g., redirect to login page)
    },
    error: function (xhr, status, error) {
      // Handle logout error
      console.error("Logout error:", error);
    },
  });
}


