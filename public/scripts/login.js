// const loginForm = document.getElementById('loginForm');
// loginForm.addEventListener('submit', performLogin)

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
          reject(error);
        },
      });
})
  
}

  
  