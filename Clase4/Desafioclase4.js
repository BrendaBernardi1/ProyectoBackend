const fs = require("fs");


class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    save(obj) {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then( contenido => {
            if (contenido.length) { 
                let long = JSON.parse(contenido).length;
                obj.id = JSON.parse(contenido)[long - 1].id + 1;
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

    getAll() {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then(contenido => {
            console.log(JSON.parse(contenido))
        })
        .catch(err => {
            console.log("Sin productos", err)
        })
    }

    deleteById(id) {
        fs.promises.readFile(`./${this.archivo}`, "utf-8")
        .then(contenido => {
            let contenidoFiltrado = JSON.parse(contenido).filter(elem => elem.id !== id)
            let existeId = JSON.parse(contenido).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(`./${archivo}`, JSON.stringify(contenidoFiltrado, null, 3))
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

const Prod = new Contenedor("productos.txt");

Prod.save({ title: "Alfajor Milka Oreo", precio: 120, thumbnail: "https://http2.mlstatic.com/D_NQ_NP_948420-MLA44561409769_012021-O.jpg"});


Prod.getAll();

Prod.getById(3);

Prod.deleteById(3);

Prod.deleteAll();