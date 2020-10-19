"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var AppTest_1 = require("./testapp/AppTest");
require("./custom.css");
exports.default = (function () { return (React.createElement(Layout_1.default, null,
    React.createElement(react_router_1.Route, { path: '/', component: AppTest_1.default }))); });
//# sourceMappingURL=App.js.map