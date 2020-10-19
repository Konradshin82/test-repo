"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Sorter = function (props) {
    return (React.createElement("tr", null,
        React.createElement("th", { className: "text-center" },
            React.createElement("button", { className: "btn btn-link", onClick: function () { props.click(props.address); } }, props.address)),
        React.createElement("th", { className: "text-center" },
            React.createElement("button", { className: "btn btn-link", onClick: function () { props.click(props.balance); } }, props.balance)),
        React.createElement("th", { className: "text-center" },
            React.createElement("button", { className: "btn btn-link", onClick: function () { props.click(props.createtime); } }, props.createtime)),
        React.createElement("th", { className: "text-center" },
            React.createElement("button", { className: "btn btn-link", onClick: function () { props.click(props.latestoperationtime); } }, props.latestoperationtime)),
        React.createElement("th", { className: "text-center" }, "Sorter"),
        React.createElement("th", { className: "text-center" }, "Action")));
};
exports.default = Sorter;
//# sourceMappingURL=Sorter.js.map