! function(e) {
    function t(r) { if (n[r]) return n[r].exports; var o = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports } var n = {}; return t.m = e, t.c = n, t.i = function(e) { return e }, t.d = function(e, n, r) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r }) }, t.n = function(e) { var n = e && e.__esModule ? function() { return e.default } : function() { return e }; return t.d(n, "a", n), n }, t.o = function(e, t) { return Object.prototype.hasOwnProperty.call(e, t) }, t.p = "", t(t.s = 149) }([function(e, t, n) { "use strict";
    (function(t) { var r = n(6),
            o = n(10),
            i = n(2),
            s = n(8),
            a = n(14);
        global.rootPath = r.normalize(r.join(t, "..", "..")), console.log("process.argv: " + process.argv); var u = void 0;
        u = process.argv.length > 0 ? process.argv[1] : process.cwd(), global.rootPath = r.normalize(r.join(r.dirname(u), "..")), console.log("Application root path: " + global.rootPath), e.exports = { isDevMode: function() { return !process.env.NODE_ENV || "development" === process.env.NODE_ENV }, isProductionMode: function() { return "production" === process.env.NODE_ENV }, isTestMode: function() { return "test" === process.env.NODE_ENV } }; var c = {},
            l = r.join(global.rootPath, "config.js"); try { if (!o.existsSync(l)) { console.warn(s.yellow.bold("External production configuration not found!. Create a default `config.js` file...")); var d = void 0;
                d = n(95), i.templateSettings.interpolate = /{{([\s\S]+?)}}/g; var f = i.template(d),
                    p = { hashSecret: a(), sessionSecret: a() };
                o.writeFileSync(l, f(p)), console.warn(s.green.bold("The `config.js` file created! Please update the settings in the file!")) }
            c = n(99) } catch (e) { console.warn(s.red.bold("\r\n==============================================")), console.warn(s.red.bold("  Unable to load external `config.js` file!")), console.warn(s.red.bold(" ", e)), console.warn(s.red.bold("==============================================\r\n")), process.exit(1) } var m = n(67),
            v = {};
        e.exports.isTestMode() ? (console.log("Load test config..."), v = n(69), c = {}) : e.exports.isProductionMode() && (console.log("Load production config..."), v = n(68)), e.exports = i.defaultsDeep(c, v, m, e.exports) }).call(t, "server\\config") }, function(e, t, n) { "use strict"; var r = n(142),
        o = n(6),
        i = n(10),
        s = n(44),
        a = n(0),
        u = []; if (u.push(new r.transports.Console({ level: a.logging.console.level, colorize: !0, prettyPrint: !0, handleExceptions: "production" === process.env.NODE_ENV })), a.logging.logentries.enabled && a.logging.logentries.token) { console.log("Logentries log transport enabled!");
        n(121);
        u.push(new r.transports.Logentries({ level: "debug", token: a.logging.logentries.token })) } if (a.logging.papertrail.enabled) { console.log("Papertrail log transport enabled!"), n(148).Papertrail; var c = new r.transports.Papertrail(a.logging.papertrail);
        u.push(c) } if (a.logging.file.enabled) { var l = a.logging.file.path;
        i.existsSync(l) || s(l), u.push(new(n(143))({ filename: o.join(l, "server.log"), level: a.logging.file.level || "info", timestamp: !0, json: a.logging.file.json || !1, handleExceptions: !0 })), a.logging.file.exceptionFile && u.push(new r.transports.File({ filename: o.join(l, "exceptions.log"), level: "error", timestamp: !0, json: a.logging.file.json || !1, prettyPrint: !0, handleExceptions: !0, humanReadableUnhandledException: !0 })) } var d = new r.Logger({ level: "debug", transports: u, exitOnError: !1 }); if (a.logging.loggly.enabled && a.logging.loggly.token) { console.log("Loggly log transport enabled!");
        n(145);
        d.add(r.transports.Loggly, { inputToken: a.logging.loggly.token, subdomain: a.logging.loggly.subdomain, tags: ["vem-server"], json: !0 }) } if (a.logging.logsene.enabled && a.logging.logsene.token) { console.log("Logsene log transport enabled!"); var f = n(146);
        d.add(f, { type: "vem-server", token: a.logging.logsene.token }) } if (a.logging.logzio.enabled && a.logging.logzio.token) { console.log("Logz.io log transport enabled!"); var p = n(147);
        d.add(p, { token: a.logging.logzio.token }) } if (a.logging.graylog.enabled) { console.log("Graylog log transport enabled! Servers: " + JSON.stringify(a.logging.graylog.servers)); var m = n(144);
        d.add(m, { name: "Graylog", level: "debug", graylog: { servers: a.logging.graylog.servers, facility: "vem" } }) }
    e.exports = d }, function(e, t) { e.exports = require("lodash") }, function(e, t, n) { "use strict"; var r = (n(0), n(1), n(4)),
        o = (n(10), n(6), n(2), n(23)),
        i = n(102),
        s = (n(15), n(11)),
        a = s.Schema,
        u = n(20)("users"),
        c = n(19),
        l = { timestamps: !0, toObject: { virtuals: !0 }, toJSON: { virtuals: !0 } },
        d = function(e) { return "local" !== this.provider && !this.updated || e.length },
        f = function(e) { return "local" !== this.provider || e && e.length >= 6 },
        p = new a({ fullName: { type: String, trim: !0, default: "", validate: [d, "Please fill in your full name"] }, email: { type: String, trim: !0, unique: !0, index: !0, lowercase: !0, default: "", validate: [d, "Please fill in your email"], match: [/.+\@.+\..+/, "Please fill a valid email address"] }, username: { type: String, unique: !0, index: !0, lowercase: !0, required: "Please fill in a username", trim: !0, match: [/^[\w][\w\-\._\@]*[\w]$/, "Please fill a valid username"] }, password: { type: String, default: "", validate: [f, "Password should be longer"] }, passwordLess: { type: Boolean, default: !1 }, passwordLessToken: { type: String }, provider: { type: String, default: "local" }, profile: { name: { type: String }, gender: { type: String }, picture: { type: String }, location: { type: String } }, socialLinks: { facebook: { type: String, unique: !0, sparse: !0 }, twitter: { type: String, unique: !0, sparse: !0 }, google: { type: String, unique: !0, sparse: !0 }, github: { type: String, unique: !0, sparse: !0 } }, roles: { type: [{ type: String, enum: [r.ROLE_ADMIN, r.ROLE_USER, r.ROLE_GUEST] }], default: [r.ROLE_USER] }, resetPasswordToken: String, resetPasswordExpires: Date, verified: { type: Boolean, default: !1 }, verifyToken: { type: String }, apiKey: { type: String, unique: !0, index: !0, sparse: !0 }, lastLogin: { type: Date }, locale: { type: String }, status: { type: Number, default: 1 }, metadata: {} }, l);
    p.virtual("code").get(function() { return this.encodeID() }), p.plugin(c.plugin, { model: "User", startAt: 1 }), p.pre("save", function(e) { var t = this; return t.isModified("password") ? void i.genSalt(10, function(n, r) { i.hash(t.password, r, null, function(n, r) { t.password = r, e() }) }) : e() }), p.methods.comparePassword = function(e, t) { i.compare(e, this.password, function(e, n) { t(e, n) }) }, p.virtual("avatar").get(function() { if (this.profile && this.profile.picture) return this.profile.picture; if (!this.email) return "https://gravatar.com/avatar/?s=64&d=wavatar"; var e = o.createHash("md5").update(this.email).digest("hex"); return "https://gravatar.com/avatar/" + e + "?s=64&d=wavatar" }), p.methods.encodeID = function() { return u.encodeHex(this._id) }, p.methods.decodeID = function(e) { return u.decodeHex(e) }; var m = s.model("User", p);
    e.exports = m }, function(e, t, n) { "use strict"; var r = {};
    r.append = function(e, t) { e.forEach(function(e) { var n = e.toUpperCase();
            t && (n = t + "_" + n), r[n] = e }) }, r.append(["admin", "user", "guest"], "ROLE"), r.append(["admin", "owner", "loggedIn", "public"], "PERM"), r.append(["VALIDATION_ERROR", "INVALID_CODE", "MODEL_NOT_FOUND", "ONLY_OWNER_CAN_EDIT_AND_DELETE"], "ERR"), e.exports = r }, function(e, t) { e.exports = require("passport") }, function(e, t) { e.exports = require("path") }, function(e, t, n) { "use strict";
    (function(t) {
        function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }

        function o(e, t) { if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return !t || "object" != typeof t && "function" != typeof t ? e : t }

        function i(e, t) { if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t) } var s = function() {
                function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
            a = n(1),
            u = (n(0), n(108).EventEmitter),
            c = n(6),
            l = (n(10), n(137), n(2)),
            d = n(8),
            f = n(18),
            p = (n(4), n(80)),
            m = n(9),
            v = n(12),
            h = n(110),
            g = (n(104), n(112).GraphQLScalarType, n(31).Kind),
            y = n(81),
            E = function(e) {
                function u() { r(this, u); var e = o(this, (u.__proto__ || Object.getPrototypeOf(u)).call(this)); return e.setMaxListeners(0), e.app = null, e.db = null, e.services = {}, e } return i(u, e), s(u, [{ key: "loadServices", value: function(e, r) { var o = this;
                        o.app = e, o.db = r; var i = function(t) { var n = new y(t, e, r);
                            o.services[n.name] = n };! function() { a.info(""), a.info(d.bold("Search built-in services...")); var e = n(98);
                            e && e.keys().map(function(n) { a.info("  Load", c.relative(c.join(t, "..", "services"), n), "service..."), i(e(n)) }) }(), ! function() { a.info(""), a.info(d.bold("Search applogic services...")); var e = n(96);
                            e && e.keys().map(function(n) { a.info("  Load", c.relative(c.join(t, "..", "applogic", "modules"), n), "service..."), i(e(n)) }) }(), l.forIn(o.services, function(e) { l.isFunction(e.$schema.init) && e.$schema.init.call(e, p.CreateToServiceInit(e)) }) } }, { key: "registerRoutes", value: function(e) { var t = this;
                        l.forIn(this.services, function(n, r) { n.$settings.rest !== !1 && n.actions && ! function() { var r = f.Router();
                                r.use(m.tryAuthenticateWithApiKey); var o = n.$settings.idParamName || "id",
                                    i = [];
                                l.forIn(n.actions, function(s, u) { var c = s.settings; if (c.handler = s, !l.isFunction(c.handler)) throw new Error("Missing handler function in '" + u + "' action in '" + n.name + "' service!"); var d = function(r, o) { var i = p.CreateFromREST(n, c, e, r, o);
                                        a.debug("Request via REST '" + n.namespace + "/" + c.name + "' (ID: " + i.id + ")", i.params), console.time("REST request"), t.emit("request", i);
                                        n.getCacheKey(c.name, i.params);
                                        Promise.resolve().then(function() { return i.resolveModel() }).then(function() { return i.checkPermission() }).then(function() { return c.handler(i) }).then(function(e) { o.append("Request-Id", i.id), v.json(o, e) }).catch(function(e) { a.error(e), v.json(o, null, e) }).then(function() { t.emit("response", i), console.timeEnd("REST request") }) }; switch (r.get("/" + u, d), r.post("/" + u, d), r.get("/:" + o + "/" + u, d), r.post("/:" + o + "/" + u, d), u) {
                                        case "find":
                                            r.get("/", d); break;
                                        case "get":
                                            i.push({ method: "get", path: "/:" + o, handler: d }); break;
                                        case "create":
                                            i.push({ method: "post", path: "/:" + o, handler: d }), r.post("/", d); break;
                                        case "update":
                                            i.push({ method: "put", path: "/:" + o, handler: d }), i.push({ method: "patch", path: "/:" + o, handler: d }), r.put("/", d), r.patch("/", d); break;
                                        case "remove":
                                            i.push({ method: "delete", path: "/:" + o, handler: d }), r.delete("/", d) } }), i.forEach(function(e) { r[e.method](e.path, e.handler) }), e.use("/api/" + n.namespace, r), n.version && e.use("/api/v" + n.version + "/" + n.namespace, r) }() }) } }, { key: "registerSockets", value: function(e, t) { var n = this;
                        l.forIn(this.services, function(r, o) { r.ws !== !1 && ! function() { r.socket = r.socket || {}; var o = void 0;
                                o = r.socket.nsp && "/" !== r.socket.nsp ? t.addNameSpace(r.socket.nsp, r.role) : e, r.io = o, o.on("connection", function(e) { l.isFunction(r.socket.afterConnection) && r.socket.afterConnection.call(r, e, o), l.forIn(r.actions, function(t, o) { var i = t.settings; if (i.handler = t, !l.isFunction(i.handler)) throw new Error("Missing handler function in '" + o + "' action in '" + r.name + "' service!"); var s = "/" + r.namespace + "/" + i.name,
                                            u = function(t, o) { var s = p.CreateFromSocket(r, i, n.app, e, t);
                                                a.debug("Request via WebSocket '" + r.namespace + "/" + i.name + "'", s.params), console.time("SOCKET request"), n.emit("request", s);
                                                r.getCacheKey(i.name, s.params);
                                                Promise.resolve().then(function() { return s.resolveModel() }).then(function() { return s.checkPermission() }).then(function() { return i.handler(s) }).then(function(e) { l.isFunction(o) && o(v.json(null, e)) }).catch(function(e) { a.error(e), l.isFunction(o) && o(v.json(null, null, e)) }).then(function() { n.emit("response", s), console.timeEnd("SOCKET request") }) };
                                        e.on(s, u), r.version && e.on("/v" + r.version + s, u) }) }) }() }) } }, { key: "registerGraphQLSchema", value: function() { var e = this,
                            t = { queries: [], types: [], mutations: [], resolvers: [] }; if (l.forIn(this.services, function(n, r) { if (n.$settings.graphql !== !1 && l.isObject(n.$schema.graphql)) { var o = n.$schema.graphql;
                                    o.resolvers = o.resolvers || {}; var i = function(t) { l.forIn(t, function(r, o) { if (l.isString(r) && n.actions[r]) { var i = function(t, i, s) { var u = n.actions[r],
                                                        c = u.settings; if (c.handler = u, !l.isFunction(c.handler)) throw new Error("Missing handler function in '" + o + "' action in '" + n.name + "' service!"); var d = p.CreateFromGraphQL(n, c, t, i, s);
                                                    a.debug("Request via GraphQL", d.params, s.query), console.time("GRAPHQL request"), e.emit("request", d);
                                                    n.getCacheKey(c.name, d.params); return Promise.resolve().then(function() { return d.resolveModel() }).then(function() { return d.checkPermission() }).then(function() { return c.handler(d) }).catch(function(e) { throw a.error(e), e }).then(function(t) { return e.emit("response", d), console.timeEnd("GRAPHQL request"), t }) };
                                                t[o] = i } }) };
                                    o.resolvers.Query && i(o.resolvers.Query), o.resolvers.Mutation && i(o.resolvers.Mutation), t.queries.push(o.query), t.types.push(o.types), t.mutations.push(o.mutation), t.resolvers.push(o.resolvers) } }), 0 == t.queries.length) return null; var n = "\n\n\t\t\tscalar Timestamp\n\n\t\t\ttype Query {\n\t\t\t\t" + t.queries.join("\n") + "\n\t\t\t}\n\n\t\t\t" + t.types.join("\n") + "\n\n\t\t\ttype Mutation {\n\t\t\t\t" + t.mutations.join("\n") + "\n\t\t\t}\n\n\t\t\tschema {\n\t\t\t\tquery: Query\n\t\t\t\tmutation: Mutation\n\t\t\t}\n\t\t",
                            r = function(e) { return t.resolvers.forEach(function(t) { e = l.merge(e, t) }), e }; return { schema: [n], resolvers: r({ Timestamp: { __parseValue: function(e) { return new Date(e) }, __serialize: function(e) { return e.getTime() }, __parseLiteral: function(e) { return e.kind === g.INT ? parseInt(e.value, 10) : null } } }) } } }, { key: "get", value: function(e) { return this.services[e] } }, { key: "printServicesInfo", value: function() { h(this.app) } }]), u }(u);
        e.exports = new E }).call(t, "server\\core") }, function(e, t) { e.exports = require("chalk") }, function(e, t, n) { "use strict"; var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        o = n(1),
        i = n(0),
        s = n(5),
        a = n(3);
    e.exports.isAuthenticated = function(e, t, n) { return e.isAuthenticated() ? n() : t.sendStatus(401) }, e.exports.tryAuthenticateWithApiKey = function(e, t, n) { e.isAuthenticated() ? n() : e.headers.apikey || e.query.apikey || e.body.apikey ? s.authenticate("localapikey", function(t, r, i) { r ? e.login(r, function(e) { n() }) : (o.warn("Apikey error:", i), n()) })(e, t, n) : n() }, e.exports.isAuthenticatedOrApiKey = function(e, t, n) { return e.isAuthenticated() ? n() : e.headers.apikey || e.query.apikey || e.body.apikey ? void s.authenticate("localapikey", function(r, o, i) { return r ? t.sendStatus(500) : o ? void e.login(o, function(e) { return e ? t.sendStatus(500) : n() }) : t.status(401).send(i.message || "") })(e, t, n) : t.sendStatus(401) }, e.exports.hasRole = function(t) { if (!t) throw new Error("Required role needs to be set"); return function(n, r, o) { return e.exports.isAuthenticated(n, r, function() { n.user && n.user.roles && n.user.roles.indexOf(t) !== -1 ? o() : r.sendStatus(403) }) } }, e.exports.hasAdminRole = function() { return e.exports.hasRole("admin") }, e.exports.linkToSocialAccount = function(e) { var t = e.req,
            n = (e.accessToken, e.refreshToken, e.profile),
            o = e.done,
            s = e.provider,
            u = (e.username, e.email),
            c = e.userData; if (t.user) { var l = {};
            l["socialLinks." + s] = n.id, a.findOne(l, function(e, r) { return r ? r._id != t.user._id ? (t.flash("error", { msg: t.t("SocialIDLinkedToOtherAccount") }), o(e)) : o(e, r) : void a.findById(t.user.id, function(e, r) { r.socialLinks = r.socialLinks || {}, r.socialLinks[s] = n.id, r.profile = r.profile || {}, r.profile.name = r.profile.name || c.name, r.profile.gender = r.profile.gender || c.gender, r.profile.picture = r.profile.picture || c.picture, r.profile.location = r.profile.location || c.location, r.save(function(e) { t.flash("info", { msg: t.t("AccountHasBeenLinked") }), o(e, r) }) }) }) } else { var d = {};
            d["socialLinks." + s] = n.id, a.findOne(d, function(e, l) { return l ? 1 !== l.status ? (t.flash("error", { msg: t.t("UserDisabledOrDeleted") }), o()) : o(e, l) : u ? void a.findOne({ email: u }, function(e, l) { if (l) { var d = function() { if (1 !== l.status) return t.flash("error", { msg: t.t("UserDisabledOrDeleted") }), { v: o() }; var e = l; return e.socialLinks = e.socialLinks || {}, e.socialLinks[s] = n.id, e.profile = e.profile || {}, e.profile.name = e.profile.name || c.name, e.profile.gender = e.profile.gender || c.gender, e.profile.picture = e.profile.picture || c.picture, e.profile.location = e.profile.location || c.location, e.save(function(n) { t.flash("info", { msg: t.t("AccountHasBeenLinked") }), o(n, e) }), { v: void 0 } }(); if ("object" === ("undefined" == typeof d ? "undefined" : r(d))) return d.v } if (i.features.disableSignUp === !0) return t.flash("error", { msg: t.t("SignUpDisabledPleaseLogin") }), o(); var f = new a;
                    f.fullName = c.name, f.email = u, f.username = u, f.provider = s, f.verified = !0, f.passwordLess = !0, f.socialLinks = {}, f.socialLinks[s] = n.id, f.profile = c, f.save(function(e) { o(e, f) }) }) : (t.flash("error", { msg: t.t("SocialMissingEmailAddress") }), o()) }) } } }, function(e, t) { e.exports = require("fs") }, function(e, t) { e.exports = require("mongoose") }, function(e, t, n) { "use strict";
    e.exports = { BAD_REQUEST: { status: 400, type: "BAD_REQUEST", message: "Invalid request" }, UNAUTHORIZED: { status: 401, type: "UNAUTHORIZED", message: "Unauthorized. Please login first!" }, REQUEST_FAILED: { status: 402, type: "REQUEST_FAILED", message: "Request failed!" }, FORBIDDEN: { status: 403, type: "FORBIDDEN", message: "You have not enough permission for this resource!" }, NOT_FOUND: { status: 404, type: "NOT_FOUND", message: "Not found!" }, TOO_MANY_REQUEST: { status: 429, type: "TOO_MANY_REQUEST", message: "Too many request!" }, SERVER_ERROR: { status: 500, type: "SERVER_ERROR", message: "Server error" }, NOT_IMPLEMENTED: { status: 501, type: "NOT_IMPLEMENTED", message: "This resource is not implemented!" }, json: function(e, t, n, r) { var o = {}; return n ? (o.error = n, o.status = n.status || 500, r && (o.error.message = r.message || r), o.data = t, e ? e.status(o.status).json(o) : o) : (o.status = 200, o.data = t, e ? e.json(o) : o) } } }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = (n(6), n(10), n(43)),
        s = n(2),
        a = n(39),
        u = n(5),
        c = n(135),
        l = n(40),
        d = n(38)(l),
        f = void 0,
        p = { IO: null, mongoStore: null, namespaces: {}, userSockets: [], init: function(e, t) { p.mongoStore = new d({ mongooseConnection: t.connection, collection: o.sessions.collection, autoReconnect: !0 }); var s = i.createServer(e),
                    a = c(s);
                e.io = p, p.IO = a, p.initNameSpace("/", a, p.mongoStore), a.on("connection", function(e) { e.on("welcome", function(t) { r.info("Incoming welcome message from " + e.request.user.username + ":", t) }) }); var u = n(7); return u.registerSockets(a, p), s }, addNameSpace: function(e, t) { var n = p.namespaces[e]; return null == n && (n = p.IO.of(e), p.initNameSpace(e, n, p.mongoStore, t)), n }, initNameSpace: function(e, t, i, s) { t.use(function(t, n) { a(o.sessionSecret)(t.request, {}, function(a) { var c = t.request.signedCookies ? t.request.signedCookies[o.sessions.name] : void 0; return c ? void i.get(c, function(o, a) { return o ? n(o, !1) : a ? (t.request.session = a, a.socket = t.id, i.set(c, a), void u.initialize()(t.request, {}, function() { u.session()(t.request, {}, function() { if (t.request.user) { var o = t.request.user;
                                        s ? o.roles && o.roles.indexOf(s) !== -1 ? n(null, !0) : (r.warn("Websocket user has no access to this namespace '" + e + "'!", o.username), n(new Error("You have NO access to this namespace '" + e + "'!"), !1)) : n(null, !0) } else r.warn("Websocket user is not authenticated!"), n(new Error("User is not authenticated! Please login first!"), !1) }) })) : n(new Error("session was not found for " + c), !1) }) : (r.warn("sessionId was not found in socket.request"), n(new Error("sessionId was not found in socket.request"), !1)) }) }), t.on("connection", function(e) { f || (f = n(7)), f.emit("socket:connect", e), p.addOnlineUser(e), r.debug("WS client connected to namespace " + (t.name || "root") + "! User: " + e.request.user.username), e.on("disconnect", function() { f.emit("socket:connect", e), p.removeSocket(e), r.debug("WS client disconnected from namespace " + (t.name || "root") + "!") }) }), p.namespaces[e] = t }, nsEmit: function(e, t, n) { if (p.namespaces[e]) return p.namespaces[e].emit(t, n), !0 }, addOnlineUser: function(e) { p.removeOnlineUser(e), p.userSockets.push(e) }, removeSocket: function(e) { s.remove(p.userSockets, function(t) { return t == e }) }, removeOnlineUser: function(e) { s.remove(p.userSockets, function(t) { return t.request.user._id == e.request.user._id }) } };
    e.exports = p }, function(e, t, n) { "use strict"; var r = n(138),
        o = new r(256, r.BASE62);
    e.exports = function() { return o.generate() } }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = n(8),
        s = n(11),
        a = n(19);
    e.exports = function() { var e = void 0; return r.info(), s.Promise = global.Promise, 1 !== s.connection.readyState ? (r.info("Connecting to Mongo " + o.db.uri + "..."), e = s.connect(o.db.uri, o.db.options, function(e) { return e ? (r.error("Could not connect to MongoDB!"), r.error(e)) : void s.set("debug", o.isDevMode()) }), s.connection.on("error", function(e) { return "ETIMEDOUT" === e.message.code ? (r.warn("Mongo connection timeout!", e), void setTimeout(function() { s.connect(o.db.uri, o.db.options) }, 1e3)) : (r.error("Could not connect to MongoDB!"), r.error(e)) }), a.initialize(e), s.connection.once("open", function() { r.info(i.yellow.bold("Mongo DB connected.")), r.info(), o.isTestMode() ? (r.warn("Drop test database..."), n(28)()) : o.isProduction || n(28)() })) : (r.info("Mongo already connected."), e = s), e } }, function(e, t) { e.exports = require("moment") }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = n(8),
        s = n(120),
        a = void 0;
    o.redis.enabled && (a = new s(o.redis.uri), a.on("connect", function(e) { r.info(i.green.bold("Redis client connected!")) }), a.on("error", function(e) { r.error(e) }), o.isDevMode() && a.monitor(function(e, t) { r.debug("Redis entering monitoring mode..."), t.on("monitor", function(e, t, n, o) { r.debug("REDIS: ", t) }) })), e.exports = a }, function(e, t) { e.exports = require("express") }, function(e, t) { e.exports = require("mongoose-auto-increment") }, function(e, t, n) { "use strict"; var r = n(114),
        o = n(0);
    e.exports = function(e, t) { return new r(e + o.hashSecret, t || 10) } }, function(e, t, n) { "use strict";

    function r(e, t, n, i, s, a) { a && a.stack ? Object.defineProperty(this, "stack", { value: a.stack, writable: !0, configurable: !0 }) : Error.captureStackTrace ? Error.captureStackTrace(this, r) : Object.defineProperty(this, "stack", { value: Error().stack, writable: !0, configurable: !0 }); var u = n; if (!u && t && t.length > 0) { var c = t[0];
            u = c && c.loc && c.loc.source } var l = i;!l && t && (l = t.filter(function(e) { return Boolean(e.loc) }).map(function(e) { return e.loc.start })), l && 0 === l.length && (l = void 0); var d = void 0,
            f = u;
        f && l && (d = l.map(function(e) { return (0, o.getLocation)(f, e) })), Object.defineProperties(this, { message: { value: e, enumerable: !0, writable: !0 }, locations: { value: d || void 0, enumerable: !0 }, path: { value: s || void 0, enumerable: !0 }, nodes: { value: t || void 0 }, source: { value: u || void 0 }, positions: { value: l || void 0 }, originalError: { value: a } }) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.GraphQLError = r; var o = n(31);
    r.prototype = Object.create(Error.prototype, { constructor: { value: r }, name: { value: "GraphQLError" } }) }, function(e, t) { e.exports = { name: "vue-express-mongo-boilerplate", version: "0.9.0", title: "Vue-Express-Mongo BoilerPlate", description: "Express NodeJS application server boilerplate with Mongo and VueJS", main: "server/index.js", scripts: { build: "webpack --progress --colors --config build/webpack.prod.config.js", "build:server": "webpack --progress --colors --config build/webpack.server.config.js", dev: "cross-env NODE_ENV=development nodemon --debug", start: "cross-env NODE_ENV=production node server/index.js", "start:bundle": "cross-env NODE_ENV=production node server/bundle.js", "start:cluster": "cross-env NODE_ENV=production node cluster.js", "test:unit": "cross-env NODE_ENV=test mocha --require babel-core/register --reporter spec tests/unit", "test:e2e:nightmare": "cross-env NODE_ENV=test mocha --require babel-core/register --timeout 30000 --reporter spec tests/e2e", "test:e2e": "node tests/e2e/runner.js", test: "npm run test:unit && npm run test:e2e", ci: 'cross-env NODE_ENV=test nodemon --exec "mocha --require babel-core/register --reporter dot --watch tests/unit" tests/unit', lint: "eslint --ext=.js,.vue client server", "lint:fix": "eslint --fix --ext=.js,.vue client server", "snyk-protect": "snyk protect", typings: "typings install" }, repository: { type: "git", url: "git@github.com:icebob/vue-express-mongo-boilerplate.git" }, keywords: ["boilerplate", "express", "mongo", "vue", "mongodb", "hackaton", "bootstrap", "starter"], config: { dbName: "boilerplate" }, author: "Icebob", license: "MIT", dependencies: { agenda: "0.9.0", async: "2.1.4", axios: "0.15.3", "bcrypt-nodejs": "0.0.3", "body-parser": "1.15.2", chalk: "1.1.3", "cli-table2": "0.2.0", clui: "0.3.1", compression: "1.6.2", "connect-mongo": "1.3.2", "cookie-parser": "1.4.3", "cross-env": "2.0.0", csurf: "1.9.0", express: "4.14.0", "express-flash": "0.0.2", "express-list-endpoints": "2.0.3", "express-session": "1.14.2", "express-status-monitor": "0.1.7", "express-validator": "2.21.0", fakerator: "0.3.0", glob: "7.1.1", graphql: "0.7.2", "graphql-server-express": "0.4.3", "graphql-subscriptions": "0.2.1", "graphql-tools": "0.8.1", hashids: "1.1.1", helmet: "2.1.2", "helmet-crossdomain": "0.1.0", i18next: "3.4.1", "i18next-express-middleware": "1.0.2", "i18next-node-fs-backend": "0.1.3", ioredis: "2.4.3", le_node: "1.7.0", lodash: "4.17.3", "method-override": "2.3.7", mkdirp: "0.5.1", moment: "2.17.1", mongoose: "4.7.5", "mongoose-auto-increment": "5.0.1", morgan: "1.7.0", netjet: "1.1.3", "node-sass": "3.13.0", nodemailer: "2.7.0", "nodemailer-html-to-text": "2.1.0", "nodemailer-mailgun-transport": "1.2.4", "nodemailer-sendgrid-transport": "0.2.0", "object-hash": "1.1.5", passport: "0.3.2", "passport-facebook": "2.1.1", "passport-github": "1.1.0", "passport-google-oauth": "1.0.0", "passport-local": "1.0.0", "passport-localapikey-update": "0.5.0", "passport-twitter": "1.0.4", "pretty-bytes": "4.0.2", pug: "2.0.0-beta6", "require-webpack-compat": "3.0.0", "serve-favicon": "2.3.2", slug: "0.9.1", snyk: "1.22.1", "socket.io": "1.7.2", "socket.io-client": "1.7.2", "uuid-token-generator": "0.5.0", winston: "2.3.0", "winston-daily-rotate-file": "1.4.0", "winston-graylog2": "0.5.2", "winston-logentries": "2.0.0", "winston-loggly-bulk": "1.3.4", "winston-logsene": "1.2.1", "winston-logzio": "1.0.3", "winston-papertrail": "1.0.4" }, devDependencies: { "apollo-client": "0.5.6", autoprefixer: "6.6.0", babel: "6.5.2", "babel-core": "6.21.0", "babel-loader": "6.2.10", "babel-plugin-transform-runtime": "6.15.0", "babel-preset-es2015": "6.18.0", "babel-preset-stage-0": "6.16.0", "babel-runtime": "6.20.0", chai: "3.5.0", chromedriver: "2.26.1", "cross-spawn": "4.0.0", "css-loader": "0.26.1", del: "2.2.2", "es6-promise": "4.0.5", eslint: "3.12.2", "eslint-friendly-formatter": "2.0.6", "eslint-loader": "1.6.1", "eslint-plugin-html": "1.7.0", "extract-text-webpack-plugin": "2.0.0-beta.4", "file-loader": "0.9.0", "graphql-tag": "0.1.17", "i18next-browser-languagedetector": "1.0.1", "i18next-xhr-backend": "1.2.1", jquery: "3.1.1", "json-loader": "0.5.4", marked: "0.3.6", mocha: "2.5.3", nightwatch: "0.9.11", "postcss-loader": "0.11.0", precss: "1.4.0", "raw-loader": "0.5.1", request: "2.79.0", "sass-loader": "3.2.1", "selenium-server": "2.53.1", sinon: "1.17.6", "sinon-chai": "2.8.0", "stats-webpack-plugin": "0.4.2", "style-loader": "0.13.1", "tiny-lr": "0.2.1", toastr: "2.1.2", typings: "2.1.0", "url-loader": "0.5.7", uuid: "2.0.3", vue: "2.1.8", "vue-form-generator": "2.0.0-beta1", "vue-html-loader": "1.2.3", "vue-loader": "10.0.2", "vue-router": "2.1.1", "vue-template-compiler": "2.1.8", "vue-websocket": "0.2.1", vuex: "2.1.1", webpack: "v2.2.0-rc.3", "webpack-dev-middleware": "1.9.0", "webpack-dev-server": "2.2.0-rc.0", "webpack-hot-middleware": "2.14.0", "webpack-merge": "2.0.0" }, snyk: !0 } }, function(e, t) { e.exports = require("crypto") }, function(e, t) { e.exports = require("webpack") }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = n(16),
        s = n(8),
        a = n(100),
        u = n(3),
        c = new a({ db: { address: o.db.uri, collection: "agendaJobs" }, processEvery: o.agendaTimer || "one minute" });
    c.on("fail", function(e, t) { return r.error("Job failed with error: " + e.message) }), c.define("removeUnverifiedAccounts", function(e, t) { r.debug("Running 'removeUnverifiedAccounts' process..."); try { u.remove({ createdAt: { $lte: i().subtract(1, "day").toDate() }, verified: !1 }, function(e, n) { n > 0 && r.warn(s.bold.red(n + " unverified and expired account removed!")), t() }) } catch (e) { return r.error("Job running exception!"), r.error(e), t(e) } }), c.on("ready", function() { o.isTestMode() || (c.every("8 hours", "removeUnverifiedAccounts"), c.start(), r.info(s.yellow("Agenda started!"))) }), e.exports = c }, function(e, t, n) { "use strict"; var r = (n(0), n(1), n(15), n(11)),
        o = r.Schema,
        i = n(20)("devices"),
        s = n(19),
        a = { timestamps: !0, toObject: { virtuals: !0 }, toJSON: { virtuals: !0 } },
        u = new o({ address: { type: String, trim: !0 }, type: { type: String, trim: !0 }, name: { type: String, trim: !0 }, description: { type: String, trim: !0, default: "" }, status: { type: Number, default: 1 }, lastCommunication: { type: Date, default: Date.now }, metadata: {} }, a);
    u.virtual("code").get(function() { return this.encodeID() }), u.plugin(s.plugin, { model: "Device", startAt: 1 }), u.methods.encodeID = function() { return i.encodeHex(this._id) }, u.methods.decodeID = function(e) { return i.decodeHex(e) }; var c = r.model("Device", u);
    e.exports = c }, function(e, t, n) { "use strict"; var r = (n(0), n(1), n(2), n(15), n(11)),
        o = r.Schema,
        i = n(20)("posts"),
        s = n(19),
        a = { timestamps: !0, toObject: { virtuals: !0 }, toJSON: { virtuals: !0 } },
        u = new o({ title: { type: String, trim: !0 }, content: { type: String, trim: !0 }, author: { type: Number, required: "Please fill in an author ID번들번들", ref: "User" }, views: { type: Number, default: 0 }, voters: [{ type: Number, ref: "User" }], votes: { type: Number, default: 0 }, editedAt: { type: Date }, metadata: {} }, a);
    u.virtual("code").get(function() { return this.encodeID() }), u.plugin(s.plugin, { model: "Post", startAt: 1 }), u.methods.encodeID = function() { return i.encodeHex(this._id) }, u.methods.decodeID = function(e) { return i.decodeHex(e) }; var c = r.model("Post", u);
    e.exports = c }, function(e, t, n) { "use strict"; var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        o = n(1),
        i = n(0),
        s = n(4),
        a = n(2),
        u = n(14),
        c = n(41)(),
        l = n(3);
    e.exports = function() { return l.find({}).exec().then(function(e) { if (0 === e.length) { var t = function() { o.warn("Load default Users to DB..."); var e = [],
                        t = new l({ fullName: "Administrator", email: "admin@boilerplate-app.com", username: "admin", password: "admin1234", provider: "local", roles: [s.ROLE_ADMIN, s.ROLE_USER], verified: !0 });
                    e.push(t.save()); var n = new l({ fullName: "Test User", email: "test@boilerplate-app.com", username: "test", password: "test1234", provider: "local", roles: [s.ROLE_USER], verified: !0, apiKey: u() }); return e.push(n.save()), { v: Promise.all(e).then(function() { if (!i.isProductionMode()) return Promise.all(a.times(10, function() { var t = c.entity.user(),
                                    n = new l({ fullName: t.firstName + " " + t.lastName, email: t.email, username: t.userName, password: t.password, provider: "local", roles: [s.ROLE_USER], verified: !0 });
                                e.push(n.save()) })) }).then(function() { o.warn("Default users created!") }) } }(); if ("object" === ("undefined" == typeof t ? "undefined" : r(t))) return t.v } }).catch(function(e) { o.error(e) }).then(function() { return n(57)() }).then(function() { o.debug("Seeding done!") }) } }, function(e, t, n) { "use strict"; var r = n(0),
        o = n(1),
        i = n(45),
        s = n(46).htmlToText;
    e.exports = { send: function(e, t, a, u) { o.info("Sending email to " + e + " with subject " + t + "..."), o.debug("Deprecated! libs/mailer is deprecated. Use Service.get('mailer') instead!"); var c = { from: r.mailer.from, to: e, subject: t, html: a },
                l = void 0; if ("smtp" == r.mailer.transport) l = i.createTransport(r.mailer.smtp);
            else if ("mailgun" == r.mailer.transport) { var d = n(47);
                l = i.createTransport(d({ auth: { api_key: r.mailer.mailgun.apiKey, domain: r.mailer.mailgun.domain } })) } else if ("sendgrid" == r.mailer.transport) { var f = n(48);
                l = i.createTransport(f({ auth: { api_key: r.mailer.sendgrid.apiKey } })) }
            l ? (l.use("compile", s()), l.sendMail(c, function(e, t) { e ? o.warn("Unable to send email: ", e) : o.info("Email message sent.", t.response), u && u(e, t) })) : o.warn("Unable to send email! Invalid mailer transport: " + r.mailer.transport) } } }, function(e, t, n) { "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }); var r = n(21);
    Object.defineProperty(t, "GraphQLError", { enumerable: !0, get: function() { return r.GraphQLError } }); var o = n(91);
    Object.defineProperty(t, "syntaxError", { enumerable: !0, get: function() { return o.syntaxError } }); var i = n(90);
    Object.defineProperty(t, "locatedError", { enumerable: !0, get: function() { return i.locatedError } }); var s = n(89);
    Object.defineProperty(t, "formatError", { enumerable: !0, get: function() { return s.formatError } }) }, function(e, t, n) {
    "use strict";

    function r(e) { if (e && e.__esModule) return e; var t = {}; if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]); return t.default = e, t }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.BREAK = t.visitWithTypeInfo = t.visitInParallel = t.visit = t.Source = t.print = t.parseType = t.parseValue = t.parse = t.TokenKind = t.createLexer = t.Kind = t.getLocation = void 0;
    var o = n(34);
    Object.defineProperty(t, "getLocation", {
        enumerable: !0,
        get: function() {
            return o.getLocation;
        }
    });
    var i = n(33);
    Object.defineProperty(t, "createLexer", { enumerable: !0, get: function() { return i.createLexer } }), Object.defineProperty(t, "TokenKind", { enumerable: !0, get: function() { return i.TokenKind } });
    var s = n(93);
    Object.defineProperty(t, "parse", { enumerable: !0, get: function() { return s.parse } }), Object.defineProperty(t, "parseValue", { enumerable: !0, get: function() { return s.parseValue } }), Object.defineProperty(t, "parseType", { enumerable: !0, get: function() { return s.parseType } });
    var a = n(94);
    Object.defineProperty(t, "print", { enumerable: !0, get: function() { return a.print } });
    var u = n(35);
    Object.defineProperty(t, "Source", { enumerable: !0, get: function() { return u.Source } });
    var c = n(36);
    Object.defineProperty(t, "visit", { enumerable: !0, get: function() { return c.visit } }), Object.defineProperty(t, "visitInParallel", { enumerable: !0, get: function() { return c.visitInParallel } }), Object.defineProperty(t, "visitWithTypeInfo", { enumerable: !0, get: function() { return c.visitWithTypeInfo } }), Object.defineProperty(t, "BREAK", { enumerable: !0, get: function() { return c.BREAK } });
    var l = n(32),
        d = r(l);
    t.Kind = d
}, function(e, t, n) { "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.NAME = "Name", t.DOCUMENT = "Document", t.OPERATION_DEFINITION = "OperationDefinition", t.VARIABLE_DEFINITION = "VariableDefinition", t.VARIABLE = "Variable", t.SELECTION_SET = "SelectionSet", t.FIELD = "Field", t.ARGUMENT = "Argument", t.FRAGMENT_SPREAD = "FragmentSpread", t.INLINE_FRAGMENT = "InlineFragment", t.FRAGMENT_DEFINITION = "FragmentDefinition", t.INT = "IntValue", t.FLOAT = "FloatValue", t.STRING = "StringValue", t.BOOLEAN = "BooleanValue", t.ENUM = "EnumValue", t.LIST = "ListValue", t.OBJECT = "ObjectValue", t.OBJECT_FIELD = "ObjectField", t.DIRECTIVE = "Directive", t.NAMED_TYPE = "NamedType", t.LIST_TYPE = "ListType", t.NON_NULL_TYPE = "NonNullType", t.SCHEMA_DEFINITION = "SchemaDefinition", t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition", t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition", t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition", t.FIELD_DEFINITION = "FieldDefinition", t.INPUT_VALUE_DEFINITION = "InputValueDefinition", t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition", t.UNION_TYPE_DEFINITION = "UnionTypeDefinition", t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition", t.ENUM_VALUE_DEFINITION = "EnumValueDefinition", t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition", t.TYPE_EXTENSION_DEFINITION = "TypeExtensionDefinition", t.DIRECTIVE_DEFINITION = "DirectiveDefinition" }, function(e, t, n) { "use strict";

    function r(e, t) { var n = new s(y, 0, 0, 0, 0, null),
            r = { source: e, options: t, lastToken: n, token: n, line: 1, lineStart: 0, advance: o }; return r }

    function o() { var e = this.lastToken = this.token; if (e.kind !== E) { do e = e.next = u(this, e); while (e.kind === C);
            this.token = e } return e }

    function i(e) { var t = e.value; return t ? e.kind + ' "' + t + '"' : e.kind }

    function s(e, t, n, r, o, i, s) { this.kind = e, this.start = t, this.end = n, this.line = r, this.column = o, this.value = s, this.prev = i, this.next = null }

    function a(e) { return isNaN(e) ? E : e < 127 ? JSON.stringify(String.fromCharCode(e)) : '"\\u' + ("00" + e.toString(16).toUpperCase()).slice(-4) + '"' }

    function u(e, t) { var n = e.source,
            r = n.body,
            o = r.length,
            i = c(r, t.end, e),
            u = e.line,
            f = 1 + i - e.lineStart; if (i >= o) return new s(E, o, o, u, f, t); var m = M.call(r, i); if (m < 32 && 9 !== m && 10 !== m && 13 !== m) throw (0, g.syntaxError)(n, i, "Invalid character " + a(m) + "."); switch (m) {
            case 33:
                return new s(b, i, i + 1, u, f, t);
            case 35:
                return l(n, i, u, f, t);
            case 36:
                return new s(k, i, i + 1, u, f, t);
            case 40:
                return new s(S, i, i + 1, u, f, t);
            case 41:
                return new s(T, i, i + 1, u, f, t);
            case 46:
                if (46 === M.call(r, i + 1) && 46 === M.call(r, i + 2)) return new s(w, i, i + 3, u, f, t); break;
            case 58:
                return new s(I, i, i + 1, u, f, t);
            case 61:
                return new s(O, i, i + 1, u, f, t);
            case 64:
                return new s(N, i, i + 1, u, f, t);
            case 91:
                return new s(x, i, i + 1, u, f, t);
            case 93:
                return new s(D, i, i + 1, u, f, t);
            case 123:
                return new s(P, i, i + 1, u, f, t);
            case 124:
                return new s(R, i, i + 1, u, f, t);
            case 125:
                return new s(_, i, i + 1, u, f, t);
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 95:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
                return h(n, i, u, f, t);
            case 45:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                return d(n, i, m, u, f, t);
            case 34:
                return p(n, i, u, f, t) } throw (0, g.syntaxError)(n, i, "Unexpected character " + a(m) + ".") }

    function c(e, t, n) { for (var r = e.length, o = t; o < r;) { var i = M.call(e, o); if (9 === i || 32 === i || 44 === i || 65279 === i) ++o;
            else if (10 === i) ++o, ++n.line, n.lineStart = o;
            else { if (13 !== i) break;
                10 === M.call(e, o + 1) ? o += 2 : ++o, ++n.line, n.lineStart = o } } return o }

    function l(e, t, n, r, o) { var i = e.body,
            a = void 0,
            u = t;
        do a = M.call(i, ++u); while (null !== a && (a > 31 || 9 === a)); return new s(C, t, u, n, r, o, U.call(i, t + 1, u)) }

    function d(e, t, n, r, o, i) { var u = e.body,
            c = n,
            l = t,
            d = !1; if (45 === c && (c = M.call(u, ++l)), 48 === c) { if (c = M.call(u, ++l), c >= 48 && c <= 57) throw (0, g.syntaxError)(e, l, "Invalid number, unexpected digit after 0: " + a(c) + ".") } else l = f(e, l, c), c = M.call(u, l); return 46 === c && (d = !0, c = M.call(u, ++l), l = f(e, l, c), c = M.call(u, l)), 69 !== c && 101 !== c || (d = !0, c = M.call(u, ++l), 43 !== c && 45 !== c || (c = M.call(u, ++l)), l = f(e, l, c)), new s(d ? q : L, t, l, r, o, i, U.call(u, t, l)) }

    function f(e, t, n) { var r = e.body,
            o = t,
            i = n; if (i >= 48 && i <= 57) { do i = M.call(r, ++o); while (i >= 48 && i <= 57); return o } throw (0, g.syntaxError)(e, o, "Invalid number, expected digit but got: " + a(i) + ".") }

    function p(e, t, n, r, o) { for (var i = e.body, u = t + 1, c = u, l = 0, d = ""; u < i.length && null !== (l = M.call(i, u)) && 10 !== l && 13 !== l && 34 !== l;) { if (l < 32 && 9 !== l) throw (0, g.syntaxError)(e, u, "Invalid character within String: " + a(l) + "."); if (++u, 92 === l) { switch (d += U.call(i, c, u - 1), l = M.call(i, u)) {
                    case 34:
                        d += '"'; break;
                    case 47:
                        d += "/"; break;
                    case 92:
                        d += "\\"; break;
                    case 98:
                        d += "\b"; break;
                    case 102:
                        d += "\f"; break;
                    case 110:
                        d += "\n"; break;
                    case 114:
                        d += "\r"; break;
                    case 116:
                        d += "\t"; break;
                    case 117:
                        var f = m(M.call(i, u + 1), M.call(i, u + 2), M.call(i, u + 3), M.call(i, u + 4)); if (f < 0) throw (0, g.syntaxError)(e, u, "Invalid character escape sequence: " + ("\\u" + i.slice(u + 1, u + 5) + "."));
                        d += String.fromCharCode(f), u += 4; break;
                    default:
                        throw (0, g.syntaxError)(e, u, "Invalid character escape sequence: \\" + String.fromCharCode(l) + ".") }++u, c = u } } if (34 !== l) throw (0, g.syntaxError)(e, u, "Unterminated string."); return d += U.call(i, c, u), new s(j, t, u + 1, n, r, o, d) }

    function m(e, t, n, r) { return v(e) << 12 | v(t) << 8 | v(n) << 4 | v(r) }

    function v(e) { return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : -1 }

    function h(e, t, n, r, o) { for (var i = e.body, a = i.length, u = t + 1, c = 0; u !== a && null !== (c = M.call(i, u)) && (95 === c || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122);) ++u; return new s(A, t, u, n, r, o, U.call(i, t, u)) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.TokenKind = void 0, t.createLexer = r, t.getTokenDesc = i; var g = n(30),
        y = "<SOF>",
        E = "<EOF>",
        b = "!",
        k = "$",
        S = "(",
        T = ")",
        w = "...",
        I = ":",
        O = "=",
        N = "@",
        x = "[",
        D = "]",
        P = "{",
        R = "|",
        _ = "}",
        A = "Name",
        L = "Int",
        q = "Float",
        j = "String",
        C = "Comment",
        M = (t.TokenKind = { SOF: y, EOF: E, BANG: b, DOLLAR: k, PAREN_L: S, PAREN_R: T, SPREAD: w, COLON: I, EQUALS: O, AT: N, BRACKET_L: x, BRACKET_R: D, BRACE_L: P, PIPE: R, BRACE_R: _, NAME: A, INT: L, FLOAT: q, STRING: j, COMMENT: C }, String.prototype.charCodeAt),
        U = String.prototype.slice;
    s.prototype.toJSON = s.prototype.inspect = function() { return { kind: this.kind, value: this.value, line: this.line, column: this.column } } }, function(e, t, n) { "use strict";

    function r(e, t) { for (var n = /\r\n|[\n\r]/g, r = 1, o = t + 1, i = void 0;
            (i = n.exec(e.body)) && i.index < t;) r += 1, o = t + 1 - (i.index + i[0].length); return { line: r, column: o } }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.getLocation = r }, function(e, t, n) { "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") }
    Object.defineProperty(t, "__esModule", { value: !0 });
    t.Source = function e(t, n) { r(this, e), this.body = t, this.name = n || "GraphQL" } }, function(e, t, n) { "use strict";

    function r(e, t, n) { var r = n || u,
            i = void 0,
            s = Array.isArray(e),
            l = [e],
            d = -1,
            f = [],
            p = void 0,
            m = [],
            v = [],
            h = e;
        do { d++; var g = d === l.length,
                y = void 0,
                E = void 0,
                b = g && 0 !== f.length; if (g) { if (y = 0 === v.length ? void 0 : m.pop(), E = p, p = v.pop(), b) { if (s) E = E.slice();
                    else { var k = {}; for (var S in E) E.hasOwnProperty(S) && (k[S] = E[S]);
                        E = k } for (var T = 0, w = 0; w < f.length; w++) { var I = f[w][0],
                            O = f[w][1];
                        s && (I -= T), s && null === O ? (E.splice(I, 1), T++) : E[I] = O } }
                d = i.index, l = i.keys, f = i.edits, s = i.inArray, i = i.prev } else { if (y = p ? s ? d : l[d] : void 0, E = p ? p[y] : h, null === E || void 0 === E) continue;
                p && m.push(y) } var N = void 0; if (!Array.isArray(E)) { if (!o(E)) throw new Error("Invalid AST Node: " + JSON.stringify(E)); var x = a(t, E.kind, g); if (x) { if (N = x.call(t, E, y, p, m, v), N === c) break; if (N === !1) { if (!g) { m.pop(); continue } } else if (void 0 !== N && (f.push([y, N]), !g)) { if (!o(N)) { m.pop(); continue }
                        E = N } } }
            void 0 === N && b && f.push([y, E]), g || (i = { inArray: s, index: d, keys: l, edits: f, prev: i }, s = Array.isArray(E), l = s ? E : r[E.kind] || [], d = -1, f = [], p && v.push(p), p = E) } while (void 0 !== i); return 0 !== f.length && (h = f[f.length - 1][1]), h }

    function o(e) { return e && "string" == typeof e.kind }

    function i(e) { var t = new Array(e.length); return { enter: function(n) { for (var r = 0; r < e.length; r++)
                    if (!t[r]) { var o = a(e[r], n.kind, !1); if (o) { var i = o.apply(e[r], arguments); if (i === !1) t[r] = n;
                            else if (i === c) t[r] = c;
                            else if (void 0 !== i) return i } } }, leave: function(n) { for (var r = 0; r < e.length; r++)
                    if (t[r]) t[r] === n && (t[r] = null);
                    else { var o = a(e[r], n.kind, !0); if (o) { var i = o.apply(e[r], arguments); if (i === c) t[r] = c;
                            else if (void 0 !== i && i !== !1) return i } } } } }

    function s(e, t) { return { enter: function(n) { e.enter(n); var r = a(t, n.kind, !1); if (r) { var i = r.apply(t, arguments); return void 0 !== i && (e.leave(n), o(i) && e.enter(i)), i } }, leave: function(n) { var r = a(t, n.kind, !0),
                    o = void 0; return r && (o = r.apply(t, arguments)), e.leave(n), o } } }

    function a(e, t, n) { var r = e[t]; if (r) { if (!n && "function" == typeof r) return r; var o = n ? r.leave : r.enter; if ("function" == typeof o) return o } else { var i = n ? e.leave : e.enter; if (i) { if ("function" == typeof i) return i; var s = i[t]; if ("function" == typeof s) return s } } }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.visit = r, t.visitInParallel = i, t.visitWithTypeInfo = s; var u = t.QueryDocumentKeys = { Name: [], Document: ["definitions"], OperationDefinition: ["name", "variableDefinitions", "directives", "selectionSet"], VariableDefinition: ["variable", "type", "defaultValue"], Variable: ["name"], SelectionSet: ["selections"], Field: ["alias", "name", "arguments", "directives", "selectionSet"], Argument: ["name", "value"], FragmentSpread: ["name", "directives"], InlineFragment: ["typeCondition", "directives", "selectionSet"], FragmentDefinition: ["name", "typeCondition", "directives", "selectionSet"], IntValue: [], FloatValue: [], StringValue: [], BooleanValue: [], EnumValue: [], ListValue: ["values"], ObjectValue: ["fields"], ObjectField: ["name", "value"], Directive: ["name", "arguments"], NamedType: ["name"], ListType: ["type"], NonNullType: ["type"], SchemaDefinition: ["directives", "operationTypes"], OperationTypeDefinition: ["type"], ScalarTypeDefinition: ["name", "directives"], ObjectTypeDefinition: ["name", "interfaces", "directives", "fields"], FieldDefinition: ["name", "arguments", "type", "directives"], InputValueDefinition: ["name", "type", "defaultValue", "directives"], InterfaceTypeDefinition: ["name", "directives", "fields"], UnionTypeDefinition: ["name", "directives", "types"], EnumTypeDefinition: ["name", "directives", "values"], EnumValueDefinition: ["name", "directives"], InputObjectTypeDefinition: ["name", "directives", "fields"], TypeExtensionDefinition: ["definition"], DirectiveDefinition: ["name", "arguments", "locations"] },
        c = t.BREAK = {} }, function(e, t) { e.exports = require("async") }, function(e, t) { e.exports = require("connect-mongo") }, function(e, t) { e.exports = require("cookie-parser") }, function(e, t) { e.exports = require("express-session") }, function(e, t) { e.exports = require("fakerator") }, function(e, t) { e.exports = require("graphql-server-express") }, function(e, t) { e.exports = require("http") }, function(e, t) { e.exports = require("mkdirp") }, function(e, t) { e.exports = require("nodemailer") }, function(e, t) { e.exports = require("nodemailer-html-to-text") }, function(e, t) { e.exports = require("nodemailer-mailgun-transport") }, function(e, t) { e.exports = require("nodemailer-sendgrid-transport") }, function(e, t) { e.exports = require("object-hash") }, function(e, t, n) { "use strict";

    function r(e) { e.locals.app = f.app, e.use(function(e, t, n) { return t.locals.url = e.protocol + "://" + e.headers.host + e.url, n() }), e.locals.year = v().format("YYYY"), e.locals.features = f.features }

    function o(e) { if (e.use(w({ filter: function(e, t) { return /json|text|javascript|css/.test(t.getHeader("Content-Type")) }, level: 3, threshold: 512 })), e.set("port", f.port), e.use(E.urlencoded({ extended: !0, limit: 2 * f.contentMaxLength })), e.use(k()), e.use(E.json()), e.use(I()), f.isProductionMode() && (e.use(S({ cache: { max: 100 } })), e.use(p.static(m.join(_, "public")))), e.use(g(m.join(_, "public", "favicon.ico"))), e.use(b()), e.set("etag", !0), e.use(h()), f.isDevMode()) { var t = n(136),
                r = new t.Stream;
            r.writable = !0, r.write = function(e) { return d.debug(e) }, e.use(y("dev", { stream: r })) } }

    function i(e) { var t = { fallbackLng: "en", whitelist: ["en", "hu"], ns: ["app", "frontend"], defaultNS: "frontend", load: "all", saveMissing: !0, saveMissingTo: "all", backend: { loadPath: m.join(_, "locales", "{{lng}}", "{{ns}}.json"), addPath: m.join(_, "locales", "{{lng}}", "{{ns}}.missing.json"), jsonIndent: 4 } };
        f.isTestMode() && (t.whitelist = ["en"]), D.use(R).use(P.LanguageDetector).init(t, function(t, n) { e.t = n, t && d.warn(t) }), D.on("failedLoading", function(e, t, n) { console.log("failedLoading", e, t, n) }), e.use(P.handle(D)), e.get("/locales/resources.json", P.getResourcesHandler(D)), e.post("/locales/add/:lng/:ns", P.missingKeyHandler(D)) }

    function s(e) { e.set("views", m.join(_, "views")), e.set("view engine", "pug"), f.isDevMode() ? (e.set("showStackError", !0), e.set("view cache", !1), e.use(O.noCache()), e.locals.pretty = !0) : (e.locals.cache = "memory", e.set("view cache", !0)) }

    function a(e, t) { e.use(T({ saveUninitialized: !0, resave: !1, secret: f.sessionSecret, store: new x({ mongooseConnection: t.connection, collection: f.sessions.collection, autoReconnect: !0 }), cookie: f.sessions.cookie, name: f.sessions.name })) }

    function u(e) { e.use(O.xssFilter()), e.use(O.noSniff()), e.use(O.ieNoOpen()), e.use(N()), e.use(O.hidePoweredBy()) }

    function c(e) { n(70)(e), !f.isTestMode() }

    function l(e) { if (!f.isProductionMode()) { var t = n(24),
                r = n(56),
                o = t(r),
                i = n(139);
            e.use(i(o, { noInfo: !0, publicPath: r.output.publicPath, headers: { "Access-Control-Allow-Origin": "*" }, stats: { colors: !0 } })); var s = n(140);
            e.use(s(o, { log: d.info })) } } var d = n(1),
        f = n(0),
        p = (n(17), n(18)),
        m = (n(43), n(6)),
        v = n(16),
        h = n(109),
        g = n(134),
        y = n(123),
        E = n(103),
        b = n(39),
        k = n(111),
        S = (n(107), n(124)),
        T = n(40),
        w = n(106),
        I = n(122),
        O = n(115),
        N = n(116),
        x = (n(11), n(38)(T)),
        D = n(117),
        P = n(118),
        R = n(119),
        _ = m.normalize(m.join(f.rootPath, "server"));
    e.exports = function(e) { var t = p();
        r(t), o(t), s(t), u(t), i(t), a(t, e), c(t), l(t); var d = n(7);
        d.loadServices(t, e); var f = n(13).init(t, e); return f._app = t, n(87)(t, e), f } }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = n(10),
        s = n(44);
    i.existsSync(o.dataFolder) || s.sync(o.dataFolder), o.isProductionMode() || (r.info("Loaded configuration:"), r.info(o), r.info()) }, function(e, t, n) { "use strict"; var r = (n(0), n(1)),
        o = n(8),
        i = n(16),
        s = n(11),
        a = n(25),
        u = function() { return 0 === s.connection.readyState ? process.exit(0) : void s.connection.close(function() { return a.stop(function() { return r.info(), r.info(o.bold("---------------------[ Server stopped at %s Uptime: %s ]---------------------------"), i().format("YYYY-MM-DD HH:mm:ss.SSS"), i.duration(1e3 * process.uptime()).humanize()), process.exit(0) }) }) };
    process.on("SIGINT", u).on("SIGTERM", u) }, function(e, t, n) { "use strict"; var r = n(125),
        o = n(105),
        i = n(133),
        s = n(1);
    e.exports = function() { var e = o.Gauge,
            t = r.totalmem(),
            n = r.freemem(),
            a = t - n,
            u = i(n);
        s.info("CPU:\t\tArch: " + r.arch() + ", Cores: " + r.cpus().length), s.info("Memory:\t\t" + e(a, t, 20, .8 * t, u + " free")), s.info("OS:\t\t" + r.platform() + " (" + r.type() + ")") } }, function(e, t, n) { "use strict";
    e.exports = { postcss: { plugins: [n(101)({ browsers: ["last 3 versions"] }), n(132)] } } }, function(e, t, n) { "use strict";
    (function(t) { var r = n(6);
        n(24);
        e.exports = { devtool: "#inline-source-map", entry: { app: ["./client/app/main.js"], vendor: ["es6-promise", "vue", "vue-router", "vuex", "lodash", "moment", "jquery", "axios", "toastr", "vue-form-generator", "vue-websocket", "apollo-client", "graphql-tag", "i18next"], frontend: ["./client/frontend/main.js"] }, output: { path: r.resolve(t, "..", "server", "public", "app"), publicPath: "/app/", filename: "[name].js", chunkFilename: "[chunkhash].js" }, module: { noParse: /es6-promise\.js$/, rules: [{ test: /\.css$/, loaders: ["style-loader", "css-loader"] }, { test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/, /vendor/] }, { test: /\.gif$/, loader: "url-loader", options: { name: "images/[name]-[hash:6].[ext]", limit: 1e4 } }, { test: /\.png$/, loader: "url-loader", options: { name: "images/[name]-[hash:6].[ext]", limit: 1e4 } }, { test: /\.jpg$/, loader: "file-loader", options: { name: "images/[name]-[hash:6].[ext]" } }, { test: /\.(woff2?|svg)$/, loader: "url-loader", options: { limit: 1e4, prefix: "font/" } }, { test: /\.(ttf|eot)$/, loader: "file-loader", options: { prefix: "font/" } }] }, resolve: { extensions: [".vue", ".js", ".json"], mainFiles: ["index"], alias: { images: r.resolve(t, "..", "client", "images"), vue$: "vue/dist/vue.common.js" } }, performance: { hints: !1 }, plugins: [] } }).call(t, "build") }, function(e, t, n) { "use strict"; var r = (n(6), n(24)),
        o = n(54),
        i = n(141),
        s = n(55);
    s.entry.app.unshift("webpack-hot-middleware/client"), s.entry.frontend.unshift("webpack-hot-middleware/client"), e.exports = i(s, { devtool: "#inline-source-map", module: { rules: [{ test: /\.scss$/, loaders: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] }, { test: /\.vue$/, loader: "vue-loader", options: { postcss: o.postcss.plugins } }] }, performance: { hints: !1 }, plugins: [new r.HotModuleReplacementPlugin, new r.NoErrorsPlugin] }) }, function(e, t, n) { "use strict"; var r = n(1),
        o = (n(0), n(2)),
        i = (n(14), n(41)()),
        s = n(3),
        a = n(26),
        u = n(27);
    e.exports = function() { var e = a.find({}).exec().then(function(e) { 0 === e.length && (r.warn("Load default Devices to DB..."), o.times(36, function() { var e = new a({ address: i.internet.ip(), type: i.random.arrayElement(["rasperry", "odroid", "nanopi", "pc"]), name: i.populate("#{names.firstName}'s device"), description: i.lorem.sentence(), status: i.random.boolean("80") ? 1 : 0, lastCommunication: Date.now() }); return e.save().then(function() { r.info("Default devices created!") }) })) }),
            t = u.find({}).exec(function(e, t) { 0 === t.length && (r.warn("Load default Posts to DB..."), s.find({}).lean().select("_id").exec(function(e, t) { t && t.length > 0 && o.times(60, function() { var e = i.entity.post(i.random.number(2, 1)),
                            n = new u({ title: e.title, content: e.content, author: i.random.arrayElement(t)._id }); return n.save().then(function() { r.info("Default posts created!") }) }) })) }); return Promise.all([e, t]) } }, function(e, t, n) { "use strict";
    e.exports = { counter: 0 } }, function(e, t, n) { "use strict"; var r = n(1),
        o = (n(0), n(4)),
        i = n(58);
    e.exports = { settings: { name: "counter", version: 1, namespace: "counter", rest: !0, ws: !0, permission: o.PERM_LOGGEDIN }, actions: { find: { cache: !0, handler: function(e) { return Promise.resolve(i.counter) } }, create: function(e) { if (e.params.value) return this.changeCounter(e, parseInt(e.params.value)); throw new Error("Missing value from request!") }, reset: { permission: o.PERM_ADMIN, handler: function(e) { return this.changeCounter(e, 0) } }, increment: function(e) { return this.changeCounter(e, i.counter + 1) }, decrement: function(e) { return this.changeCounter(e, i.counter - 1) } }, methods: { changeCounter: function(e, t) { return i.counter = t, r.info(e.user.username + " changed the counter to ", i.counter), this.notifyModelChanges(e, "changed", i.counter), Promise.resolve(i.counter) } }, init: function(e) {}, socket: { afterConnection: function(e, t) { e.emit("/counter/changed", i.counter) } }, graphql: { query: "\n\t\t\tcounter: Int\n\t\t", types: "", mutation: "\n\t\t\tcounterCreate(value: Int!): Int\n\t\t\tcounterReset: Int\n\t\t\tcounterIncrement: Int\n\t\t\tcounterDecrement: Int\n\t\t", resolvers: { Query: { counter: "find" }, Mutation: { counterCreate: "create", counterReset: "reset", counterIncrement: "increment", counterDecrement: "decrement" } } } } }, function(e, t, n) { "use strict"; var r = (n(1), n(0), n(4)),
        o = (n(2), n(26));
    e.exports = { settings: { name: "devices", version: 1, namespace: "devices", rest: !0, ws: !0, graphql: !0, permission: r.PERM_LOGGEDIN, role: "user", collection: o, modelPropFilter: "code type address name description status lastCommunication createdAt updatedAt" }, actions: { find: { cache: !0, handler: function(e) { var t = this,
                        n = {},
                        r = o.find(n); return e.queryPageSort(r).exec().then(function(e) { return t.toJSON(e) }) } }, get: { cache: !0, handler: function(e) { return e.assertModelIsExist(e.t("app:DeviceNotFound")), Promise.resolve(e.model) } }, create: function(e) { var t = this;
                this.validateParams(e, !0); var n = new o({ address: e.params.address, type: e.params.type, name: e.params.name, description: e.params.description, status: e.params.status }); return n.save().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "created", n), n }) }, update: function(e) { var t = this; return e.assertModelIsExist(e.t("app:DeviceNotFound")), this.validateParams(e), this.collection.findById(e.modelID).exec().then(function(t) { return null != e.params.address && (t.address = e.params.address), null != e.params.type && (t.type = e.params.type), null != e.params.name && (t.name = e.params.name), null != e.params.description && (t.description = e.params.description), null != e.params.status && (t.status = e.params.status), t.save() }).then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "updated", n), n }) }, remove: function(e) { var t = this; return e.assertModelIsExist(e.t("app:DeviceNotFound")), o.remove({ _id: e.modelID }).then(function() { return e.model }).then(function(n) { return t.notifyModelChanges(e, "removed", n), n }) } }, methods: { validateParams: function(e, t) { if ((t || e.hasParam("name")) && e.validateParam("name").trim().notEmpty(e.t("app:DeviceNameCannotBeBlank")).end(), (t || e.hasParam("status")) && e.validateParam("status").isNumber(), e.validateParam("description").trim().end(), e.validateParam("address").trim().end(), e.validateParam("type").trim().end(), e.hasValidationErrors()) throw e.errorBadRequest(r.ERR_VALIDATION_ERROR, e.validationErrors) } }, init: function(e) {}, socket: { afterConnection: function(e, t) {} }, graphql: { query: "\n\t\t\tdevices(limit: Int, offset: Int, sort: String): [Device]\n\t\t\tdevice(code: String): Device\n\t\t", types: "\n\t\t\ttype Device {\n\t\t\t\tcode: String!\n\t\t\t\taddress: String\n\t\t\t\ttype: String\n\t\t\t\tname: String\n\t\t\t\tdescription: String\n\t\t\t\tstatus: Int\n\t\t\t\tlastCommunication: Timestamp\n\t\t\t}\n\t\t", mutation: "\n\t\t\tdeviceCreate(name: String!, address: String, type: String, description: String, status: Int): Device\n\t\t\tdeviceUpdate(code: String!, name: String, address: String, type: String, description: String, status: Int): Device\n\t\t\tdeviceRemove(code: String!): Device\n\t\t", resolvers: { Query: { devices: "find", device: "get" }, Mutation: { deviceCreate: "create", deviceUpdate: "update", deviceRemove: "remove" } } } } }, function(e, t, n) { "use strict";
    e.exports = n(3) }, function(e, t, n) { "use strict"; var r = (n(1), n(0), n(13), n(4)),
        o = (n(2), n(61));
    e.exports = { settings: { name: "persons", version: 1, namespace: "persons", rest: !0, ws: !0, graphql: !0, permission: r.PERM_LOGGEDIN, role: "user", collection: o, modelPropFilter: "code username fullName avatar lastLogin roles" }, actions: { get: { cache: !0, handler: function(e) { return e.assertModelIsExist(e.t("app:UserNotFound")), Promise.resolve(e.model) } } }, methods: {}, graphql: { query: "\n\t\t\t# users(limit: Int, offset: Int, sort: String): [Person]\n\t\t\tperson(code: String): Person\n\t\t", types: "\n\t\t\ttype Person {\n\t\t\t\tcode: String!\n\t\t\t\tfullName: String\n\t\t\t\tusername: String\n\t\t\t\troles: [String]\n\t\t\t\tavatar: String\n\t\t\t\tlastLogin: Timestamp\n\n\t\t\t\tposts(limit: Int, offset: Int, sort: String): [Post]\n\t\t\t}\n\t\t", mutation: "\n\t\t", resolvers: { Query: { person: "get" }, Person: { posts: function(e, t, n) { var r = n.ctx,
                            o = r.services("posts"); if (o) return o.actions.find(r.copy(Object.assign(t, { author: e.code }))) } } } } } }, function(e, t, n) { "use strict"; var r = (n(1), n(0), n(4)),
        o = (n(2), n(27));
    e.exports = { settings: { name: "posts", version: 1, namespace: "posts", rest: !0, ws: !0, graphql: !0, permission: r.PERM_LOGGEDIN, role: "user", collection: o, modelPropFilter: "code title content author votes voters views createdAt editedAt", modelPopulates: { author: "persons", voters: "persons" } }, actions: { find: { cache: !0, handler: function(e) { var t = this,
                        n = {}; "my" == e.params.filter ? n.author = e.user.id : null != e.params.author && (n.author = this.personService.decodeID(e.params.author)); var r = o.find(n); return e.queryPageSort(r).exec().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }) } }, get: { cache: !0, permission: r.PERM_PUBLIC, handler: function(e) { var t = this; return e.assertModelIsExist(e.t("app:PostNotFound")), o.findByIdAndUpdate(e.modelID, { $inc: { views: 1 } }).exec().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }) } }, create: { handler: function(e) { var t = this;
                    this.validateParams(e, !0); var n = new o({ title: e.params.title, content: e.params.content, author: e.user.id }); return n.save().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "created", n), n }) } }, update: { permission: r.PERM_OWNER, handler: function(e) { var t = this; return e.assertModelIsExist(e.t("app:PostNotFound")), this.validateParams(e), this.collection.findById(e.modelID).exec().then(function(t) { return null != e.params.title && (t.title = e.params.title), null != e.params.content && (t.content = e.params.content), t.editedAt = Date.now(), t.save() }).then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "updated", n), n }) } }, remove: { permission: r.PERM_OWNER, handler: function(e) { var t = this; return e.assertModelIsExist(e.t("app:PostNotFound")), o.remove({ _id: e.modelID }).then(function() { return e.model }).then(function(n) { return t.notifyModelChanges(e, "removed", n), n }) } }, vote: function(e) { var t = this; return e.assertModelIsExist(e.t("app:PostNotFound")), this.collection.findById(e.modelID).exec().then(function(t) { if (t.voters.indexOf(e.user.id) !== -1) throw e.errorBadRequest(r.ERR_ALREADY_VOTED, e.t("app:YouHaveAlreadyVotedThisPost")); return t }).then(function(t) { return o.findByIdAndUpdate(t.id, { $addToSet: { voters: e.user.id }, $inc: { votes: 1 } }, { new: !0 }) }).then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "voted", n), n }) }, unvote: function(e) { var t = this; return e.assertModelIsExist(e.t("app:PostNotFound")), this.collection.findById(e.modelID).exec().then(function(t) { if (t.voters.indexOf(e.user.id) == -1) throw e.errorBadRequest(r.ERR_NOT_VOTED_YET, e.t("app:YouHaveNotVotedThisPostYet")); return t }).then(function(t) { return o.findByIdAndUpdate(t.id, { $pull: { voters: e.user.id }, $inc: { votes: -1 } }, { new: !0 }) }).then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(n) { return t.notifyModelChanges(e, "unvoted", n), n }) } }, methods: { validateParams: function(e, t) { if ((t || e.hasParam("title")) && e.validateParam("title").trim().notEmpty(e.t("app:PostTitleCannotBeEmpty")).end(), (t || e.hasParam("content")) && e.validateParam("content").trim().notEmpty(e.t("app:PostContentCannotBeEmpty")).end(), e.hasValidationErrors()) throw e.errorBadRequest(r.ERR_VALIDATION_ERROR, e.validationErrors) } }, ownerChecker: function(e) { return new Promise(function(t, n) { e.assertModelIsExist(e.t("app:PostNotFound")), e.model.author.code == e.user.code || e.isAdmin() ? t() : n() }) }, init: function(e) { this.personService = e.services("persons"), r.append(["ALREADY_VOTED", "NOT_VOTED_YET"], "ERR") }, socket: { afterConnection: function(e, t) {} }, graphql: { query: "\n\t\t\tposts(limit: Int, offset: Int, sort: String): [Post]\n\t\t\tpost(code: String): Post\n\t\t", types: "\n\t\t\ttype Post {\n\t\t\t\tcode: String!\n\t\t\t\ttitle: String\n\t\t\t\tcontent: String\n\t\t\t\tauthor: Person!\n\t\t\t\tviews: Int\n\t\t\t\tvotes: Int,\n\t\t\t\tvoters(limit: Int, offset: Int, sort: String): [Person]\n\t\t\t\tcreatedAt: Timestamp\n\t\t\t\tcreatedAt: Timestamp\n\t\t\t}\n\t\t", mutation: "\n\t\t\tpostCreate(title: String!, content: String!): Post\n\t\t\tpostUpdate(code: String!, title: String, content: String): Post\n\t\t\tpostRemove(code: String!): Post\n\n\t\t\tpostVote(code: String!): Post\n\t\t\tpostUnvote(code: String!): Post\n\t\t", resolvers: { Query: { posts: "find", post: "get" }, Mutation: { postCreate: "create", postUpdate: "update", postRemove: "remove", postVote: "vote", postUnvote: "unvote" } } } } }, function(e, t, n) { "use strict";
    e.exports = n(3) }, function(e, t, n) { "use strict"; var r = (n(1), n(0), n(4)),
        o = (n(2), n(64));
    e.exports = { settings: { name: "profile", version: 1, namespace: "profile", rest: !0, ws: !0, graphql: !0, permission: r.PERM_LOGGEDIN, role: "user", collection: o, modelPropFilter: "code username fullName email avatar passwordLess provider profile socialLinks roles apiKey lastLogin locale status createdAt updatedAt" }, actions: { get: { cache: !1, handler: function(e) { var t = this; return o.findById(o.schema.methods.decodeID(e.user.code)).exec().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }) } } }, methods: {}, graphql: { query: "\n\t\t\tprofile: Profile\n\t\t", types: "\n\t\t\ttype Profile {\n\t\t\t\tcode: String!\n\t\t\t\tfullName: String\n\t\t\t\temail: String\n\t\t\t\tusername: String\n\t\t\t\tpasswordLess: Boolean\n\t\t\t\tprovider: String\n\t\t\t\tprofile: SocialProfile\n\t\t\t\tsocialLinks: SocialLinks\n\t\t\t\troles: [String]\n\t\t\t\tverified: Boolean\n\t\t\t\tapiKey: String\n\t\t\t\tlocale: String\n\t\t\t\tavatar: String\n\t\t\t\tcreatedAt: Timestamp\n\t\t\t\tupdatedAt: Timestamp\n\t\t\t\tlastLogin: Timestamp\n\t\t\t\tstatus: Boolean\n\t\t\t}\n\n\t\t\ttype SocialProfile {\n\t\t\t\tname: String\n\t\t\t\tgender: String\n\t\t\t\tpicture: String\n\t\t\t\tlocation: String\n\t\t\t}\n\n\t\t\ttype SocialLinks {\n\t\t\t\tfacebook: String\n\t\t\t\ttwitter: String\n\t\t\t\tgoogle: String\n\t\t\t\tgithub: String\n\t\t\t}\n\t\t", mutation: "\n\t\t", resolvers: { Query: { profile: "get" } } } } }, function(e, t, n) { "use strict"; var r = (n(1), n(0), n(4)),
        o = n(2),
        i = n(13),
        s = void 0;
    e.exports = { settings: { name: "session", version: 1, namespace: "session", rest: !0, ws: !0, graphql: !0, permission: r.PERM_LOGGEDIN, role: "user" }, actions: { me: function(e) { return Promise.resolve(e.user).then(function(e) { return s.toJSON(e) }) }, onlineUsers: function(e) { return Promise.resolve().then(function() { return s.toJSON(o.map(i.userSockets, function(e) { return e.request.user })) }) } }, init: function(e) { s = this.services("persons") }, graphql: { query: "\n\t\t\tme: Person\n\t\t\tonlineUsers: [Person]\n\t\t", mutation: "\n\t\t", resolvers: { Query: { me: "me", onlineUsers: "onlineUsers" } } } } }, function(e, t, n) { "use strict"; var r = n(6),
        o = n(22);
    e.exports = { app: { title: o.title, version: o.version, description: o.description, keywords: o.keywords.join(","), url: "http://localhost:" + (process.env.PORT || 3e3) + "/", contactEmail: "hello@vem-app.com" }, ip: process.env.NODE_IP || "0.0.0.0", port: process.env.PORT || 3e3, rootPath: global.rootPath, dataFolder: r.join(global.rootPath, "data"), uploadLimit: 2097152, sessions: { cookie: { maxAge: 6048e5, httpOnly: !0, secure: !1 }, name: "sessionId", collection: "sessions" }, test: !1, db: { uri: process.env.MONGO_URI || "mongodb://localhost/" + o.config.dbName + "-dev", options: { user: "", pass: "", server: { socketOptions: { keepAlive: 1 } } } }, redis: { enabled: !1, uri: process.env.REDIS_URI || "redis://localhost:6379", options: null }, cacheTimeout: 300, mailer: { from: "noreply@vem-app.com" }, features: { disableSignUp: !1, verificationRequired: !0 }, authKeys: { google: { clientID: null, clientSecret: null }, facebook: { clientID: null, clientSecret: null }, github: { clientID: null, clientSecret: null }, twitter: { clientID: null, clientSecret: null } }, logging: { console: { level: "debug" }, file: { enabled: !1, path: r.join(global.rootPath, "logs"), level: "info", json: !1, exceptionFile: !0 }, graylog: { enabled: !1 }, papertrail: { enabled: !1, host: null, port: null, level: "debug", program: "vem" }, logentries: { enabled: !1, token: null }, loggly: { enabled: !1, token: null, subdomain: null }, logsene: { enabled: !1, token: null }, logzio: { enabled: !1, token: null } }, agendaTimer: "one minute" } }, function(e, t, n) { "use strict"; var r = n(22);
    e.exports = { app: {}, db: { uri: process.env.MONGO_URI || "mongodb://localhost/" + r.config.dbName, options: { user: process.env.MONGO_USERNAME || "", pass: process.env.MONGO_PASSWORD || "" } } } }, function(e, t, n) {
    "use strict";
    var r = n(22);
    e.exports = {
        app: { title: r.name + " [Test mode]" },
        hashSecret: "71IIYMzMb0egTaCvvdijhUajAOjsrurzyRX5ziskMk4",
        sessionSecret: "MB9x-hOkx-UdcCbOprxggu-Wv1PetuoqzBny1h8DULA",
        mailer: { from: "noreply@vem-app.com", transport: "smtp", smtp: { host: "mailtrap.io", port: 2525, auth: { user: "367335eaa82697636", pass: "e5a76af9b056d0" } } },
        test: !0,
        db: { uri: "mongodb://localhost/" + r.config.dbName + "-test", options: { user: "", pass: "" } }
    }
}, function(e, t, n) { "use strict"; var r = n(1),
        o = (n(0), n(5)),
        i = n(6),
        s = n(8),
        a = n(3);
    e.exports = function(e) {
        function t(e) { return e.keys().map(function(t) { r.info("  Loading passport strategy file " + i.basename(t) + "..."); var n = e(t); return n(), n }) }
        e.use(o.initialize()), e.use(o.session()), o.serializeUser(function(e, t) { return t(null, e.id) }), o.deserializeUser(function(e, t) { a.findOne({ _id: e }, "-password", function(e, n) { return e ? t(e) : 1 !== n.status ? t(null, !1) : t(null, n) }) }), r.info(""), r.info(s.bold("Search passport strategies..."));
        t(n(97)) } }, function(e, t, n) { "use strict"; var r = n(5),
        o = n(130).Strategy,
        i = n(3);
    e.exports = function() { r.use(new o({ passReqToCallback: !0 }, function(e, t, n) { return i.findOne({ apiKey: t }, function(t, r) { return t ? n(t) : r ? r.verified ? 1 !== r.status ? n(null, !1, { message: e.t("UserDisabledOrDeleted") }) : n(null, r) : n(null, !1, { message: e.t("PleaseActivateAccount") }) : n(null, !1, { message: e.t("UnknowAPIKey") }) }) })) } }, function(e, t, n) { "use strict"; var r = (n(1), n(0)),
        o = n(9),
        i = n(5),
        s = n(126).Strategy;
    n(3);
    e.exports = function() { r.authKeys.facebook.clientID && r.authKeys.facebook.clientSecret && i.use("facebook", new s({ clientID: r.authKeys.facebook.clientID, clientSecret: r.authKeys.facebook.clientSecret, callbackURL: "/auth/facebook/callback", profileFields: ["name", "email", "link", "locale", "timezone"], passReqToCallback: !0 }, function(e, t, n, r, i) { o.linkToSocialAccount({ req: e, accessToken: t, refreshToken: n, profile: r, done: i, provider: "facebook", email: r._json.email, userData: { name: r.name.givenName + " " + r.name.familyName, gender: r._json.gender, picture: "https://graph.facebook.com/" + r.id + "/picture?type=large", location: r._json.location ? r._json.location.name : null } }) })) } }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = n(9),
        s = n(5),
        a = n(127).Strategy;
    n(3);
    e.exports = function() { o.authKeys.github.clientID && o.authKeys.github.clientSecret && s.use("github", new a({ clientID: o.authKeys.github.clientID, clientSecret: o.authKeys.github.clientSecret, callbackURL: "/auth/github/callback", scope: ["user:email"], passReqToCallback: !0 }, function(e, t, n, o, s) { r.info("Received profile: ", o); var a = void 0;
            o.emails && o.emails.length > 0 && (a = o.emails.find(function(e) { return e.primary }), a || (a = o.emails[0])), i.linkToSocialAccount({ req: e, accessToken: t, refreshToken: n, profile: o, done: s, provider: "github", username: o.username, email: a ? a.value : null, userData: { name: o.displayName, gender: null, picture: o._json.avatar_url, location: o._json.location } }) })) } }, function(e, t, n) { "use strict"; var r = (n(1), n(0)),
        o = n(9),
        i = n(5),
        s = n(128).OAuth2Strategy;
    n(3);
    e.exports = function() { r.authKeys.google.clientID && r.authKeys.google.clientSecret && i.use("google", new s({ clientID: r.authKeys.google.clientID, clientSecret: r.authKeys.google.clientSecret, callbackURL: "/auth/google/callback", passReqToCallback: !0 }, function(e, t, n, r, i) { o.linkToSocialAccount({ req: e, accessToken: t, refreshToken: n, profile: r, done: i, provider: "google", email: r.emails[0].value, userData: { name: r.displayName, gender: r.gender, picture: r.photos && r.photos.length > 0 ? r.photos[0].value.replace("sz=50", "sz=200") : null, location: null } }) })) } }, function(e, t, n) { "use strict"; var r = n(5),
        o = n(129).Strategy,
        i = n(3);
    e.exports = function() { r.use(new o({ usernameField: "username", passwordField: "password", passReqToCallback: !0 }, function(e, t, n, r) { return i.findOne({ $or: [{ username: t }, { email: t }] }, function(t, o) { return t ? r(t) : o ? o.verified ? 1 !== o.status ? r(null, !1, { message: e.t("UserDisabledOrDeleted") }) : o.passwordLess ? r(null, !1, { message: e.t("PasswordlessAccountLeaveEmpty") }) : void o.comparePassword(n, function(t, n) { return t ? r(t) : n !== !0 ? r(null, !1, { message: e.t("InvalidPassword") }) : r(null, o) }) : r(null, !1, { message: e.t("PleaseActivateAccount") }) : r(null, !1, { message: e.t("UnknowUsernameOrEmail") }) }) })) } }, function(e, t, n) { "use strict"; var r = (n(1), n(0)),
        o = n(9),
        i = n(5),
        s = n(131).Strategy;
    n(3);
    e.exports = function() { r.authKeys.twitter.clientID && r.authKeys.twitter.clientSecret && i.use("twitter", new s({ consumerKey: r.authKeys.twitter.clientID, consumerSecret: r.authKeys.twitter.clientSecret, callbackURL: "/auth/twitter/callback", passReqToCallback: !0 }, function(e, t, n, r, i) { o.linkToSocialAccount({ req: e, accessToken: t, refreshToken: n, profile: r, done: i, provider: "twitter", email: r.username + "@twitter.com", username: r.username, userData: { name: r.displayName, gender: null, picture: r._json.profile_image_url_https, location: r._json.location } }) })) } }, function(e, t, n) { "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var o = function() {
            function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
        i = (n(0), n(1)),
        s = (n(17), n(2), function() {
            function e(t, n) { var o = this;
                r(this, e), this.cache = {}, this.prefix = t ? t + ":" : "", this.ttl = n, n && (this.timer = setInterval(function() { o.checkTTL() }, 3e4)) } return o(e, [{ key: "get", value: function(e) { var t = this; return new Promise(function(n, r) { var o = t.cache[t.prefix + e];
                        o ? (i.debug("[Cacher] GET " + t.prefix + e), n(o.data), o.expire = Date.now() + 1e3 * t.ttl) : n(null) }) } }, { key: "set", value: function(e, t) { return this.cache[this.prefix + e] = { data: t, expire: Date.now() + 1e3 * this.ttl }, i.debug("[Cacher] SET " + this.prefix + e), Promise.resolve(t) } }, { key: "del", value: function(e) { return delete this.cache[this.prefix + e], i.debug("[Cacher] DEL " + this.prefix + e), Promise.resolve() } }, { key: "clean", value: function(e) { return i.debug("[Cacher] CLEAR " + this.prefix + "*"), this.cache = {}, Promise.resolve() } }, { key: "checkTTL", value: function() { var e = this,
                        t = this,
                        n = Date.now(),
                        r = Object.keys(this.cache);
                    r.forEach(function(r) { var o = e.cache[r];
                        o.expire && o.expire < n && (i.debug("[Cacher] EXPIRED " + r), delete t.cache[r]) }) } }]), e }());
    e.exports = s }, function(e, t, n) { "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var o = function() {
            function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
        i = (n(0), n(1)),
        s = n(17),
        a = n(2),
        u = function() {
            function e(t, n) { r(this, e), i.debug("Redis Cacher created. Prefix: " + t), this.prefix = t ? t + ":" : "", this.ttl = n } return o(e, [{ key: "get", value: function(e) { return s.get(this.prefix + e).then(function(e) { if (e) try { return JSON.parse(e) } catch (e) { i.error("Redis result parse error!", e) }
                        return e }) } }, { key: "set", value: function(e, t) { return a.isObject(t) && (t = JSON.stringify(t)), this.ttl ? s.setex(this.prefix + e, this.ttl, t) : s.set(this.prefix + e, t) } }, { key: "del", value: function(e) { return s.del(this.prefix + e, function(e) { e && i.error("Redis `del` error!", e) }), Promise.resolve() } }, { key: "clean", value: function(e) { var t = this,
                        n = function n(r, o) { s.scan(r, "MATCH", t.prefix + (e || "*"), "COUNT", 100, function(e, t) { if (e) return o(e); var r = parseInt(t[0]),
                                    i = t[1]; return r || i.length ? void s.del(i, function(e) { return e ? o(e) : r ? void n(r, o) : o(null) }) : o(null) }) }; return n(0, function(e) { e && i.error("Redis `scanDel` error!", e) }), Promise.resolve() } }]), e }();
    e.exports = u }, function(e, t, n) { "use strict"; var r = (n(0), n(1), n(17), n(2), n(77)),
        o = n(78);
    e.exports = function(e, t, n) { switch (e) {
            case "redis":
                return new o(t, n);
            default:
                return new r(t, n) } } }, function(e, t, n) { "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var o = function() {
            function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
        i = n(1),
        s = (n(0), n(12)),
        a = n(14),
        u = n(4),
        c = n(13),
        l = n(2),
        d = (n(49), void 0),
        f = function() {
            function e(t) { r(this, e), this.id = a(), this.createdAt = Date.now(), this.service = t, this.io = t.io, this.app = null, this.req = null, this.res = null, this.action = null, this.t = null, this.user = null, this.socket = null, this.params = [], this.model = null, this.modelID = null, this.provider = "internal", this.validationErrors = [], d || (d = n(7)) } return o(e, [{ key: "services", value: function(e) { return d.get(e) } }, { key: "copy", value: function(t, n) { var r = l.defaults(new e(this.service), this); return r.provider = "internal", n === !0 ? r.params = l.defaults(this.params, t) : r.params = t, r } }, { key: "responseTime", value: function() { return Date.now() - this.createdAt } }, { key: "resolveModel", value: function() { var e = this; if (l.isFunction(this.service.modelResolver)) { var t = this.service.$settings.idParamName || "id",
                            n = this.params[t]; if (null != n) return this.service.modelResolver.call(this.service, this, n).then(function(t) { return e.model = t, t }) } return Promise.resolve(null) } }, { key: "assertModelIsExist", value: function(e) { if (!this.model) throw this.errorBadRequest(u.ERR_MODEL_NOT_FOUND, e); return !0 } }, { key: "checkPermission", value: function() { var e = this,
                        t = this.action.permission || this.service.$settings.permission || u.PERM_LOGGEDIN; return t == u.PERM_PUBLIC ? Promise.resolve() : Promise.resolve().then(function() { e.user || e.errorUnauthorized() }).then(function() { t == u.PERM_ADMIN && e.isAdmin() ? e.errorForbidden() : t == u.PERM_USER && e.user.roles.indexOf(u.ROLE_USER) == -1 && e.errorForbidden() }).then(function() { if (t == u.PERM_OWNER && l.isFunction(e.service.$schema.ownerChecker)) return e.service.$schema.ownerChecker(e).catch(function(t) { if (l.isObject(t)) throw t;
                            e.errorForbidden(u.ERR_ONLY_OWNER_CAN_EDIT_AND_DELETE, e.t("app:YouAreNotTheOwner")) }) }) } }, { key: "broadcast", value: function(e, t) { if (this.io) { var n = "/" + this.service.namespace + "/" + e;
                        i.debug("Send WS broadcast message to '" + n + "':", t), this.io.emit(n, t) } } }, { key: "emitUser", value: function(e, t) { var n = this; if (!this.socket && this.user && (this.socket = l.find(c.userSockets, function(e) { return e.request.user._id == n.user._id })), this.socket) { var r = "/" + this.service.namespace + "/" + e;
                        i.debug("Send WS message to " + this.socket.request.user.username + " '" + r + "':", t), this.socket.emit(r, t) } } }, { key: "emit", value: function(e, t, n) { var r = this; if (n || (n = this.service.$settings.role), !n) { var o = "/" + this.service.namespace + "/" + e; return i.debug("Send WS broadcast message to '" + o + "':", t), void(this.socket ? this.socket.broadcast.emit(o, t) : this.io.emit(o, t)) }
                    this.io && ! function() { var o = "/" + r.service.namespace + "/" + e;
                        i.debug("Send WS message to '" + n + "' role '" + o), l.each(c.userSockets, function(e) { var s = e.request.user; if (s && s.roles && s.roles.indexOf(n) !== -1) { if ("socket" == r.provider && s == r.user) return;
                                i.debug("Send WS message to " + s.username + " '" + o + "':", t), e.emit(o, t) } }) }() } }, { key: "hasParam", value: function(e, t) { return null != this.params[e] } }, { key: "validateParam", value: function(e, t) { var n = this,
                        r = { name: e, value: null, errors: [] };
                    r.noError = function() { return 0 == r.errors.length }, r.addError = function(e) { r.errors.push(e), n.validationErrors.push(e) }, r.end = function() { return r.noError() && (n.params[r.name] = r.value), r.value }, r.throw = function() { if (!r.noError()) throw new Error(r.errors.join(" ")); return r.value }, r.notEmpty = function(t) { return null != r.value && "" !== r.value || r.addError(t || "Parameter '" + e + "' is empty!"), l.isArray(r.value) && 0 == r.value.length && r.addError(t || "Parameter '" + e + "' is empty!"), r }, r.isNumber = function(e) { return null == r.value || l.isNumber(r.value) }, r.trim = function() { return r.noError() && null != r.value && (r.value = r.value.trim()), r }; var o = this.params[e]; return null != o && (r.value = o), r } }, { key: "hasValidationErrors", value: function() { return this.validationErrors.length > 0 } }, { key: "errorBadRequest", value: function(e, t) { var n = new Error(t); throw n = l.defaults(s.BAD_REQUEST), e && (n.type = e), t && (n.message = t), n } }, { key: "errorForbidden", value: function(e, t) { var n = new Error(t); throw n = l.defaults(s.FORBIDDEN), e && (n.type = e), t && (n.message = t), n } }, { key: "errorUnauthorized", value: function(e, t) { var n = new Error(t); throw n = l.defaults(s.UNAUTHORIZED), e && (n.type = e), t && (n.message = t), n } }, { key: "notifyChanges", value: function(e, t, n) { var r = { status: 200, event: e, data: t }; if (this.user) { var o = this.services("persons");
                        r.user = o.toJSON(this.user) }
                    this.emit(e, r, n) } }, { key: "queryPageSort", value: function(e) { return this.params && (this.params.limit && e.limit(this.params.limit), this.params.offset && e.skip(this.params.offset), this.params.sort && e.sort(this.params.sort.replace(/,/, " "))), e } }, { key: "isAuthenticated", value: function(e) { return null != this.user } }, { key: "hasRole", value: function(e) { return this.user && this.user.roles.indexOf(e) != -1 } }, { key: "isAdmin", value: function() { return this.user && this.hasRole(u.ROLE_ADMIN) } }], [{ key: "CreateFromREST", value: function(t, n, r, o, i) { var s = new e(t); return s.provider = "rest", s.app = r, s.req = o, s.res = i, s.t = o.t, s.user = o.user, s.params = l.defaults({}, o.query, o.params, o.body), s.action = n, s } }, { key: "CreateFromSocket", value: function(t, n, r, o, i) { var s = new e(t); return s.provider = "socket", s.app = r, s.socket = o, s.t = r.t, s.user = o.request.user, s.params = i || {}, s.action = n, s } }, { key: "CreateFromGraphQL", value: function(t, n, r, o, i) { var s = new e(t); return s.provider = "graphql", s.t = i.t, s.params = o, s.user = i.user, s.action = n, i.ctx = s, s } }, { key: "CreateToServiceInit", value: function(t) { var n = new e(t); return n.provider = "", n.app = t.$app, n } }]), e }();
    e.exports = f }, function(e, t, n) { "use strict";

    function r(e, t) { if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function") } var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) { return typeof e } : function(e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e },
        i = function() {
            function e(e, t) { for (var n = 0; n < t.length; n++) { var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r) } } return function(t, n, r) { return n && e(t.prototype, n), r && e(t, r), t } }(),
        s = n(1),
        a = n(0),
        u = (n(13), n(4)),
        c = n(2),
        l = n(49),
        d = n(79),
        f = void 0,
        p = function(e) { s.warn("[Service warn]: " + e) },
        m = function(e) { throw new Error("[Service warn]: " + e) },
        v = function() {
            function e(t, o, i) { r(this, e); var s = this;
                t = t || {}, s.$schema = t, s.$app = o, s.$db = i, f || (f = n(7)), t.settings || m("No settings of service '" + s.name + "'! Please create a settings object in service schema!"); var l = c.defaultsDeep(t.settings, { version: 1, namespace: "", internal: !1, rest: !1, ws: !1, graphql: !1, permission: u.PERM_LOGGEDIN, role: u.ROLE_USER, idParamName: "code", modelPropFilter: null }); if (s.$settings = l, s.name = l.name, s.version = l.version, s.namespace = l.namespace, s.collection = l.collection, s.name || m("No name of service '" + s.name + "'! Please set in settings of service schema!"), !s.namespace && (l.rest || l.ws || l.graphql) && m("No namespace of service '" + s.name + "'! Please set in settings of service schema!"), a.cacheTimeout) { var v = a.redis.enabled ? "redis" : "memory";
                    s.$cacher = new d(v, s.name, a.cacheTimeout) } var h = function(e, t) { return function(n) { var r = s.getCacheKey(e.name, n.params); return s.getFromCache(r).then(function(e) { return null != e ? e : t(n).then(function(e) { return s.putToCache(r, e), e }) }) } };
                t.actions && c.isObject(t.actions) && (s.actions = {}, c.forIn(t.actions, function(e, t) { if (c.isFunction(e) && (e = { handler: e, name: t }), c.isFunction(e.handler)) { var n = e.handler.bind(s);
                        e.cache && (n = h(e, n)), s.actions[t] = n }
                    s.actions[t].settings = e, s.actions[t].settings.name = s.actions[t].settings.name || t, delete s.actions[t].settings.handler })), t.methods && c.isObject(t.methods) && c.forIn(t.methods, function(e, t) { return ["name", "version", "namespace", "collection", "actions"].indexOf(t) != -1 ? void p("Invalid method name '" + t + "' in '" + s.name + "' service! Skipping...") : ["toJSON", "getByID", "modelResolver"].indexOf(t) != -1 ? void p("This method name '" + t + "' is prohibited under 'methods' object. If you want to override the built-in method, please declare in the root of service schema! Skipping...") : void(s[t] = e.bind(s)) }); var g = ["toJSON", "getByID", "modelResolver"];
                g.forEach(function(e) { c.isFunction(t[e]) && (s["__" + e] = s[e], s[e] = t[e].bind(s)) }) } return i(e, [{ key: "toJSON", value: function(e, t) { var n = function(e) { var n = e.toJSON(); return null != t ? c.pick(n, t) : n }; return null == t && (t = this.$settings.modelPropFilter), c.isString(t) && (t = t.split(" ")), c.isArray(e) ? c.map(e, function(e) { return n(e, t) }) : c.isObject(e) ? n(e) : void 0 } }, { key: "populateModels", value: function(e, t) { if (t = t || this.$settings.modelPopulates, null != e && t) { var n = function() { var n = []; if (c.forIn(t, function(t, r) { c.isString(t) && ! function() { var o = f.get(t); if (o && c.isFunction(o.getByID)) { var i = c.isArray(e) ? e : [e];
                                            i.forEach(function(e) { n.push(o.getByID(e[r]).then(function(t) { e[r] = t })) }) } }() }), n.length > 0) return { v: Promise.all(n).then(function() { return e }) } }(); if ("object" === ("undefined" == typeof n ? "undefined" : o(n))) return n.v } return Promise.resolve(e) } }, { key: "getByID", value: function(e) { var t = this; if (null == this.collection || null == e) return Promise.resolve(); if (c.isArray(e) && 0 == e.length) return Promise.resolve([]); var n = a.cacheTimeout ? this.getCacheKey("model", e) : null; return Promise.resolve().then(function() { return n ? t.getFromCache(n) : null }).then(function(r) { if (r) return r; var o = void 0; return o = c.isArray(e) ? t.collection.find({ _id: { $in: e } }) : t.collection.findById(e), o.exec().then(function(e) { return t.toJSON(e) }).then(function(e) { return t.populateModels(e) }).then(function(e) { return n && t.putToCache(n, e), e }) }) } }, { key: "modelResolver", value: function(e, t) { if (null == this.collection) return Promise.resolve(); var n = void 0; return n = c.isFunction(this.collection.schema.methods.decodeID) ? this.collection.schema.methods.decodeID(t) : t, e.modelID = n, null == n || "" == n ? e.errorBadRequest(u.ERR_INVALID_CODE, e.t("app:InvalidCode")) : this.getByID(n) } }, { key: "decodeID", value: function(e) { if (c.isFunction(this.collection.schema.methods.decodeID)) return this.collection.schema.methods.decodeID(e); throw new Error("'decodeID' method not implemented in '" + this.name + "' service!") } }, { key: "encodeID", value: function(e) { if (c.isFunction(this.collection.schema.methods.encodeID)) return this.collection.schema.methods.encodeID(e); throw new Error("'encodeID' method not implemented in '" + this.name + "' service!") } }, { key: "getCacheKey", value: function(e, t) { return (e ? e + ":" : "") + (t ? l(t) : "") } }, { key: "getFromCache", value: function(e) { return this.$cacher ? this.$cacher.get(e) : Promise.resolve(null) } }, { key: "putToCache", value: function(e, t) { return this.$cacher ? this.$cacher.set(e, t) : Promise.resolve() } }, { key: "clearCache", value: function() { return this.$cacher ? this.$cacher.clean() : Promise.resolve() } }, { key: "notifyModelChanges", value: function(e, t, n) { e.notifyChanges(t, n, this.$settings.role), f.emit(this.name + ":" + t, { ctx: e, payload: n }), this.clearCache() } }, { key: "services", value: function(e) { return f.get(e) } }]), e }();
    e.exports = v }, function(e, t, n) { "use strict";

    function r() { var e = {}; return o.authKeys && (o.authKeys.google && o.authKeys.google.clientID && (e.google = !0), o.authKeys.facebook && o.authKeys.facebook.clientID && (e.facebook = !0), o.authKeys.github && o.authKeys.github.clientID && (e.github = !0), o.authKeys.twitter && o.authKeys.twitter.clientID && (e.twitter = !0)), Object.keys(e).length > 0 ? e : null } var o = n(0),
        i = n(1),
        s = n(4),
        a = n(14),
        u = n(23),
        c = n(37),
        l = (n(5), n(18), n(12)),
        d = n(29),
        f = n(3);
    e.exports = function(e, t) { e.get("/login", function(e, t) { return null != e.user ? t.redirect("/") : void t.render("account/login", { socialAuth: r() }) }), e.get("/logout", function(e, t) { e.logout(), e.session.destroy(), t.redirect("/") }), e.get("/signup", function(e, t) { return o.features.disableSignUp === !0 ? t.redirect("/login") : void t.render("account/signup", { socialAuth: r() }) }), e.post("/signup", function(e, t) { if (o.features.disableSignUp === !0) return t.redirect("/");
            e.assert("name", e.t("NameCannotBeEmpty")).notEmpty(), e.assert("email", e.t("EmailCannotBeEmpty")).notEmpty(), e.assert("email", e.t("EmailIsNotValid")).isEmail(), e.sanitize("email").normalizeEmail({ remove_dots: !1 }), e.body.username || (e.body.username = e.body.email), e.sanitize("passwordless").toBoolean(); var n = e.body.passwordless === !0;
            n || (e.assert("password", e.t("PasswordCannotBeEmpty")).notEmpty(), e.assert("password", e.t("PasswordTooShort")).len(6)); var r = e.validationErrors(); return r ? (e.flash("error", r), t.redirect("/signup")) : void c.waterfall([function(e) { o.features.verificationRequired ? u.randomBytes(25, function(t, n) { e(t, t ? null : n.toString("hex")) }) : e(null, null) }, function(t, r) { n ? u.randomBytes(25, function(e, n) { r(e, t, e ? null : n.toString("hex")) }) : r(null, t, e.body.password) }, function(t, r, o) { var i = new f({ fullName: e.body.name, email: e.body.email, username: e.body.username, password: r, passwordLess: n, roles: [s.ROLE_USER], provider: "local" });
                t ? (i.verified = !1, i.verifyToken = t) : i.verified = !0, i.save(function(t, n) { if (t && 11e3 === t.code) { var r = t.message.split(".$")[1];
                        r = r.split(" dup key")[0], r = r.substring(0, r.lastIndexOf("_")), "email" == r ? e.flash("error", { msg: e.t("EmailIsExists") }) : e.flash("error", { msg: e.t("UsernameIsExists") }) }
                    o(t, n) }) }, function(n, r) { n.verified ? ! function() { var i = e.t("mailSubjectWelcome", o);
                    t.render("mail/welcome", { name: n.fullName }, function(e, t) { return e ? r(e) : void d.send(n.email, i, t, function(e, t) { r(null, n) }) }) }() : ! function() { var i = e.t("mailSubjectActivate", o);
                    t.render("mail/accountVerify", { name: n.fullName, validateLink: "http://" + e.headers.host + "/verify/" + n.verifyToken }, function(t, o) { return t ? r(t) : void d.send(n.email, i, o, function(t, o) { t ? e.flash("error", { msg: e.t("UnableToSendEmail", n) }) : e.flash("info", { msg: e.t("emailSentVerifyLink") }), r(t, n) }) }) }() }], function(n, r) { return n ? (i.error(n), t.redirect("back")) : void(r.verified ? e.login(r, function(e) { return e && i.error(e), t.redirect("/") }) : t.redirect("/login")) }) }), e.get("/verify/:token", function(e, t) { return e.isAuthenticated() ? t.redirect("/") : void c.waterfall([function(t) { f.findOne({ verifyToken: e.params.token }).exec(function(n, r) { return n ? t(n) : r ? (r.verified = !0, r.verifyToken = void 0, r.lastLogin = Date.now(), void r.save(function(n) { return n ? (e.flash("error", { msg: e.t("UnableModifyAccountDetails") }), t(n)) : void t(null, r) })) : (e.flash("error", { msg: e.t("AccountVerificationExpired") }), t("Verification is invalid!")) }) }, function(n, r) { var i = e.t("mailSubjectWelcome", o);
                t.render("mail/welcome", { name: n.fullName }, function(e, t) { return e ? r(e) : void d.send(n.email, i, t, function(e, t) { r(null, n) }) }) }, function(t, n) { e.login(t, function(e) { n(e, t) }) }], function(e) { return e ? (i.error(e), t.redirect("/signup")) : void t.redirect("/") }) }), e.get("/passwordless/:token", function(e, t) { return e.isAuthenticated() ? t.redirect("/") : void c.waterfall([function(t) { f.findOne({ passwordLessToken: e.params.token }).exec(function(n, r) { return n ? t(n) : r ? (r.passwordLessToken = void 0, r.verified || (r.verified = !0, r.verifyToken = void 0), r.lastLogin = Date.now(), void r.save(function(n) { return n ? (e.flash("error", { msg: e.t("UnableModifyAccountDetails") }), t(n)) : void t(null, r) })) : (e.flash("error", { msg: e.t("PasswordlessTokenExpired") }), t("Token is invalid!")) }) }, function(t, n) { e.login(t, function(e) { n(e, t) }) }], function(e) { return e ? (i.error(e), t.redirect("/login")) : void t.redirect("/") }) }), e.get("/forgot", function(e, t) { return e.isAuthenticated() ? t.redirect("/") : void t.render("account/forgot") }), e.post("/forgot", function(e, t) { e.assert("email", e.t("EmailIsNotValid")).isEmail(), e.assert("email", e.t("EmailCannotBeEmpty")).notEmpty(), e.sanitize("email").normalizeEmail({ remove_dots: !1 }); var n = e.validationErrors(); return n ? (e.flash("error", n), t.redirect("back")) : void c.waterfall([function(e) { u.randomBytes(25, function(t, n) { e(t, t ? null : n.toString("hex")) }) }, function(t, n) { f.findOne({ email: e.body.email }, function(r, o) { return o ? 1 !== o.status ? (e.flash("error", { msg: e.t("UserDisabledOrDeleted") }), n(e.t("UserDisabledOrDeleted"))) : (o.resetPasswordToken = t, o.resetPasswordExpires = Date.now() + 36e5, void o.save(function(e) { n(e, t, o) })) : (e.flash("error", { msg: e.t("EmailNotAssociatedToAccount", e.body) }), n("Email address " + e.body.email + " is not registered!")) }) }, function(n, r, i) { var s = e.t("mailSubjectResetPassword", o);
                t.render("mail/passwordReset", { name: r.fullName, resetLink: "http://" + e.headers.host + "/reset/" + n }, function(t, n) { return t ? i(t) : void d.send(r.email, s, n, function(t, n) { t ? e.flash("error", { msg: e.t("UnableToSendEmail", r) }) : e.flash("info", { msg: e.t("emailSentPasswordResetLink", r) }), i(t) }) }) }], function(e) { e && i.error(e), t.redirect("back") }) }), e.get("/reset/:token", function(e, t, n) { return e.isAuthenticated() ? t.redirect("/") : void f.findOne({ resetPasswordToken: e.params.token }).where("resetPasswordExpires").gt(Date.now()).exec(function(r, o) { return r ? n(r) : o ? void t.render("account/reset") : (e.flash("error", { msg: e.t("PasswordResetTokenExpired") }), t.redirect("/forgot")) }) }), e.post("/reset/:token", function(e, t, n) { e.assert("password", e.t("PasswordTooShort")).len(6), e.assert("confirm", e.t("PasswordNotMatched")).equals(e.body.password); var r = e.validationErrors(); return r ? (e.flash("error", r), t.redirect("back")) : void c.waterfall([function(t) { f.findOne({ resetPasswordToken: e.params.token }).where("resetPasswordExpires").gt(Date.now()).exec(function(n, r) { return n ? t(n) : r ? (r.passwordLess && (r.passwordLess = !1), r.password = e.body.password, r.resetPasswordToken = void 0, r.resetPasswordExpires = void 0, r.lastLogin = Date.now(), void r.save(function(n) { return n ? t(n) : void e.login(r, function(e) { t(e, r) }) })) : (e.flash("error", { msg: e.t("PasswordResetTokenExpired") }), t("Password reset token is invalid or has expired.")) }) }, function(n, r) { var i = e.t("mailSubjectPasswordChanged", o);
                t.render("mail/passwordChange", { name: n.fullName }, function(t, o) { return t ? r(t) : void d.send(n.email, i, o, function(t, o) { t ? e.flash("error", { msg: e.t("UnableToSendEmail", n) }) : e.flash("info", { msg: e.t("PasswordChanged") }), r(t) }) }) }], function(e) { return e ? (i.error(e), t.redirect("back")) : void t.redirect("/") }) }), e.get("/generateAPIKey", function(e, t) { return e.isAuthenticated() ? void f.findById(e.user.id).exec(function(n, r) { return n ? l.json(t, null, l.SERVER_ERROR) : r ? (r.apiKey = a(), void r.save(function(e) { return e ? l.json(t, null, l.SERVER_ERROR) : l.json(t, r) })) : l.json(t, null, l.NOT_FOUND, e.t("InvalidUser")) }) : l.json(t, null, l.UNAUTHORIZED) }), e.get("/unlink/:provider", function(e, t) { return e.isAuthenticated() ? e.params.provider && ["facebook", "twitter", "google", "github"].indexOf(e.params.provider) !== -1 ? void f.findById(e.user.id).exec(function(n, r) { return n ? l.json(t, null, l.SERVER_ERROR) : r ? (r.socialLinks[e.params.provider] = void 0, void r.save(function(e) { return e ? l.json(t, null, l.SERVER_ERROR) : l.json(t, r) })) : l.json(t, null, l.NOT_FOUND, e.t("InvalidUser")) }) : l.json(t, null, l.BAD_REQUEST, e.t("InvalidOAuthProvider")) : l.json(t, null, l.UNAUTHORIZED) }) } }, function(e, t, n) { "use strict";

    function r(e, t, n, r) { if (e.accepts("json") && !e.accepts("html")) { var o = e.flash(); if (o && o.error && o.error.length > 0) { var i = o.error[0].msg;
                f.json(t, null, r || f.REQUEST_FAILED, i) } else { var s = "OK";
                o && o.info && o.info.length > 0 && (s = o.info[0].msg), f.json(t, s) } } else n && (e.session.returnTo && (n = e.session.returnTo, delete e.session.returnTo), t.redirect(n)) } var o = n(0),
        i = n(1),
        s = n(23),
        a = n(37),
        u = n(5),
        c = n(18),
        l = n(29),
        d = n(3),
        f = n(12);
    e.exports = function(e, t) { var n = c.Router();
        n.post("/local", function(e, t, n) { e.assert("username", e.t("UsernameCannotBeEmpty")).notEmpty(); var c = e.validationErrors(); return c ? (e.flash("error", c), r(e, t, "/login", f.BAD_REQUEST)) : void(e.body.password ? u.authenticate("local", function(n, o, i) { return o ? void e.login(o, function(n) { return n ? (e.flash("error", { msg: n }), r(e, t, "/login")) : (e.user.lastLogin = Date.now(), void e.user.save(function() { e.user.password = void 0, e.user.salt = void 0, r(e, t, "/") })) }) : (e.flash("error", { msg: i.message }), r(e, t, "/login")) })(e, t, n) : a.waterfall([function(e) { s.randomBytes(25, function(t, n) { e(t, t ? null : n.toString("hex")) }) }, function(t, n) { var r = e.body.username;
                d.findOne({ $or: [{ username: r }, { email: r }] }, function(o, i) { return i ? 1 !== i.status ? (e.flash("error", { msg: e.t("UserDisabledOrDeleted") }), n("User '" + r + " is disabled or deleted!")) : (i.passwordLessToken = t, void i.save(function(e) { n(e, t, i) })) : (e.flash("error", { msg: e.t("UsernameIsNotAssociated", { username: r }) }), n("Invalid username or email: " + r)) }) }, function(n, r, i) { var s = e.t("mailSubjectLogin", o);
                t.render("mail/passwordLessLogin", { name: r.fullName, loginLink: "http://" + e.headers.host + "/passwordless/" + n }, function(t, n) { return t ? i(t) : void l.send(r.email, s, n, function(t, n) { t ? e.flash("error", { msg: e.t("UnableToSendEmail", r) }) : e.flash("info", { msg: e.t("emailSentWithMagicLink", r) }), i(t) }) }) }], function(n, o) { n && i.error(n), r(e, t, "back") })) }), n.get("/google", u.authenticate("google", { scope: "profile email" })), n.get("/google/callback", u.authenticate("google", { failureRedirect: "/login" }), function(e, t) { t.redirect("/") }), n.get("/facebook", u.authenticate("facebook", { scope: ["email", "user_location"] })), n.get("/facebook/callback", u.authenticate("facebook", { failureRedirect: "/login" }), function(e, t) { t.redirect("/") }), n.get("/twitter", u.authenticate("twitter")), n.get("/twitter/callback", u.authenticate("twitter", { failureRedirect: "/login" }), function(e, t) { t.redirect("/") }), n.get("/github", u.authenticate("github", { scope: "user:email" })), n.get("/github/callback", u.authenticate("github", { failureRedirect: "/login" }), function(e, t) { t.redirect("/") }), e.use("/auth", n) } }, function(e, t, n) { "use strict"; var r = n(0),
        o = n(1),
        i = n(12);
    e.exports = function(e, t) { e.use(function(e, t, n, r) { return e ? (o.error(e.stack), n.status(e.status || 500), t.accepts("html") ? n.render("500", { url: t.originalUrl, error: e }) : t.accepts("json") ? i.json(n, null, i.SERVER_ERROR, e.message) : void 0) : r() }), e.use(function(e, t) { if (t.status(404), r.isTestMode() || o.warn("404 error! URL:", e.url), e.accepts("html")) { var n = new Error("404 Page Not Found"); return n.status = 404, t.render("404", { url: e.originalUrl, error: n }) } if (e.accepts("json")) return i.json(t, null, i.NOT_FOUND) }) } }, function(e, t, n) { "use strict"; var r = n(0),
        o = n(1),
        i = (n(9), n(42).graphqlExpress),
        s = n(42).graphiqlExpress,
        a = n(113);
    e.exports = function(e, t) { var u = n(7).registerGraphQLSchema(); if (u) { var c = a.makeExecutableSchema({ typeDefs: u.schema, resolvers: u.resolvers, logger: r.isDevMode() ? o : void 0 });
            e.use("/graphql", i(function(e) { var t = e.query.query || e.body.query; if (t && t.length > 2e3) throw new Error("Query too large."); return { schema: c, context: { req: e, query: t, t: e.t, user: e.user, session: e.session }, debug: r.isDevMode(), formatError: function(e) { return { status: e.originalError ? e.originalError.status : 400, type: e.originalError ? e.originalError.type : null, message: e.message, locations: e.locations, path: e.path } } } })), e.use("/graphiql", s({ endpointURL: "/graphql" })) } } }, function(e, t, n) { "use strict";
    n(0), n(1);
    e.exports = function(e, t) { e.get("/health", function(e, t) { t.sendStatus(200) }) } }, function(e, t, n) { "use strict";
    n(0), n(1), n(6);
    e.exports = function(e, t) { e.get("/", function(e, t) { null != e.user ? t.render("main", { user: e.user }) : t.render("index") }), n(86)(e, t), n(82)(e, t), n(83)(e, t); var r = n(7);
        r.registerRoutes(e, t), n(85)(e, t), n(84)(e, t) } }, function(e, t, n) { "use strict"; var r = n(1),
        o = n(0),
        i = (n(4), n(45)),
        s = n(46).htmlToText;
    e.exports = { settings: { name: "mailer", internal: !0 }, methods: { send: function(e, t, a) { return new Promise(function(u, c) { r.info("Sending email to " + e + " with subject " + t + "..."); var l = { from: o.mailer.from, to: e, subject: t, html: a },
                        d = void 0; if ("smtp" == o.mailer.transport) d = i.createTransport(o.mailer.smtp);
                    else if ("mailgun" == o.mailer.transport) { var f = n(47);
                        d = i.createTransport(f({ auth: { api_key: o.mailer.mailgun.apiKey, domain: o.mailer.mailgun.domain } })) } else if ("sendgrid" == o.mailer.transport) { var p = n(48);
                        d = i.createTransport(p({ auth: { api_key: o.mailer.sendgrid.apiKey } })) }
                    d ? (d.use("compile", s()), d.sendMail(l, function(e, t) { e ? (r.warn("Unable to send email: ", e), c(e)) : (r.info("Email message sent.", t.response), u(t)) })) : c(new Error("Unable to send email! Invalid mailer transport: " + o.mailer.transport)) }) } }, init: function(e) {} } }, function(e, t, n) { "use strict";

    function r(e) { return e && e.__esModule ? e : { default: e } }

    function o(e) { return (0, s.default)(e, "Received null or undefined error."), { message: e.message, locations: e.locations } }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.formatError = o; var i = n(92),
        s = r(i) }, function(e, t, n) { "use strict";

    function r(e, t, n) { if (e && e.locations) return e; var r = e ? e.message || String(e) : "An unknown error occurred."; return new o.GraphQLError(r, t, void 0, void 0, n, e) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.locatedError = r; var o = n(21) }, function(e, t, n) {
    "use strict";

    function r(e, t, n) { var r = (0, s.getLocation)(e, t),
            i = new a.GraphQLError("Syntax Error " + e.name + " (" + r.line + ":" + r.column + ") " + n + "\n\n" + o(e, r), void 0, e, [t]); return i }

    function o(e, t) {
        var n = t.line,
            r = (n - 1).toString(),
            o = n.toString(),
            s = (n + 1).toString(),
            a = s.length,
            u = e.body.split(/\r\n|[\n\r]/g);
        return (n >= 2 ? i(a, r) + ": " + u[n - 2] + "\n" : "") + i(a, o) + ": " + u[n - 1] + "\n" + Array(2 + a + t.column).join(" ") + "^\n" + (n < u.length ? i(a, s) + ": " + u[n] + "\n" : "");
    }

    function i(e, t) { return Array(e - t.length + 1).join(" ") + t }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.syntaxError = r;
    var s = n(34),
        a = n(21)
}, function(e, t, n) { "use strict";

    function r(e, t) { if (!e) throw new Error(t) }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.default = r }, function(e, t, n) { "use strict";

    function r(e, t) { var n = "string" == typeof e ? new ie.Source(e) : e,
            r = (0, ae.createLexer)(n, t || {}); return a(r) }

    function o(e, t) { var n = "string" == typeof e ? new ie.Source(e) : e,
            r = (0, ae.createLexer)(n, t || {});
        ee(r, ae.TokenKind.SOF); var o = S(r, !1); return ee(r, ae.TokenKind.EOF), o }

    function i(e, t) { var n = "string" == typeof e ? new ie.Source(e) : e,
            r = (0, ae.createLexer)(n, t || {});
        ee(r, ae.TokenKind.SOF); var o = P(r); return ee(r, ae.TokenKind.EOF), o }

    function s(e) { var t = ee(e, ae.TokenKind.NAME); return { kind: ue.NAME, value: t.value, loc: H(e, t) } }

    function a(e) { var t = e.token;
        ee(e, ae.TokenKind.SOF); var n = [];
        do n.push(u(e)); while (!X(e, ae.TokenKind.EOF)); return { kind: ue.DOCUMENT, definitions: n, loc: H(e, t) } }

    function u(e) { if (Z(e, ae.TokenKind.BRACE_L)) return c(e); if (Z(e, ae.TokenKind.NAME)) switch (e.token.value) {
            case "query":
            case "mutation":
            case "subscription":
                return c(e);
            case "fragment":
                return b(e);
            case "schema":
            case "scalar":
            case "type":
            case "interface":
            case "union":
            case "enum":
            case "input":
            case "extend":
            case "directive":
                return _(e) }
        throw ne(e) }

    function c(e) { var t = e.token; if (Z(e, ae.TokenKind.BRACE_L)) return { kind: ue.OPERATION_DEFINITION, operation: "query", name: null, variableDefinitions: null, directives: [], selectionSet: m(e), loc: H(e, t) }; var n = l(e),
            r = void 0; return Z(e, ae.TokenKind.NAME) && (r = s(e)), { kind: ue.OPERATION_DEFINITION, operation: n, name: r, variableDefinitions: d(e), directives: x(e), selectionSet: m(e), loc: H(e, t) } }

    function l(e) { var t = ee(e, ae.TokenKind.NAME); switch (t.value) {
            case "query":
                return "query";
            case "mutation":
                return "mutation";
            case "subscription":
                return "subscription" } throw ne(e, t) }

    function d(e) { return Z(e, ae.TokenKind.PAREN_L) ? oe(e, ae.TokenKind.PAREN_L, f, ae.TokenKind.PAREN_R) : [] }

    function f(e) { var t = e.token; return { kind: ue.VARIABLE_DEFINITION, variable: p(e), type: (ee(e, ae.TokenKind.COLON), P(e)), defaultValue: X(e, ae.TokenKind.EQUALS) ? S(e, !0) : null, loc: H(e, t) } }

    function p(e) { var t = e.token; return ee(e, ae.TokenKind.DOLLAR), { kind: ue.VARIABLE, name: s(e), loc: H(e, t) } }

    function m(e) { var t = e.token; return { kind: ue.SELECTION_SET, selections: oe(e, ae.TokenKind.BRACE_L, v, ae.TokenKind.BRACE_R), loc: H(e, t) } }

    function v(e) { return Z(e, ae.TokenKind.SPREAD) ? E(e) : h(e) }

    function h(e) { var t = e.token,
            n = s(e),
            r = void 0,
            o = void 0; return X(e, ae.TokenKind.COLON) ? (r = n, o = s(e)) : (r = null, o = n), { kind: ue.FIELD, alias: r, name: o, arguments: g(e), directives: x(e), selectionSet: Z(e, ae.TokenKind.BRACE_L) ? m(e) : null, loc: H(e, t) } }

    function g(e) { return Z(e, ae.TokenKind.PAREN_L) ? oe(e, ae.TokenKind.PAREN_L, y, ae.TokenKind.PAREN_R) : [] }

    function y(e) { var t = e.token; return { kind: ue.ARGUMENT, name: s(e), value: (ee(e, ae.TokenKind.COLON), S(e, !1)), loc: H(e, t) } }

    function E(e) { var t = e.token; if (ee(e, ae.TokenKind.SPREAD), Z(e, ae.TokenKind.NAME) && "on" !== e.token.value) return { kind: ue.FRAGMENT_SPREAD, name: k(e), directives: x(e), loc: H(e, t) }; var n = null; return "on" === e.token.value && (e.advance(), n = R(e)), { kind: ue.INLINE_FRAGMENT, typeCondition: n, directives: x(e), selectionSet: m(e), loc: H(e, t) } }

    function b(e) { var t = e.token; return te(e, "fragment"), { kind: ue.FRAGMENT_DEFINITION, name: k(e), typeCondition: (te(e, "on"), R(e)), directives: x(e), selectionSet: m(e), loc: H(e, t) } }

    function k(e) { if ("on" === e.token.value) throw ne(e); return s(e) }

    function S(e, t) { var n = e.token; switch (n.kind) {
            case ae.TokenKind.BRACKET_L:
                return I(e, t);
            case ae.TokenKind.BRACE_L:
                return O(e, t);
            case ae.TokenKind.INT:
                return e.advance(), { kind: ue.INT, value: n.value, loc: H(e, n) };
            case ae.TokenKind.FLOAT:
                return e.advance(), { kind: ue.FLOAT, value: n.value, loc: H(e, n) };
            case ae.TokenKind.STRING:
                return e.advance(), { kind: ue.STRING, value: n.value, loc: H(e, n) };
            case ae.TokenKind.NAME:
                if ("true" === n.value || "false" === n.value) return e.advance(), { kind: ue.BOOLEAN, value: "true" === n.value, loc: H(e, n) }; if ("null" !== n.value) return e.advance(), { kind: ue.ENUM, value: n.value, loc: H(e, n) }; break;
            case ae.TokenKind.DOLLAR:
                if (!t) return p(e) } throw ne(e) }

    function T(e) { return S(e, !0) }

    function w(e) { return S(e, !1) }

    function I(e, t) { var n = e.token,
            r = t ? T : w; return { kind: ue.LIST, values: re(e, ae.TokenKind.BRACKET_L, r, ae.TokenKind.BRACKET_R), loc: H(e, n) } }

    function O(e, t) { var n = e.token;
        ee(e, ae.TokenKind.BRACE_L); for (var r = []; !X(e, ae.TokenKind.BRACE_R);) r.push(N(e, t)); return { kind: ue.OBJECT, fields: r, loc: H(e, n) } }

    function N(e, t) { var n = e.token; return { kind: ue.OBJECT_FIELD, name: s(e), value: (ee(e, ae.TokenKind.COLON), S(e, t)), loc: H(e, n) } }

    function x(e) { for (var t = []; Z(e, ae.TokenKind.AT);) t.push(D(e)); return t }

    function D(e) { var t = e.token; return ee(e, ae.TokenKind.AT), { kind: ue.DIRECTIVE, name: s(e), arguments: g(e), loc: H(e, t) } }

    function P(e) { var t = e.token,
            n = void 0; return X(e, ae.TokenKind.BRACKET_L) ? (n = P(e), ee(e, ae.TokenKind.BRACKET_R), n = { kind: ue.LIST_TYPE, type: n, loc: H(e, t) }) : n = R(e), X(e, ae.TokenKind.BANG) ? { kind: ue.NON_NULL_TYPE, type: n, loc: H(e, t) } : n }

    function R(e) { var t = e.token; return { kind: ue.NAMED_TYPE, name: s(e), loc: H(e, t) } }

    function _(e) { if (Z(e, ae.TokenKind.NAME)) switch (e.token.value) {
            case "schema":
                return A(e);
            case "scalar":
                return q(e);
            case "type":
                return j(e);
            case "interface":
                return K(e);
            case "union":
                return B(e);
            case "enum":
                return G(e);
            case "input":
                return Y(e);
            case "extend":
                return J(e);
            case "directive":
                return Q(e) }
        throw ne(e) }

    function A(e) { var t = e.token;
        te(e, "schema"); var n = x(e),
            r = oe(e, ae.TokenKind.BRACE_L, L, ae.TokenKind.BRACE_R); return { kind: ue.SCHEMA_DEFINITION, directives: n, operationTypes: r, loc: H(e, t) } }

    function L(e) { var t = e.token,
            n = l(e);
        ee(e, ae.TokenKind.COLON); var r = R(e); return { kind: ue.OPERATION_TYPE_DEFINITION, operation: n, type: r, loc: H(e, t) } }

    function q(e) { var t = e.token;
        te(e, "scalar"); var n = s(e),
            r = x(e); return { kind: ue.SCALAR_TYPE_DEFINITION, name: n, directives: r, loc: H(e, t) } }

    function j(e) { var t = e.token;
        te(e, "type"); var n = s(e),
            r = C(e),
            o = x(e),
            i = re(e, ae.TokenKind.BRACE_L, M, ae.TokenKind.BRACE_R); return { kind: ue.OBJECT_TYPE_DEFINITION, name: n, interfaces: r, directives: o, fields: i, loc: H(e, t) } }

    function C(e) { var t = []; if ("implements" === e.token.value) { e.advance();
            do t.push(R(e)); while (Z(e, ae.TokenKind.NAME)) } return t }

    function M(e) { var t = e.token,
            n = s(e),
            r = U(e);
        ee(e, ae.TokenKind.COLON); var o = P(e),
            i = x(e); return { kind: ue.FIELD_DEFINITION, name: n, arguments: r, type: o, directives: i, loc: H(e, t) } }

    function U(e) { return Z(e, ae.TokenKind.PAREN_L) ? oe(e, ae.TokenKind.PAREN_L, F, ae.TokenKind.PAREN_R) : [] }

    function F(e) { var t = e.token,
            n = s(e);
        ee(e, ae.TokenKind.COLON); var r = P(e),
            o = null;
        X(e, ae.TokenKind.EQUALS) && (o = T(e)); var i = x(e); return { kind: ue.INPUT_VALUE_DEFINITION, name: n, type: r, defaultValue: o, directives: i, loc: H(e, t) } }

    function K(e) { var t = e.token;
        te(e, "interface"); var n = s(e),
            r = x(e),
            o = re(e, ae.TokenKind.BRACE_L, M, ae.TokenKind.BRACE_R); return { kind: ue.INTERFACE_TYPE_DEFINITION, name: n, directives: r, fields: o, loc: H(e, t) } }

    function B(e) { var t = e.token;
        te(e, "union"); var n = s(e),
            r = x(e);
        ee(e, ae.TokenKind.EQUALS); var o = V(e); return { kind: ue.UNION_TYPE_DEFINITION, name: n, directives: r, types: o, loc: H(e, t) } }

    function V(e) { var t = [];
        do t.push(R(e)); while (X(e, ae.TokenKind.PIPE)); return t }

    function G(e) { var t = e.token;
        te(e, "enum"); var n = s(e),
            r = x(e),
            o = oe(e, ae.TokenKind.BRACE_L, $, ae.TokenKind.BRACE_R); return { kind: ue.ENUM_TYPE_DEFINITION, name: n, directives: r, values: o, loc: H(e, t) } }

    function $(e) { var t = e.token,
            n = s(e),
            r = x(e); return { kind: ue.ENUM_VALUE_DEFINITION, name: n, directives: r, loc: H(e, t) } }

    function Y(e) { var t = e.token;
        te(e, "input"); var n = s(e),
            r = x(e),
            o = re(e, ae.TokenKind.BRACE_L, F, ae.TokenKind.BRACE_R); return { kind: ue.INPUT_OBJECT_TYPE_DEFINITION, name: n, directives: r, fields: o, loc: H(e, t) } }

    function J(e) { var t = e.token;
        te(e, "extend"); var n = j(e); return { kind: ue.TYPE_EXTENSION_DEFINITION, definition: n, loc: H(e, t) } }

    function Q(e) { var t = e.token;
        te(e, "directive"), ee(e, ae.TokenKind.AT); var n = s(e),
            r = U(e);
        te(e, "on"); var o = z(e); return { kind: ue.DIRECTIVE_DEFINITION, name: n, arguments: r, locations: o, loc: H(e, t) } }

    function z(e) { var t = [];
        do t.push(s(e)); while (X(e, ae.TokenKind.PIPE)); return t }

    function H(e, t) { if (!e.options.noLocation) return new W(t, e.lastToken, e.source) }

    function W(e, t, n) { this.start = e.start, this.end = t.end, this.startToken = e, this.endToken = t, this.source = n }

    function Z(e, t) { return e.token.kind === t }

    function X(e, t) { var n = e.token.kind === t; return n && e.advance(), n }

    function ee(e, t) { var n = e.token; if (n.kind === t) return e.advance(), n; throw (0, se.syntaxError)(e.source, n.start, "Expected " + t + ", found " + (0, ae.getTokenDesc)(n)) }

    function te(e, t) { var n = e.token; if (n.kind === ae.TokenKind.NAME && n.value === t) return e.advance(), n; throw (0, se.syntaxError)(e.source, n.start, 'Expected "' + t + '", found ' + (0, ae.getTokenDesc)(n)) }

    function ne(e, t) { var n = t || e.token; return (0, se.syntaxError)(e.source, n.start, "Unexpected " + (0, ae.getTokenDesc)(n)) }

    function re(e, t, n, r) { ee(e, t); for (var o = []; !X(e, r);) o.push(n(e)); return o }

    function oe(e, t, n, r) { ee(e, t); for (var o = [n(e)]; !X(e, r);) o.push(n(e)); return o }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.parse = r, t.parseValue = o, t.parseType = i, t.parseConstValue = T, t.parseTypeReference = P, t.parseNamedType = R; var ie = n(35),
        se = n(30),
        ae = n(33),
        ue = n(32);
    W.prototype.toJSON = W.prototype.inspect = function() { return { start: this.start, end: this.end } } }, function(e, t, n) { "use strict";

    function r(e) { return (0, u.visit)(e, { leave: c }) }

    function o(e, t) { return e ? e.filter(function(e) { return e }).join(t || "") : "" }

    function i(e) { return e && 0 !== e.length ? a("{\n" + o(e, "\n")) + "\n}" : "{}" }

    function s(e, t, n) { return t ? e + t + (n || "") : "" }

    function a(e) { return e && e.replace(/\n/g, "\n  ") }
    Object.defineProperty(t, "__esModule", { value: !0 }), t.print = r; var u = n(36),
        c = { Name: function(e) { return e.value }, Variable: function(e) { return "$" + e.name }, Document: function(e) { return o(e.definitions, "\n\n") + "\n" }, OperationDefinition: function(e) { var t = e.operation,
                    n = e.name,
                    r = s("(", o(e.variableDefinitions, ", "), ")"),
                    i = o(e.directives, " "),
                    a = e.selectionSet; return n || i || r || "query" !== t ? o([t, o([n, r]), i, a], " ") : a }, VariableDefinition: function(e) { var t = e.variable,
                    n = e.type,
                    r = e.defaultValue; return t + ": " + n + s(" = ", r) }, SelectionSet: function(e) { var t = e.selections; return i(t) }, Field: function(e) { var t = e.alias,
                    n = e.name,
                    r = e.arguments,
                    i = e.directives,
                    a = e.selectionSet; return o([s("", t, ": ") + n + s("(", o(r, ", "), ")"), o(i, " "), a], " ") }, Argument: function(e) { var t = e.name,
                    n = e.value; return t + ": " + n }, FragmentSpread: function(e) { var t = e.name,
                    n = e.directives; return "..." + t + s(" ", o(n, " ")) }, InlineFragment: function(e) { var t = e.typeCondition,
                    n = e.directives,
                    r = e.selectionSet; return o(["...", s("on ", t), o(n, " "), r], " ") }, FragmentDefinition: function(e) { var t = e.name,
                    n = e.typeCondition,
                    r = e.directives,
                    i = e.selectionSet; return "fragment " + t + " on " + n + " " + s("", o(r, " "), " ") + i }, IntValue: function(e) { var t = e.value; return t }, FloatValue: function(e) { var t = e.value; return t }, StringValue: function(e) { var t = e.value; return JSON.stringify(t) }, BooleanValue: function(e) { var t = e.value; return JSON.stringify(t) }, EnumValue: function(e) { var t = e.value; return t }, ListValue: function(e) { var t = e.values; return "[" + o(t, ", ") + "]" }, ObjectValue: function(e) { var t = e.fields; return "{" + o(t, ", ") + "}" }, ObjectField: function(e) { var t = e.name,
                    n = e.value; return t + ": " + n }, Directive: function(e) { var t = e.name,
                    n = e.arguments; return "@" + t + s("(", o(n, ", "), ")") }, NamedType: function(e) { var t = e.name; return t }, ListType: function(e) { var t = e.type; return "[" + t + "]" }, NonNullType: function(e) { var t = e.type; return t + "!" }, SchemaDefinition: function(e) { var t = e.directives,
                    n = e.operationTypes; return o(["schema", o(t, " "), i(n)], " ") }, OperationTypeDefinition: function(e) { var t = e.operation,
                    n = e.type; return t + ": " + n }, ScalarTypeDefinition: function(e) { var t = e.name,
                    n = e.directives; return o(["scalar", t, o(n, " ")], " ") }, ObjectTypeDefinition: function(e) { var t = e.name,
                    n = e.interfaces,
                    r = e.directives,
                    a = e.fields; return o(["type", t, s("implements ", o(n, ", ")), o(r, " "), i(a)], " ") }, FieldDefinition: function(e) { var t = e.name,
                    n = e.arguments,
                    r = e.type,
                    i = e.directives; return t + s("(", o(n, ", "), ")") + ": " + r + s(" ", o(i, " ")) }, InputValueDefinition: function(e) { var t = e.name,
                    n = e.type,
                    r = e.defaultValue,
                    i = e.directives; return o([t + ": " + n, s("= ", r), o(i, " ")], " ") }, InterfaceTypeDefinition: function(e) { var t = e.name,
                    n = e.directives,
                    r = e.fields; return o(["interface", t, o(n, " "), i(r)], " ") }, UnionTypeDefinition: function(e) { var t = e.name,
                    n = e.directives,
                    r = e.types; return o(["union", t, o(n, " "), "= " + o(r, " | ")], " ") }, EnumTypeDefinition: function(e) { var t = e.name,
                    n = e.directives,
                    r = e.values; return o(["enum", t, o(n, " "), i(r)], " ") }, EnumValueDefinition: function(e) { var t = e.name,
                    n = e.directives; return o([t, o(n, " ")], " ") }, InputObjectTypeDefinition: function(e) { var t = e.name,
                    n = e.directives,
                    r = e.fields; return o(["input", t, o(n, " "), i(r)], " ") }, TypeExtensionDefinition: function(e) { var t = e.definition; return "extend " + t }, DirectiveDefinition: function(e) { var t = e.name,
                    n = e.arguments,
                    r = e.locations; return "directive @" + t + s("(", o(n, ", "), ")") + " on " + o(r, " | ") } } }, function(e, t) { e.exports = '"use strict";\n\nvar path = require("path");\nvar pkg = require("./package.json");\n\nmodule.exports = {\n\thashSecret: "{{hashSecret}}",\n\n\tsessionSecret: "{{sessionSecret}}",\n\n\tapp: {},\n\n\tdb: {\n\t\toptions: {\n\t\t\tuser: process.env.MONGO_USERNAME || "",\n\t\t\tpass: process.env.MONGO_PASSWORD || ""\n\t\t}\n\t},\n\n\tredis: {\n\t\tenabled: false,\n\t\turi: process.env.REDIS_URI || "redis://localhost:6379",\n\t\toptions: null\n\t},\n\n\tmailer: {},\n\n\tfeatures: {\n\t\tdisableSignUp: false,\n\t\tverificationRequired: true\n\t},\n\n\tauthKeys: {\n\n\t\tgoogle: {\n\t\t\tclientID: null,\n\t\t\tclientSecret: null\n\t\t},\n\n\t\tfacebook: {\n\t\t\tclientID: null,\n\t\t\tclientSecret: null\n\t\t},\n\n\t\tgithub: {\n\t\t\tclientID: null,\n\t\t\tclientSecret: null\n\t\t},\n\n\t\ttwitter: {\n\t\t\tclientID: null,\n\t\t\tclientSecret: null\n\t\t}\n\t},\n\n\tlogging: {\n\n\t\tconsole: {},\n\n\t\tfile: {\n\t\t\tenabled: false\n\t\t},\n\n\t\tgraylog: {\n\t\t\tenabled: false\n\t\t},\n\n\t\tpapertrail: {\n\t\t\tenabled: false,\n\t\t\thost: null,\n\t\t\tport: null,\n\t\t\tlevel: "debug",\n\t\t\tprogram: "vem"\n\t\t},\n\n\t\tlogentries: {\n\t\t\tenabled: false,\n\t\t\ttoken: null\n\t\t},\n\n\t\tloggly: {\n\t\t\tenabled: false,\n\t\t\ttoken: null,\n\t\t\tsubdomain: null\n\t\t},\n\n\t\tlogsene: {\n\t\t\tenabled: false,\n\t\t\ttoken: null\n\t\t},\n\n\t\tlogzio: {\n\t\t\tenabled: false,\n\t\t\ttoken: null\n\t\t}\n\n\t}\n\n};' }, function(e, t, n) {
    function r(e) { return n(o(e)) }

    function o(e) { var t = i[e]; if (!(t + 1)) throw new Error("Cannot find module '" + e + "'."); return t } var i = { "./counter/service.js": 59, "./devices/service.js": 60, "./persons/service.js": 62, "./posts/service.js": 63, "./profile/service.js": 65, "./session/service.js": 66 };
    r.keys = function() { return Object.keys(i) }, r.resolve = o, e.exports = r, r.id = 96 }, function(e, t, n) {
    function r(e) { return n(o(e)) }

    function o(e) { var t = i[e]; if (!(t + 1)) throw new Error("Cannot find module '" + e + "'."); return t } var i = { "./apikey.js": 71, "./facebook.js": 72, "./github.js": 73, "./google.js": 74, "./local.js": 75, "./twitter.js": 76 };
    r.keys = function() { return Object.keys(i) }, r.resolve = o, e.exports = r, r.id = 97 }, function(e, t, n) {
    function r(e) { return n(o(e)) }

    function o(e) { var t = i[e]; if (!(t + 1)) throw new Error("Cannot find module '" + e + "'."); return t } var i = { "./mailer.js": 88 };
    r.keys = function() { return Object.keys(i) }, r.resolve = o, e.exports = r, r.id = 98 }, function(e, t) { e.exports = require("../config.js") }, function(e, t) { e.exports = require("agenda") }, function(e, t) { e.exports = require("autoprefixer") }, function(e, t) { e.exports = require("bcrypt-nodejs") }, function(e, t) { e.exports = require("body-parser") }, function(e, t) { e.exports = require("cli-table2") }, function(e, t) { e.exports = require("clui") }, function(e, t) { e.exports = require("compression") }, function(e, t) { e.exports = require("csurf") }, function(e, t) { e.exports = require("events") }, function(e, t) { e.exports = require("express-flash") }, function(e, t) { e.exports = require("express-list-endpoints") }, function(e, t) { e.exports = require("express-validator") }, function(e, t) { e.exports = require("graphql") }, function(e, t) { e.exports = require("graphql-tools") }, function(e, t) { e.exports = require("hashids") }, function(e, t) { e.exports = require("helmet") }, function(e, t) { e.exports = require("helmet-crossdomain") }, function(e, t) { e.exports = require("i18next") }, function(e, t) { e.exports = require("i18next-express-middleware") }, function(e, t) { e.exports = require("i18next-node-fs-backend") }, function(e, t) { e.exports = require("ioredis") }, function(e, t) { e.exports = require("le_node") }, function(e, t) { e.exports = require("method-override") }, function(e, t) { e.exports = require("morgan") }, function(e, t) { e.exports = require("netjet") }, function(e, t) { e.exports = require("os") }, function(e, t) { e.exports = require("passport-facebook") }, function(e, t) { e.exports = require("passport-github") }, function(e, t) { e.exports = require("passport-google-oauth") }, function(e, t) { e.exports = require("passport-local") }, function(e, t) { e.exports = require("passport-localapikey-update") }, function(e, t) { e.exports = require("passport-twitter") }, function(e, t) { e.exports = require("precss") }, function(e, t) { e.exports = require("pretty-bytes") }, function(e, t) { e.exports = require("serve-favicon") }, function(e, t) { e.exports = require("socket.io") }, function(e, t) { e.exports = require("stream") }, function(e, t) { e.exports = require("util") }, function(e, t) { e.exports = require("uuid-token-generator") }, function(e, t) { e.exports = require("webpack-dev-middleware") }, function(e, t) { e.exports = require("webpack-hot-middleware") }, function(e, t) { e.exports = require("webpack-merge") }, function(e, t) { e.exports = require("winston") }, function(e, t) { e.exports = require("winston-daily-rotate-file") }, function(e, t) { e.exports = require("winston-graylog2") }, function(e, t) { e.exports = require("winston-loggly-bulk") }, function(e, t) { e.exports = require("winston-logsene") }, function(e, t) { e.exports = require("winston-logzio") }, function(e, t) { e.exports = require("winston-papertrail") }, function(e, t, n) { "use strict";
    global.WEBPACK_BUNDLE = !1; var r = n(0),
        o = n(1),
        i = n(16),
        s = n(8);
    o.info(), o.info(s.bold("---------------------[ Server starting at %s ]---------------------------"), i().format("YYYY-MM-DD HH:mm:ss.SSS")), o.info(), o.info(s.bold("Application root path: ") + global.rootPath); var a = (n(51), n(15)()),
        u = n(50)(a);
    n(25);
    n(52), u.listen(r.port, r.ip, function() { o.info(""), o.info(r.app.title + " v" + r.app.version + " application started!"), o.info("----------------------------------------------"), o.info("Environment:\t" + s.underline.bold(process.env.NODE_ENV)), o.info("IP:\t\t" + r.ip), o.info("Port:\t\t" + r.port), o.info("Database:\t\t" + r.db.uri), o.info("Redis:\t\t" + (r.redis.enabled ? r.redis.uri : "Disabled")), o.info(""), n(53)(), o.info("----------------------------------------------"); var e = n(7);
        r.isDevMode && e.printServicesInfo() }), t = e.exports = u }]);