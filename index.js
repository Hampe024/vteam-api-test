const express = require("express");
const app = express();
const PORT = 8080;

app.use( express.json() )

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


app.listen(
    PORT,
    () => console.log(`live on http://localhost:${PORT}`)
)