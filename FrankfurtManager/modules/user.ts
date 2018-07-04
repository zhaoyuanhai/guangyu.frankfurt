import dal = require('../dal');
import models = require("../models");
class user {
	login(uid: String, pwd: String, callback?: (err: any, res: any) => void): void {
		dal.userModel.findOne({ userName: uid }, function (err, result) {			
			callback(err, result);			
		});
	}
}

export = new user();