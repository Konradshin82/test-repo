"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var axios_1 = require("axios");
var Account_1 = require("./components/accounts/account/Account");
var Sorter_1 = require("../testapp/components/ui/sorters/Sorter");
var Filter_1 = require("../testapp/components/ui/filters/Filter");
var AppTest = /** @class */ (function (_super) {
    __extends(AppTest, _super);
    function AppTest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            accounts: [],
            sorterPosition: "",
            ascdescSorter: true,
            address: [
                "TGmcz6UMqeTUoNryw4LcPeTWmo1DWrxRUK",
                "TSFKJsiJrt6bUTmxS1F1Fmv6UUYdGVB9Ws",
                "TN1nWMYqhnqrBXPMH1ECYouVaafRkYxhNb",
                "TCFQhzJgXJnn56sqJV38H8c5YAwELZugvz",
                "TUv34RrPNY2qTNHZ9q4mLc9AuUu9Tpy3Jg"
            ],
            result: false,
            error: ""
        };
        _this.getAccounts = function () {
            var dataAccount = [];
            var data;
            var _loop_1 = function (i) {
                axios_1.default.post("https://api.trongrid.io/wallet/getaccount", {
                    address: _this.state.address[i],
                    visible: true
                }).then(function (res) {
                    data = {
                        key: i,
                        address: res.data.address,
                        balance: !isNaN(res.data.balance) ? res.data.balance : 0,
                        createtime: _this.formatDate(res.data.create_time),
                        latestoprationtime: _this.formatDate(res.data.latest_opration_time)
                    };
                    dataAccount.push(data);
                    _this.setState({ accounts: dataAccount });
                })
                    .catch(function (err) { return _this.setState({ error: err }); });
            };
            for (var i = 0; i < _this.state.address.length; i++) {
                _loop_1(i);
            }
        };
        _this.filterChangedHandler = function (event, filterPosition) {
            var accountsCopy = __spreadArrays(_this.state.accounts);
            switch (filterPosition) {
                case "Address":
                    accountsCopy = accountsCopy.filter(function (el) { return el.address.includes(event.target.value); });
                    break;
                case "Balance":
                    accountsCopy = accountsCopy.filter(function (el) { return el.balance.toString().includes(event.target.value.toString()); });
                    break;
                case "CreateTime":
                    accountsCopy = accountsCopy.filter(function (el) { return event.target.value.toString().replace("T", " ").includes(el.createtime); });
                    break;
                case "LatestOperationTime":
                    accountsCopy = accountsCopy.filter(function (el) { return event.target.value.toString().replace("T", " ").includes(el.latestoprationtime); });
                    break;
            }
            _this.setState({ accounts: accountsCopy });
        };
        _this.deleteAccountHandler = function (accountIndexP) {
            var accountIndex = _this.state.accounts.findIndex(function (p) {
                return p.key === accountIndexP;
            });
            var accountCopy = __spreadArrays(_this.state.accounts);
            accountCopy.splice(accountIndex, 1);
            var addressCopy = __spreadArrays(_this.state.address);
            addressCopy.splice(accountIndexP, 1);
            _this.setState({ accounts: accountCopy, address: addressCopy });
        };
        _this.createAccountHandler = function (accountIndexP) {
            var accountIndex = _this.state.accounts.findIndex(function (p) {
                return p.key === accountIndexP;
            });
            var account = _this.state.accounts[accountIndex];
            var addressKey = account.address;
            console.log('addressKey', addressKey);
            var res = axios_1.default.post("https://api.trongrid.io/wallet/validateaddress", {
                address: addressKey
            }).then(function (res) {
                var resultAddress = { result: res.data.result };
                _this.setState({ result: resultAddress });
                if (_this.state.result) {
                    axios_1.default.post("https://api.trongrid.io/wallet/getaccount", {
                        address: addressKey,
                        visible: true
                    }).then(function (res) {
                        var data = {
                            key: _this.state.accounts.length + 1,
                            address: res.data.address,
                            balance: !isNaN(res.data.balance) ? res.data.balance : 0,
                            createtime: _this.formatDate(res.data.create_time),
                            latestoprationtime: _this.formatDate(res.data.latest_opration_time)
                        };
                        var accountCopy = __spreadArrays(_this.state.accounts);
                        accountCopy.push(data);
                        var addressCopy = __spreadArrays(_this.state.address);
                        addressCopy.push(addressKey);
                        _this.setState({ accounts: accountCopy, address: addressCopy });
                    })
                        .catch(function (err) { return _this.setState({ error: err }); });
                }
            })
                .catch(function (err) { return _this.setState({ error: err }); });
        };
        _this.compareStr = function (a, b) { return a === b ? 0 : a > b ? 1 : -1; };
        _this.sorterAccountHandler = function (sorterPosition) {
            var accountsCopy = __spreadArrays(_this.state.accounts);
            switch (sorterPosition) {
                case "Address":
                    accountsCopy = _this.state.ascdescSorter === false ?
                        accountsCopy.sort(function (a, b) { return _this.compareStr(a.address, b.address); }) :
                        accountsCopy.sort(function (a, b) { return _this.compareStr(b.address, a.address); });
                    break;
                case "Balance":
                    accountsCopy = _this.state.ascdescSorter === false ?
                        accountsCopy.sort(function (a, b) { return a.balance - b.balance; }) :
                        accountsCopy.sort(function (a, b) { return b.balance - a.balance; });
                    break;
                case "CreateTime":
                    accountsCopy = _this.state.ascdescSorter === false ?
                        accountsCopy.sort(function (a, b) { return Date.parse(a.createtime) - Date.parse(b.createtime); }) :
                        accountsCopy.sort(function (a, b) { return Date.parse(b.createtime) - Date.parse(a.createtime); });
                    break;
                case "LatestOperationTime":
                    accountsCopy = _this.state.ascdescSorter === false ?
                        accountsCopy.sort(function (a, b) { return Date.parse(a.latestoprationtime) - Date.parse(b.latestoprationtime); }) :
                        accountsCopy.sort(function (a, b) { return Date.parse(b.latestoprationtime) - Date.parse(a.latestoprationtime); });
                    break;
            }
            var change = ((_this.state.sorterPosition === "") || (_this.state.sorterPosition === sorterPosition.toString())) ? !_this.state.ascdescSorter : _this.state.ascdescSorter;
            _this.setState({ accounts: accountsCopy, sorterPosition: sorterPosition, ascdescSorter: change });
        };
        return _this;
    }
    AppTest.prototype.componentDidMount = function () {
        this.getAccounts();
    };
    AppTest.prototype.formatDate = function (dateNumber) {
        var date = new Date(dateNumber);
        var month = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString();
        var day = date.getDay();
        if (day === 0)
            day = 1;
        var dayCorrect = day < 10 ? '0' + day.toString() : day.toString();
        var hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
        var formattedDate = date.getFullYear() + "-" + month + "-" + dayCorrect + " " + hour + ":" + minutes;
        return formattedDate;
    };
    AppTest.prototype.render = function () {
        var _this = this;
        var accounts = this.state.accounts.map(function (account, index) {
            return React.createElement(Account_1.default, { key: account.key, address: account.address, balance: account.balance, createtime: account.createtime, latestoprationtime: account.latestoprationtime, clickDelete: _this.deleteAccountHandler.bind(_this, account.key), clickCreate: _this.createAccountHandler.bind(_this, account.key) });
        });
        return (React.createElement("table", { className: 'table table-bordered', "aria-labelledby": "tabelLabel" },
            React.createElement("thead", null,
                React.createElement(Filter_1.default, { changed: this.filterChangedHandler, clickGetAccounts: this.getAccounts }),
                React.createElement(Sorter_1.default, { address: "Address", balance: "Balance", createtime: "CreateTime", latestoperationtime: "LatestOperationTime", click: this.sorterAccountHandler })),
            React.createElement("tbody", null, accounts)));
    };
    return AppTest;
}(React.Component));
exports.default = AppTest;
//# sourceMappingURL=AppTest.js.map