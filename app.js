const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const app= express();

const url = 'mongodb://yograpradipta:yogra2020@cluster0-shard-00-00.xx8ws.mongodb.net:27017,cluster0-shard-00-01.xx8ws.mongodb.net:27017,cluster0-shard-00-02.xx8ws.mongodb.net:27017/dbmypro?ssl=true&replicaSet=atlas-39xxc5-shard-0&authSource=admin&retryWrites=true&w=majority';
// const url ='mongodb://localhost:27017/dbsti'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}, (err) => {
    if (err) {
        console.log('error',err);
    } else {
        console.log("conected to database");
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

const appRouter= require('./routers/route');
// const mainRoutes= require('./routers/main');

//pasport js

// app.use('/app/', mainRoutes);
app.use('/app',appRouter);

app.listen(config.port, function(){
    console.log("server started in 3030")
})
