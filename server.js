require('dotenv').config();
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mainRoute = require('./src/routes/main');
const yaml = require('yamljs');
const swaggerJSDoc = yaml.load('./src/api_docs/todolist.yaml')
const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc, { explorer: true }));

app.use('/', mainRoute);

app.listen(process.env.PORT, (req, res) => {
    console.log('listening on port: ' + process.env.PORT);
});