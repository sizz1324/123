"use strict";

// let ROOT 			= "../../";
let logger = require("../../core/logger");
let config = require("../../config");

let _ = require("lodash");
let tokgen = require("../../libs/tokgen");
let fakerator = require("fakerator")();

let User = require("../.././models/user");
let Device = require("../modules/devices/models/device");
let Post = require("../modules/posts/models/post");
let Moneyflow = require("../modules/moneyflows/models/moneyflow");
let Exchangecharge = require("../modules/exchangecharges/models/exchangecharge");

module.exports = function() {

    let moneyflows = Moneyflow.find({}).exec().then((docs) => {
        if (docs.length == 0) {
            logger.warn("Load defaul거머냐 머니플로우.");

            _.times(36, () => {

                let moneyflow = new Moneyflow({
                    address: fakerator.internet.ip(),
                    type: fakerator.random.arrayElement(["니꺼", "내꺼", "제꺼", "쟤꺼"]),
                    name: fakerator.populate("#{names.firstName}'s 머니플"),
                    description: fakerator.lorem.sentence(),
                    status: fakerator.random.boolean("80") ? 1 : 0,
                    lastCommunication: Date.now(),
                    amount: 10000,

                });

                return moneyflow.save().then(() => {
                    logger.info("Default 머니플 created!");
                });
            });
        }
    });

    let exchangecharges = Exchangecharge.find({}).exec().then((docs) => {
        if (docs.length == 0) {
            logger.warn("Load defaul거머냐 머니플로우.");

            _.times(36, () => {

                let exchangecharge = new Exchangecharge({
                    address: fakerator.internet.ip(),
                    type: fakerator.random.arrayElement(["니꺼", "내꺼", "제꺼", "쟤꺼"]),
                    name: fakerator.populate("#{names.firstName}'s 머니플"),
                    description: fakerator.lorem.sentence(),
                    status: fakerator.random.boolean("80") ? 1 : 0,
                    lastCommunication: Date.now(),
                    amount: 10000,

                });

                return exchangecharge.save().then(() => {
                    logger.info("Default 머니플 created!");
                });
            });
        }
    });

    let devices = Device.find({}).exec().then((docs) => {
        if (docs.length == 0) {
            logger.warn("Load default Devices to DB...");

            _.times(36, () => {

                let device = new Device({
                    address: fakerator.internet.ip(),
                    type: fakerator.random.arrayElement(["rasperry", "odroid", "nanopi", "pc"]),
                    name: fakerator.populate("#{names.firstName}'s device"),
                    description: fakerator.lorem.sentence(),
                    status: fakerator.random.boolean("80") ? 1 : 0,
                    lastCommunication: Date.now(),
                    amount: 10000

                });

                return device.save().then(() => {
                    logger.info("Default devices created!");
                });
            });
        }
    });

    let posts = Post.find({}).exec(function(err, docs) {
        if (docs.length === 0) {
            logger.warn("Load default Posts to DB...");

            User.find({}).lean().select("_id").exec((err, users) => {
                if (users && users.length > 0) {
                    _.times(60, () => {

                        let fakePost = fakerator.entity.post(fakerator.random.number(2, 1));

                        let post = new Post({
                            title: fakePost.title,
                            content: fakePost.content,
                            author: fakerator.random.arrayElement(users)._id
                        });

                        return post.save().then(() => {
                            logger.info("Default posts created!");
                        });

                        // TODO make voters
                    });
                }

            });

        }
    });

    return Promise.all([devices, posts, moneyflows]);
};