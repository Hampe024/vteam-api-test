// Shows invoices of given user 

const userID = 0;
fetch(`http://localhost:8080/invoice/user/${userID}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(function (err) {
        console.warn('Something went wrong.', err);
    });