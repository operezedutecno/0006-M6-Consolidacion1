const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"));

app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist/`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist/`));

app.get("/registro", (req, res) => {

});

app.get("/listado", (req, res) => {
    fs.readFile(`${__dirname}/data/data.json`, "utf8", (error, contenido) => {
        let {tipoEmpleados, empleados} = JSON.parse(contenido);
        let desc = empleados.map(empleado => {
            empleado.tipoEmpleado = tipoEmpleados.find(tipoEmpleado => {
                return tipoEmpleado.id == empleado.tipoEmpleadoId
            })
            return empleado;
        })
        res.setHeader("content-type", "application/json");
        res.json(desc);
    });
});


app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`);
});