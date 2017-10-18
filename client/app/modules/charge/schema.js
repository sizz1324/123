import Vue from "vue";
import moment from "moment";
import { moneyTypes, dowhat } from "./types";
import { validators } from "vue-form-generator";

import { find } from "lodash";

let _ = Vue.prototype._;

module.exports = {

    id: "charge",
    title: _("차지페이지"),

    table: {
        multiSelect: true,
        columns: [{
                title: _("userid"),
                field: "userid"
            },
            {
                title: _("dowhat"),
                field: "dowhat"
            },
            {
                title: _("moneytype"),
                field: "moneytype"
            },
            {
                title: _("description"),
                field: "description"
            },
            {
                title: _("amount"),
                field: "amount"
            },
            {
                title: _("bank.username"),
                field: "bank.username"
            },
            {
                title: _("bank.number"),
                field: "bank.number"
            },
            {
                title: _("bank.name"),
                field: "bank.name"
            },
            {
                title: _("site"),
                field: "site"
            },
            {
                title: _("showuser"),
                field: "showuser"
            },
            {
                title: _("Status"),
                field: "status",
                formatter(value, model, col) {
                    return value ? "<i class='fa fa-check'/>2222222" : "111111111<i class='fa fa-ban'/>";
                },
                align: "right"
            },
            {
                title: _("LastCommunication"),
                field: "lastCommunication",
                formatter(value) {
                    return moment(value).fromNow();
                }
            }
        ],

        rowClasses: function(model) {
            return {
                inactive: !model.status
            };
        }

    },

    form: {
        fields: [{
                type: "select",
                label: _("충환?"),
                model: "dowhat",
                required: true,
                values: dowhat,
                default: "Charge",
                validator: validators.required

            }, {
                type: "select",
                label: _("입금종류"),
                model: "moneytype",
                required: true,
                values: moneyTypes,
                default: "Cash",
                validator: validators.required

            },
            {
                type: "input",
                label: _("입금액"),
                model: "amount",
                featured: true,
                required: true,
                placeholder: _("입금액"),
                validator: validators.string
            }
            /*,
            {
                type: "input",
                label: _("입금자명"),
                model: "bank_username",
                featured: true,
                required: true,
                placeholder: _("입금액"),
                validator: validators.string
            },
            {
                type: "input",
                label: _("은행명"),
                model: "bank_name",
                featured: true,
                required: true,
                placeholder: _("입금액"),
                validator: validators.string
            },
            {
                type: "input",
                label: _("환전계좌"),
                model: "bank_number",
                featured: true,
                required: true,
                placeholder: _("입금액"),
                validator: validators.string
            }*/
        ]
    },

    options: {
        searchable: true,


        enableNewButton: true,
        enabledSaveButton: true,
        enableDeleteButton: true,
        enableCloneButton: true,

        validateAfterLoad: false, // Validate after load a model
        validateAfterChanged: false, // Validate after every changes on the model
        validateBeforeSave: true // Validate before save a model
    },

    events: {
        onSelect: null,
        onNewItem: null,
        onCloneItem: null,
        onSaveItem: null,
        onDeleteItem: null,
        onChangeItem: null,
        onValidated(model, errors, schema) {
            if (errors.length > 0)
                console.warn("Validation error in page! Errors:", errors, ", Model:", model);
        }
    },

    resources: {
        addCaption: _("새로등록"),
        saveCaption: _("저장"),
        cloneCaption: _("복제"),
        deleteCaption: _("삭제")
    }

};