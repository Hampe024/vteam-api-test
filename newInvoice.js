// Adds new invoice with data from body

const body = {
    "distTravel": "1000km",
    "cost": "99999kr"
};
fetch(`http://localhost:8080/invoice`, {
    body: JSON.stringify(body),
    headers: {
        "content-type": "application/json",
    },
    method: "POST",
})
    .then(response => response.json())
    .then(data => console.log(data))