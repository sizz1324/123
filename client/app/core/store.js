import Vue from "vue";
import Vuex from "vuex";

import session from "../modules/session/store";
import devices from "../modules/devices/store";
import posts from "../modules/posts/store";
import counter from "../modules/counter/store";
import profile from "../modules/profile/store";
import moneyflows from "../modules/moneyflows/store";
import charge from "../modules/charge/store";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        session,
        counter,
        devices,
        posts,
        profile,
        moneyflows,
        charge
    }
});