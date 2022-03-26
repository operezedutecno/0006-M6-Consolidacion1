const express = require('express');
const app = express();
const fs = require('fs');
const { v4: uuidV4 } = require('uuid')

app.listen(3000, () => console.log("Servidor activo http://localhost:3000"));

app.use("/bootstrap", express.static(`${__dirname}/node_modules/bootstrap/dist/`));
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist/`));

app.get("/registro", (req, res) => {
    res.sendFile(`${__dirname}/views/registro.html`);
});

app.get("/guardar", (req, res) => {
    let { nombre, tipoEmpleadoId } = req.query;
    let codigo = uuidV4().slice(0,8);

    fs.readFile(`${__dirname}/data/data.json`,"utf8", (error, contenido) => {
        contenido = JSON.parse(contenido);
        let {empleados} = contenido;
        empleados.push({
            id: codigo,
            nombre,
            tipoEmpleadoId: parseInt(tipoEmpleadoId)
        })
        contenido.empleados = empleados;
        contenido = JSON.stringify(contenido, null, 4);
        fs.writeFile(`${__dirname}/data/data.json`, contenido, "utf8", (error) => {
            error ? res.send("Ha ocurrido un error") : res.redirect("/listado")
        })
    })
})

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