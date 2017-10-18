"use strict";

// let ROOT 			= "../../../../";
let config = require("../../../../config");
let logger = require("../../../../core/logger");

let db = require("../../../../core/mongo");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let hashids = require("../../../../libs/hashids")("exchangecharge");
let autoIncrement = require("mongoose-auto-increment");

let schemaOptions = {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

let ExchangechargeSchema = new Schema({
    userid: {
        type: String,
        trim: true,
        lowercase: true
    },
    bank: {
        username: {
            type: String,
            trim: true
        },
        number: {
            type: Number,
            trim: true
        },
        name: {
            type: String,
            trim: true
        }
    },
    dowhat: {
        type: String,
        trim: true
    },
    moneytype: {
        type: String,
        trim: true
    },
    amount: {
        type: Object,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        "default": ""
    },
    status: {
        type: Number,
        "default": 0
    },
    lastCommunication: {
        type: Date,
        "default": Date.now
    },
    site: {
        type: String,
        trim: true
    },
    showuser: {
        type: String,
        trim: true,
        "default": "Y"
    },
    metadata: {}

}, schemaOptions);

ExchangechargeSchema.virtual("code").get(function() {
    return this.encodeID();
});

ExchangechargeSchema.plugin(autoIncrement.plugin, {
    model: "Exchangecharge",
    startAt: 1
});

ExchangechargeSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

ExchangechargeSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Exchangecharge = mongoose.model("Exchangecharge", ExchangechargeSchema);

module.exports = Exchangecharge;