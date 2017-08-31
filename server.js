const express = require('express'),
    app = module.exports = express(),
    config = require('./config/config'),
    massive = require('massive'),
    fileArr = require('./services/fileArr'),
    connString = config.MASSIVE_URI,
    massiveInstance = massive.connectSync({connectionString: connString});

app.set('db', massiveInstance);

require('./middleware/middleware')(app);
require('./routes/users')(app);
require('./routes/products')(app);
require('./routes/cart')(app);

// fileArr.arr.map(file => {
//     app.use(express.static(__dirname + file));
// })

//<--------- production ----------->
process.env.PWD = process.cwd();

app.use('/', express.static(process.env.PWD + '/dist'));

fileArr.arr.filter(a => {
    if(a !== '/dist'){
        return true;
    }
}).map(file => {
    app.use(express.static(process.env.PWD + file));
})
//<--------- production ----------->

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
})
