"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./Filter.css");
var Filter = function (props) {
    return (React.createElement("tr", null,
        React.createElement("th", null,
            React.createElement("input", { className: "Address", type: "search", onChange: function (event) { props.changed(event, "Address"); }, id: "address", name: "address" })),
        React.createElement("th", null,
            React.createElement("input", { type: "number", onChange: function (event) { props.changed(event, "Balance"); }, name: "balance", id: "balance", min: "0", max: "99999999999999999999", step: "2" })),
        React.createElement("th", null,
            React.createElement("input", { type: "datetime-local", onChange: function (event) { props.changed(event, "CreateTime"); }, name: "createtime", id: "createtime", min: "1982-06-07T00:00", max: "2040-06-14T00:00" })),
        React.createElement("th", null,
            React.createElement("input", { type: "datetime-local", onChange: function (event) { props.changed(event, "LatestOperationTime"); }, name: "latestoperationtime", id: "latestoperationtime", min: "1982-06-07T00:00", max: "2040-06-14T00:00" })),
        React.createElement("th", { className: "text-center" }, "Filter"),
        React.createElement("th", null,
            React.createElement("button", { onClick: function () { props.clickGetAccounts(); }, className: "btn btn-primary" }, "GetAccounts"))));
};
exports.default = Filter;
//# sourceMappingURL=Filter.js.map