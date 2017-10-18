"use strict";

// let ROOT 			= "../../../../";
let config = require("../../../../config");
let logger = require("../../../../core/logger");

let db = require("../../../../core/mongo");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let hashids = require("../../../../libs/hashids")("moneyflows");
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

let MoneyflowSchema = new Schema({
    moneytype: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    gametype: {
        type: String,
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
    amount: {
        type: Number
    },
    sumamount: {
        type: Number
    },
    site: {
        type: String
    },
    metadata: {}

}, schemaOptions);

MoneyflowSchema.virtual("code").get(function() {
    return this.encodeID();
});

MoneyflowSchema.plugin(autoIncrement.plugin, {
    model: "Moneyflow",
    startAt: 1
});

MoneyflowSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

MoneyflowSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Moneyflow = mongoose.model("Moneyflow", MoneyflowSchema);

module.exports = Moneyflow;