import Vue from "vue";
import toastr from "../../../core/toastr";
import { LOAD, ADD, SELECT, CLEAR_SELECT, UPDATE, REMOVE } from "./types";
import axios from "axios";
import _ from "lodash";

export const NAMESPACE = "/api/exchangecharges";

let me = () => {
    axios.get("/api/session/me")
        .then(r => {
            return r.data.data;
        });
};

export const selectRow = ({ commit }, row, multiSelect) => {
    commit(SELECT, row, multiSelect);
};

export const clearSelection = ({ commit }) => {
    commit(CLEAR_SELECT);
};

export const downloadRows = ({ commit }) => {
    // console.log('로그me:', me());
    axios
        .get(NAMESPACE)
        .then(response => {
            let res = response.data;
            // res.data = _.filter(res.data, a => {
            //     return a.userid == 27;
            // });
            if (res.status == 200 && res.data) {
                commit(LOAD, res.data);
            } else console.error('Request error!', res.error);
        })
        .catch(response => {
            console.error('Request error!', response.statusText);
        });
};

export const downloadRows2 = ({ commit }) => {
    axios.get(NAMESPACE).then((response) => {

        let res = response.data;
        // res.data = _.filter(res.data, (a) => { return a.userid == 27; });
        if (res.status == 200 && res.data) {
            commit(LOAD, res.data);
        } else
            console.error("Request error!", res.error);

    }).catch((response) => {
        console.error("Request error!", response.statusText);
    });
    console.log('로그:', this.$parent.me);

};

export const saveRow = ({ commit }, model) => {
    axios
        .post(NAMESPACE, model)
        .then(response => {
            let res = response.data;
            // console.log('로그model:', model);
            alert(model);
            if (res.status == 200 && res.data) created({ commit }, res.data, true);
        })
        .catch(response => {
            if (response.data.error) toastr.error(response.data.error.message);
        });
};

export const created = ({ commit }, row, needSelect) => {
    commit(ADD, row);
    if (needSelect)
        commit(SELECT, row, false);
};

export const updateRow = ({ commit }, row) => {
    axios.put(NAMESPACE + "/" + row.code, row).then((response) => {
        let res = response.data;
        if (res.data)
            commit(UPDATE, res.data);
    }).catch((response) => {
        if (response.data.error)
            toastr.error(response.data.error.message);
    });
};

export const updated = ({ commit }, row) => {
    commit(UPDATE, row);
};

export const removeRow = ({ commit }, row) => {
    axios.delete(NAMESPACE + "/" + row.code).then((response) => {
        commit(REMOVE, row);
    }).catch((response) => {
        if (response.data.error)
            toastr.error(response.data.error.message);
    });
};

export const removed = ({ commit }, row) => {
    commit(REMOVE, row);
};