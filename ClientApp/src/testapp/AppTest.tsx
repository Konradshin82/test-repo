import * as React from 'react';
import axios from 'axios';
import Account from './components/accounts/account/Account';
import Sorter from '../testapp/components/ui/sorters/Sorter';
import Filter from '../testapp/components/ui/filters/Filter';

interface AccountData {
    key: number,
    address: string;
    balance: number;
    createtime: string;
    latestoprationtime: string;
}

class AppTest extends React.Component {

    state = {
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
    }
    
    componentDidMount() {
        this.getAccounts();
    }


    formatDate(dateNumber: any) {
        let date = new Date(dateNumber);
        let month = date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString();
        let day = date.getDay()
        if(day === 0)
          day = 1;
        let dayCorrect = day < 10 ? '0' + day.toString() : day.toString();
        let hour = date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString();
        let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString();
        let formattedDate = date.getFullYear() + "-" + month + "-" + dayCorrect + " " + hour + ":" + minutes;
        return formattedDate;
    }

    getAccounts = () => {
        let dataAccount = [];
        let data: AccountData;

        for(let i = 0; i < this.state.address.length; i++) {
            axios.post("https://api.trongrid.io/wallet/getaccount",
                {
                    address: this.state.address[i],
                    visible: true
                }
            ).then(res => {

                data = {
                    key: i,
                    address: res.data.address,
                    balance: !isNaN(res.data.balance) ? res.data.balance : 0,
                    createtime: this.formatDate(res.data.create_time),
                    latestoprationtime: this.formatDate(res.data.latest_opration_time)
                };

                dataAccount.push(data);
                this.setState({ accounts: dataAccount });
            })
            .catch(err => this.setState({error: err}));
        }
    }

    filterChangedHandler = (event: any, filterPosition: any) => {
        let accountsCopy = [...this.state.accounts];
        switch (filterPosition) {
            case "Address":
                accountsCopy = accountsCopy.filter(el => el.address.includes(event.target.value));
                break;
            case "Balance":
                accountsCopy = accountsCopy.filter(el => el.balance.toString().includes(event.target.value.toString()));
                break;
            case "CreateTime":
                accountsCopy = accountsCopy.filter(el => event.target.value.toString().replace("T", " ").includes(el.createtime));
                break;
            case "LatestOperationTime":
                accountsCopy = accountsCopy.filter(el => event.target.value.toString().replace("T", " ").includes(el.latestoprationtime));
                break;
        }
        
        this.setState({ accounts: accountsCopy });
    }

    deleteAccountHandler = (accountIndexP: any) => {
        const accountIndex = this.state.accounts.findIndex(p => {
            return p.key === accountIndexP;
        });
        const accountCopy = [...this.state.accounts];
        accountCopy.splice(accountIndex, 1);
        const addressCopy = [...this.state.address];
        addressCopy.splice(accountIndexP, 1);
        this.setState({ accounts: accountCopy, address: addressCopy});
    }

    createAccountHandler = (accountIndexP: any) => {
        
        const accountIndex = this.state.accounts.findIndex(p => {
            return p.key === accountIndexP;
        });
        const account = this.state.accounts[accountIndex];
        const addressKey = account.address;
        console.log('addressKey', addressKey);

        let res = axios.post("https://api.trongrid.io/wallet/validateaddress",
            {
                address: addressKey
            }
        ).then(res => {
            const resultAddress = { result: res.data.result };
            this.setState({ result: resultAddress });
            if (this.state.result) {
                axios.post("https://api.trongrid.io/wallet/getaccount",
                    {
                        address: addressKey,
                        visible: true
                    }
                ).then(res => {
                    const data = {
                        key: this.state.accounts.length + 1,
                        address: res.data.address,
                        balance: !isNaN(res.data.balance) ? res.data.balance : 0,
                        createtime: this.formatDate(res.data.create_time),
                        latestoprationtime: this.formatDate(res.data.latest_opration_time)
                    };

                    const accountCopy = [...this.state.accounts];
                    accountCopy.push(data);
                    const addressCopy = [...this.state.address];
                    addressCopy.push(addressKey);
                    this.setState({ accounts: accountCopy, address: addressCopy});
                })
                .catch(err => this.setState({ error: err }));
            }
        })
        .catch(err => this.setState({ error: err }));
    }

    compareStr = (a: any, b: any) => a === b ? 0 : a > b ? 1 : -1;

    sorterAccountHandler = (sorterPosition: any) => {
        let accountsCopy = [...this.state.accounts];
        switch (sorterPosition) {
            case "Address":
                accountsCopy = this.state.ascdescSorter === false ?
                    accountsCopy.sort((a, b) => this.compareStr(a.address, b.address)) : 
                    accountsCopy.sort((a, b) => this.compareStr(b.address, a.address));
                break;
            case "Balance":
                accountsCopy = this.state.ascdescSorter === false ?
                    accountsCopy.sort((a, b) => a.balance - b.balance) :
                    accountsCopy.sort((a, b) => b.balance - a.balance);
                break;
            case "CreateTime":
                accountsCopy = this.state.ascdescSorter === false ?
                    accountsCopy.sort((a, b) => Date.parse(a.createtime) - Date.parse(b.createtime)) :
                    accountsCopy.sort((a, b) => Date.parse(b.createtime) - Date.parse(a.createtime));
                break;
            case "LatestOperationTime":
                accountsCopy = this.state.ascdescSorter === false ?
                    accountsCopy.sort((a, b) => Date.parse(a.latestoprationtime) - Date.parse(b.latestoprationtime)) :
                    accountsCopy.sort((a, b) => Date.parse(b.latestoprationtime) - Date.parse(a.latestoprationtime));
                break;
        }

        let change = ((this.state.sorterPosition === "") || (this.state.sorterPosition === sorterPosition.toString())) ? !this.state.ascdescSorter : this.state.ascdescSorter;
        this.setState({ accounts: accountsCopy, sorterPosition: sorterPosition, ascdescSorter: change});
    }

    public render() {
        
        const accounts = this.state.accounts.map((account, index) => {
            return <Account
                key={account.key}
                address={account.address}
                balance={account.balance}
                createtime={account.createtime}
                latestoprationtime={account.latestoprationtime}
                clickDelete={this.deleteAccountHandler.bind(this, account.key)}
                clickCreate={this.createAccountHandler.bind(this, account.key)}
            />;
        });

        return (
            <table className='table table-bordered' aria-labelledby="tabelLabel">
                <thead>
                    <Filter changed={this.filterChangedHandler}
                        clickGetAccounts={this.getAccounts}/>
                    <Sorter address={"Address"}
                        balance={"Balance"}
                        createtime={"CreateTime"}
                        latestoperationtime={"LatestOperationTime"}
                        click={this.sorterAccountHandler}
                    />
                </thead>
                <tbody>
                     {accounts}
                </tbody>
            </table>
        );
    }
}

export default AppTest;