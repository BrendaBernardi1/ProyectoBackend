const express = require('express');
const { Router } = express
const Api = require("./ApiF.js");

const app = express()
const router = Router()

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 })
server.on("error", error => console.log(`Error en servidor ${error}`));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

let productos = [
    {
        title: "SAMSUNG GALAXY A12",
        price: 38000,
        thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cetrogar.com.ar%2Fcelular-samsung-a12-6-5-4-128-black.html&psig=AOvVaw32DYbK5FJzElEU7zwqt-qK&ust=1652828213468000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCKi11IaP5fcCFQAAAAAdAAAAABAO",
        id: 1,
    },
    {
        title: "SAMSUNG GALAXY A52",
        price: 74000,
        thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mercadolibre.com.ar%2Fsamsung-galaxy-a52-128-gb-awesome-black-6-gb-ram%2Fp%2FMLA17493810&psig=AOvVaw0TJpCgxBXTWQJneYAIvCBI&ust=1652828000243000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNiL66CO5fcCFQAAAAAdAAAAABAg",
        id: 2,
    },
    {
        title: "SAMSUNG GALAXY A21S",
        price: 55000,
        thumbnail: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdistechn.com%2Fproducto%2Fsamsung-a21s&psig=AOvVaw3exUJhlMdVwVhZRAvnLML8&ust=1652828121456000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCNCiz9qO5fcCFQAAAAAdAAAAABAM",
        id: 3,
    }, 
];

const myApi = new Api(productos);

router.get('/productos', (req, res) => {
    return myApi.getProducts(req, res)
 })

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
 })

router.post('/productos', (req, res) => {
    return myApi.postProduct(req, res)
 })

router.put("/productos/:id", (req, res) => {
    return myApi.putProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.use('/api', router);