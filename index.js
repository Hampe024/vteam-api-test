const express = require("express");
const fs = require('fs');

const app = express();
const PORT = 8080;
const db_path = 'my_db.json';

app.use( express.json() )

let rawdata = fs.readFileSync(db_path);
let db = JSON.parse(rawdata);

app.get("/test", (req, res) => {
    res.status(200).send({
        msg: "Hello world!",
        msg2: "this is working :D"
    })
});

app.post("/test2/:id", (req, res) => {
    const { id } = req.params;
    const { msg } = req.body;

    if (!msg) {
        res.status(418).send({
            message: `There is no message D: ${id}`
        })
    }

    res.send({
        message: `Your message was: ${msg}, and id was: ${id}`
    });
});

app.get("/invoice/user/:userID", (req, res) => {
    const { userID } = req.params;

    const InvoiceIDs = db["users"][userID]["invoiceID"];
    // TODO: catch when there is no user with given userID
    var invoices = []
    InvoiceIDs.forEach(i => {
        invoices.push(db["invoices"][i]);
    });

    res.status(200).send({
        "invoices": invoices
    })
})

app.post("/invoice", (req, res) => {
    const { distTravel } = req.body;
    const { cost } = req.body;

    const newInvoice = {
        "distTravel": distTravel,
        "cost": cost
    }

    const newid = Object.keys(db["invoices"]).length + 1
    db["invoices"][newid] = newInvoice

    const newdb = JSON.stringify(db, null, 4);
    fs.writeFileSync(db_path, newdb);

    res.status(200).send({
        "msg": "it worked!, check for new data in my_db.json"
    })
})


app.listen( PORT, () => console.log(`live on http://localhost:${PORT}`) )