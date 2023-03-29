const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3030
const mongooes = require('mongoose');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', expressHbs.engine({
    extname: 'hbs',
    defaultLayout: 'layouts',
    layoutDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));
app.set('view engine', '.hbs');
app.set('views', './views');
const uri = 'mongodb+srv://ngkhacdai:FeIazp6Sgfv3KthP@cluster0.fbcyexd.mongodb.net/TextMongoDB?retryWrites=true&w=majority';
const baitapSchema = require('./baitap');


app.get('/', async (req, res) => {
    await mongooes.connect(uri);
    await baitapSchema.find({}).then((baitap) => {
        res.render('home', { layout: 'index', baitap: baitap });
    })
})


app.post('/index', async (req, res) => {
    const albumID = Number(req.body.albumID);
    const title = req.body.title;
    const url = req.body.url;
    const thumnailUrl = req.body.thumnailUrl;
    await mongooes.connect(uri);
    await baitapSchema.insertMany([
        { albumID: albumID, title: title, url: url, thumnailUrl: thumnailUrl }
    ]);
    var baitap = await baitapSchema.find();
    res.render('home', { layout: 'index', baitap: baitap });
})
app.post('/index/update', async (req, res) => {
    const id = req.body.id;
    const albumID = Number(req.body.albumID);
    const title = req.body.title;
    const url = req.body.url;
    const thumnailUrl = req.body.thumnailUrl;
    await mongooes.connect(uri);
    await baitapSchema.updateOne({ _id: id }, {
        $set:
            { albumID: albumID, title: title, url: url, thumnailUrl: thumnailUrl }
    });
    var baitap = await baitapSchema.find();
    res.render('home', { layout: 'index', baitap: baitap });
})
app.get('/index', async (req, res) => {
    await mongooes.connect(uri);
    let baitap = await baitapSchema.find();
    res.render('home', { layout: 'index', baitap: baitap });

})
app.get('/index/delete/:id', async (req, res) => {
    const id = req.params.id;
    await mongooes.connect(uri);
    await baitapSchema.deleteOne({ _id: id });
    var baitap = await baitapSchema.find();
    res.render('home', { layout: 'index', baitap: baitap });
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})