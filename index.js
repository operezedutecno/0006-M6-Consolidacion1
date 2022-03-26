const express = require('express');
const app = express();

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"))

app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist/`))
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist/`))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
})