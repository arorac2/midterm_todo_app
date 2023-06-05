function performLogin(username, password) {
  $.ajax({
    url: "/login",
    method: "POST",
    dataType: "json",
    contentType: "application/json",
    data: JSON.stringify({ username, password }),
    success: (data) => {
      const welcomeMessage = document.getElementById("welcomeMessage");
      welcomeMessage.textContent = `Welcome, ${data.user.name}!`;
    },

    error: (error) => {
      console.log("Login failed:", error);
    },
  });
}
