"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("./app-data-source");
var restaurantRouter_1 = require("./routes/restaurantRouter");
// establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log('Data Source has been initialized!');
})
    .catch(function (err) {
    console.error('Error during Data Source initialization:', err);
});
// create and setup express app
var app = express();
app.use(express.json());
// register routes
app.use('/api/restaurant', restaurantRouter_1.restaurantRouter);
app.use('/*', function (req, res) {
    res.status(404).json({
        status: 'FAIL',
        message: "Ce nom de domaine n'existe pas",
        data: null,
    });
});
// start express server
app.listen(3000);
