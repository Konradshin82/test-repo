"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./Account.css");
var Account = function (props) {
    return (React.createElement("tr", { key: props.key },
        React.createElement("td", { className: "Address" }, props.address),
        React.createElement("td", { className: "Balance" }, props.balance),
        React.createElement("td", { className: "CreateTime" }, props.createtime),
        React.createElement("td", { className: "OperationTime" }, props.latestoprationtime),
        React.createElement("td", { className: "text-center" },
            React.createElement("button", { onClick: props.clickCreate, className: "btn btn-primary" }, "Add")),
        React.createElement("td", { className: "text-center" },
            React.createElement("button", { onClick: props.clickDelete, className: "btn btn-danger" }, "Delete"))));
};
exports.default = Account;
//# sourceMappingURL=Account.js.map