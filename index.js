const express = require('express'),
    app = express(),
    server = require('http').createServer(app);


const LabsController = require('./controllers/labsController')


app.use(express.json())
app.use((req, res, next) => {
    if (req.path != '/favicon.ico') {
        console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    }
    next();
});


/**
 * Routes
 */
app.get('/labs', LabsController.index)
app.post('/labs', LabsController.store)
app.get('/labs/:id', LabsController.show)
app.put('/labs/:id', LabsController.update)
app.delete('/labs/:id', LabsController.delete)



server.listen(3333, function () {
    console.log('listen on port http://127.0.0.1:3333');
});