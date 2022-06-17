const express = require('express')
const fs = require("fs");

const app = express()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
 })

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send(`<h1>Productos de la tienda</h1>
    <ul style='text-align:center;'>
      <li><h3><a href="/productos">Todos los productos</a></h3></li>
      <li><h3><a href="/productoRandom">Producto random</a></h3></li>
    </ul>`)
 })

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(obj) {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then( contenido => {
            if (contenido.length) { 
                let longit = JSON.parse(contenido).length;
                obj.id = JSON.parse(contenido)[longit - 1].id + 1;
                async function agregar() {
                    try {
                        let contenidoNuevo = JSON.parse(contenido);
                        contenidoNuevo.push(obj); 
                        await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(contenidoNuevo, null, 3))
                        console.log(`Id del producto: ${obj.id}`);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                agregar(); 
            } else {
                obj.id = 1;
                async function iniciarJson() {
                    try {
                        let contenidoNuevo = [obj];
                        await fs.promises.writeFile(`./${this.archivo}`,  JSON.stringify(contenidoNuevo, null, 3))
                        console.log(`Id del producto: ${obj.id}`);
                    }
                    catch(err) {
                        console.log("Hubo un error", err);
                    }   
                }
                iniciarJson(); 
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    getById(id) {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then(contenido => {
            const resultado = JSON.parse(contenido).find(element => element.id === id)
            if (resultado) {
                console.log(resultado);
            } else {
                console.log(null);
            }
        })
        .catch(err => {
            console.log("Producto no encontrado", err)
        })
    }
  
    async getAll(){
        try{
            const data = await fs.promises.readFile(this.archivo, "utf-8")
            const objetos = await data ? (JSON.parse(data)) : []
            return objetos;
        } 
        catch(err) {
            console.log(err)
        }
    }
  
    deleteById(id) {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then(contenido => {
            let contenidoFiltrado = JSON.parse(contenido).filter(elem => elem.id !== id)
            let existeId = JSON.parse(contenido).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(contenidoFiltrado, null, 3))
                    !existeId ? console.log("No se ha encontrado ningun producto con la id indicada") : console.log("Producto borrado");
                }
                catch(err) {
                    console.log("No se pudo eliminar", err)
                }
            }
            eliminar();
        })
        .catch(err => {
            console.log("Algo falló", err)
        }) 
    }

    deleteAll() {
        async function borrarTodo() {
            try {
                await fs.promises.writeFile(`./${this.archivo}`, "");
                console.log("Contenido del producto borrado");
            }
            catch (err) {
                console.log("No se pudo eliminar el contenido del producto", err)
            }
        }
        borrarTodo();
    }
}


const myCont = new Contenedor("productos.txt");

const random = (max) => {
   return Math.floor(Math.random() * (max));
}

app.get('/productos', async (req, res) => {
  res.json(await myCont.getAll())
})

app.get('/productoRandom', async (req, res) => {
    let datos = await myCont.getAll();
    res.json(datos[random(datos.length)])
 })