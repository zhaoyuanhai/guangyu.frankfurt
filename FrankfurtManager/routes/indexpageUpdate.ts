import express = require('express');
import dal = require('../dal');

var route = express.Router();
route.get('/', function (req: express.Request, res: express.Response) {
    dal.indexPageModel.findById(req.query.id, (error, data) => {
        if (error)
        { }
        else {
            res.render('indexpageUpdate', { data: data });
        }
    })
});

route.post('/update', (req, res) => {
    var update = {
        //url: req.body.url,
        url: "1111111111",
        imgPath: req.body.imgPath,
        //language: req.body.language
        language: 1
    };
    //dal.indexPageModel.findByIdAndUpdate(req.query.id, update, (error, data) => {
    //    if (error) {
    //        console.log(error);
    //    }
    //    else {
    //        console.log('update ok!');

    //    }
    //    dal.db.close();
    //    res.render('indexpage');
    //});
});


export default route;