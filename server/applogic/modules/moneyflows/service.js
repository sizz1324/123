"use strict";

let logger = require("../../../core/logger");
let config = require("../../../config");
let C = require("../../../core/constants");

let _ = require("lodash");

let Moneyflow = require("./models/moneyflow");

module.exports = {
    settings: {
        name: "moneyflows",
        version: 1,
        namespace: "moneyflows",
        rest: true,
        ws: true,
        graphql: false,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Moneyflow,

        // modelPropFilter: "code type address name description status lastCommunication createdAt updatedAt amount"
    },

    actions: {
        me(ctx) {
            return Promise.resolve(ctx.model).then((doc) => {
                return personService.toJSON(doc);
            });
        },

        find: {
            cache: true,
            handler(ctx) {
                let filter = {};

                let query = Moneyflow.find(filter);
                return ctx.queryPageSort(query).exec().then((docs) => {
                    return this.toJSON(docs);
                });
            }
        },

        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                ctx.assertModelIsExist(ctx.t("app:MoneyflowNotFound"));
                return Promise.resolve(ctx.model);
            }
        },

        create(ctx) {
            this.validateParams(ctx, true);

            let moneyflow = new Moneyflow({
                type: ctx.params.type,
                moneytype: ctx.params.moneytype,
                gametype: ctx.params.gametype,
                description: ctx.params.description,
                status: ctx.params.status,
                amount: ctx.params.amount,
                sumamount: ctx.params.sumamount,
                site: ctx.params.site
            });

            return moneyflow.save()
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
            ctx.assertModelIsExist(ctx.t("app:MoneyflowNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
                .then((doc) => {

                    if (ctx.params.address != null)
                        doc.address = ctx.params.address;

                    if (ctx.params.type != null)
                        doc.type = ctx.params.type;

                    if (ctx.params.name != null)
                        doc.name = ctx.params.name;

                    if (ctx.params.description != null)
                        doc.description = ctx.params.description;

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
            ctx.assertModelIsExist(ctx.t("app:MoneyflowNotFound"));

            return Moneyflow.remove({ _id: ctx.modelID })
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
            //     ctx.validateParam("name").trim().notEmpty(ctx.t("app:MoneyflowNameCannotBeBlank")).end();

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