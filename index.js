// Add an event listener to the form  
document.querySelector('.form').addEventListener('submit', function(event) {  
    event.preventDefault(); // Prevent the default form submission behavior  

    // Get the name and email values from the form  
    const name = document.getElementById('name').value;  
    const email = document.getElementById('email').value;  

    // Call the submitData function  
    submitData(name, email);  
});  

function submitData(name, email) {  
    return fetch('/users', {  
        method: 'POST',  
        headers: {  
            'Content-Type': 'application/json'  
        },  
        body: JSON.stringify({ name, email })  
    })  
    .then(response => {  
        if (!response.ok) {  
            return response.json().then(err => {  
                throw new Error(err.message || 'Unauthorized Access');  
            });  
        }  
        return response.json();  
    })  
    .then(data => {  
        appendUserIdToDOM(data.id);  
    })  
    .catch(error => {  
        displayErrorInDOM(error.message);  
    });  
}  

function appendUserIdToDOM(userId) {  
    const responseMessage = document.getElementById('responseMessage');  
    responseMessage.innerHTML = `<p>User ID: ${userId}</p>`;  
}  

function displayErrorInDOM(errorMessage) {  
    const responseMessage = document.getElementById('responseMessage');  
    responseMessage.innerHTML = `<p>${errorMessage}</p>`;  
}