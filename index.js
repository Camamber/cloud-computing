const express = require('express'),
    app = express(),
    server = require('http').createServer(app);

const LabsController = require('./controllers/labsController')

const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'mysql',

    connection: {
        host: process.env.RDS_HOSTNAME,
        port: process.env.RDS_PORT,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DB_NAME
    }
});

// Give the knex instance to objection.
Model.knex(knex);


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
app.get('/', (req, res) => {
    res.send({ 'message': 'Hello its labs Manager' })
});
app.get('/labs', LabsController.index)
app.post('/labs', LabsController.store)
app.get('/labs/:id', LabsController.show)
app.put('/labs/:id', LabsController.update)
app.delete('/labs/:id', LabsController.delete)


async function createSchema() {
    if (await knex.schema.hasTable('labs')) {
        return;
    }

    // Create database schema. You should use knex migration files
    // to do this. We create it here for simplicity.
    await knex.schema.createTable('labs', table => {
        table.increments('id').primary();
        table.string('name');
        table.string('subject_name');
        table.string('filename');
        table.timestamps();
    });
}


createSchema()
    .then(() => {
        server.listen(process.env.PORT || 3333, function () {
            console.log('listen on port http://127.0.0.1:' + (process.env.PORT || 3333));
        });
    }).catch(err => {
        console.error(err);
        return knex.destroy();
    });



