"use strict";

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../modules/home";
import Counter from "../modules/counter";
import Devices from "../modules/devices";
import Posts from "../modules/posts";
import Profile from "../modules/profile";
import Moneyflows from "../modules/moneyflows";
import Charge from "../modules/charge";

Vue.use(VueRouter);

export default new VueRouter({
    mode: "hash",
    routes: [
        { path: "/", component: Home },
        { path: "/devices", component: Devices },
        { path: "/posts", component: Posts },
        { path: "/counter", component: Counter },
        { path: "/profile", component: Profile },
        { path: "/moneyflows", component: Moneyflows },
        { path: "/charge", component: Charge },
        { path: "/exchange", component: Moneyflows },

        //{ path: "/users", component: User, meta: { needRole: "admin" } },
        //{ path: "*", component: NotFound }
    ]
});