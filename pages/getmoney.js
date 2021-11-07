import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";
import Money from "../build/contracts/Money.json";

import Market from "../build/contracts/Market.json";

import { Input, Button, Message, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link, Router } from "../routes";


class GetMoney extends Component {
        state = {
            money_needed: '100',
            address: '',
            errMessage: '',
            loading: false
        }

        static async getInitialProps() {
                
                const market_address = market._address;
                const money_address =  await market.methods.currencyToken().call();
                const money = new web3.eth.Contract(
                                JSON.parse(JSON.stringify(Money.abi)),
                                money_address
                            );
                
                console.log(" mkt, money = ", market_address, money_address  );
                return { market_address, money_address };
        }

        getSomeMoney = async (event) => {
            event.preventDefault();
            this.setState({loading: true, errMessage: ''});
            try {
                const { market_address, money_address } = this.props;
                window.ethereum.enable();
                const accounts = await web3.eth.getAccounts();
                const address = accounts[0];
                this.setState({address});
                console.log(" address getting money = ", this.state.address);
                const money = new web3.eth.Contract(
                                    JSON.parse(JSON.stringify(Money.abi)),
                                    money_address
                                );    
                
                const money_balance = await money.methods.balanceOf(this.state.address).call();
                console.log(" My MNY balance = ", money_balance);
                let res = await money.methods.mintSome(web3.utils.toWei(this.state.money_needed, "ether")).send({from: this.state.address});
                const new_balance = await money.methods.balanceOf(this.state.address).call();
                console.log(" My new MNY balance = ", new_balance);
                Router.pushRoute(`/details/${this.state.address}`); 
            } catch (err) {
                this.setState({errMessage: err.message});
                console.log("Ooops : ", err.message);
            }
            this.setState({loading: false});
        }

        render() {

                let address = this.state.address;
                return (
                <Layout>
                    <Form error={!!this.state.errMessage} >
                        <Input 
                            placeholder='100' 
                            labelPosition='right' 
                            value={this.state.money_needed}
                            onChange={ event => this.setState( {money_needed: event.target.value })}
                        />
                        <Button primary loading={this.state.loading} onClick={this.getSomeMoney}> 
                            Get me MNY
                        </Button>
                        <Message
                            error
                            header="Ooops"
                            content={this.state.errMessage}
                        />
                    </Form>
                </Layout> );
        }
}

export default GetMoney;
