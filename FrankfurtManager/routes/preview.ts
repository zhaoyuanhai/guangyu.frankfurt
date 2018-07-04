import mongoose = require('mongoose');
import express = require('express');
import dal = require('../dal');

var route = express();

route.get('/', (req, res) => {
    dal.typeModel.findById(req.query.id, (err, result: any) => {
        res.render('preview', { content: result._doc.content });
    });
});

export default route;