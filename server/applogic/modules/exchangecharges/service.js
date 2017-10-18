"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");

let _ = require("lodash");

let Exchangecharge = require("./models/exchangecharge");

module.exports = {
    settings: {
        name: "exchangecharges",
        version: 1,
        namespace: "exchangecharges",
        rest: true,
        ws: true,
        graphql: false,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Exchangecharge,

        // modelPropFilter: "code type address name description status lastCommunication createdAt updatedAt amount"
    },

    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = { userid: ctx.user._id };

                let query = Exchangecharge.find(filter);
                return ctx.queryPageSort(query).exec().then((docs) => {
                    return this.toJSON(docs);
                });
            }
        },
        findall: {
            cache: true,
            handler(ctx) {
                let filter = {};

                let query = Exchangecharge.find(filter);
                return ctx.queryPageSort(query).exec().then((docs) => {
                    console.log('로그docsdocsdocsdocsdocs:', ctx.user._id);
                    return this.toJSON(docs);
                });
            }
        },

        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                ctx.assertModelIsExist(ctx.t("파인드가아닌 겟으로 나옴."));
                return Promise.resolve(ctx.model);
            }
        },
        create(ctx) {
            this.validateParams(ctx, true);
            let exchangecharge = new Exchangecharge({
                userid: ctx.user.id,
                dowhat: ctx.params.dowhat,
                moneytype: ctx.params.moneytype,
                amount: ctx.params.amount,
                description: ctx.params.description,
                status: ctx.params.status,
                showuser: ctx.params.showuser,
                site: ctx.user.email,
                "bank.name": ctx.user.bank.name,
                "bank.number": ctx.user.bank.number,
                "bank.username": ctx.user.bank.username
            });
            return exchangecharge.save()
                .then((doc) => {
                    return this.toJSON(doc);
                })
                .then((json) => {
                    return this.populateModels(json);
                })
                .then((json) => {
                    this.notifyModelChanges(ctx, "created", json);
                    return json;
                });
        },

        update(ctx) {
            ctx.assertModelIsExist(ctx.t("app:ExchangechargeNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
                .then((doc) => {

                    // if (ctx.params.address != null)
                    //     doc.address = ctx.params.address;

                    if (ctx.params.type != null)
                        doc.type = ctx.params.type;

                    // if (ctx.params.name != null)
                    //     doc.name = ctx.params.name;

                    // if (ctx.params.description != null)
                    //     doc.description = ctx.params.description;

                    if (ctx.params.status != null)
                        doc.status = ctx.params.status;

                    return doc.save();
                })
                .then((doc) => {
                    return this.toJSON(doc);
                })
                .then((json) => {
                    return this.populateModels(json);
                })
                .then((json) => {
                    this.notifyModelChanges(ctx, "updated", json);
                    return json;
                });
        },

        remove(ctx) {
            ctx.assertModelIsExist(ctx.t("app:ExchangechargeNotFound"));

            return Exchangecharge.remove({ _id: ctx.modelID })
                .then(() => {
                    return ctx.model;
                })
                .then((json) => {
                    this.notifyModelChanges(ctx, "removed", json);
                    return json;
                });
        }

    },

    methods: {
        /**
         * Validate params of context.
         * We will call it in `create` and `update` actions
         * 
         * @param {Context} ctx 			context of request
         * @param {boolean} strictMode 		strictMode. If true, need to exists the required parameters
         */
        validateParams(ctx, strictMode) {
            // if (strictMode || ctx.hasParam("name"))
            //     ctx.validateParam("name").trim().notEmpty(ctx.t("app:ExchangechargeNameCannotBeBlank")).end();

            if (strictMode || ctx.hasParam("status"))
                ctx.validateParam("status").isNumber();

            // ctx.validateParam("description").trim().end();
            // ctx.validateParam("address").trim().end();
            // ctx.validateParam("type").trim().end();

            if (ctx.hasValidationErrors())
                throw ctx.errorBadRequest(C.ERR_VALIDATION_ERROR, ctx.validationErrors);
        }
    },

    init(ctx) {
        // Fired when start the service  
    },

    socket: {
        afterConnection(socket, io) {
            // Fired when a new client connected via websocket
        }
    }

};