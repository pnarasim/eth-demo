import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";
import Money from "../build/contracts/Money.json";
import Tickets from "../build/contracts/Tickets.json";
import Market from "../build/contracts/Market.json";

import { Card, Message, Form, Button, Input, Divider } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link, Router } from "../routes";


class TicketSales extends Component {
    state = {
        trade_num: 0,
        num_tickets: 1,
        ticket_price: 1,
        errMessage: '',
        loading: false
    }

        static async getInitialProps() {
            // My metmask accounts[0] which deployed these contracts to rinkeby from truffle
            const tickets_admin = "0x2b1a497b540a7EA4c7E0a108072591838106caEe"; 
            const market_address = market._address;
            const tickets_address =  await market.methods.itemToken().call();
            const tickets = new web3.eth.Contract(
                                JSON.parse(JSON.stringify(Tickets.abi)),
                                tickets_address
                            );     
            const money_address =  await market.methods.currencyToken().call();
            const money = new web3.eth.Contract(
                            JSON.parse(JSON.stringify(Money.abi)),
                            money_address
                        );    
            let accounts_interacted = [tickets_admin, market_address];
            let num_buyers = await market.methods.num_buyers().call();
            //console.log(" Num buyers = ", num_buyers);
            let next_buyer;
            for (var i =0; i< parseInt(num_buyers); i++) {
                next_buyer = await market.methods.buyers(i).call();
                accounts_interacted.push(next_buyer);
            }
            //console.log(" All ticket holders = ", accounts_interacted);
            const num_trades = await market.methods.tradeCounter().call();
            //console.log(" number of trades available are ", num_trades);
            let trades = [];
            let trade;
            for (var i=0; i< parseInt(num_trades); i++) {
                trade = await market.methods.getTrade(i).call();
                trades.push(trade);
            }
            console.log(" Trades are ", trades);
            const ticket_price = await tickets.methods.PRICE().call();
            console.log(" Tickets were set to price ", ticket_price, " in the NFT1153 contract");
            return { market_address, money_address, tickets_address, accounts_interacted, num_trades, trades, ticket_price};
        }

        sellTickets = async (event) => {
            event.preventDefault();
            var assert = require('assert');
            this.setState({loading: true, errMessage:''});
            console.log("Putting tickets on sale");
            try {
                const { market_address, money_address, tickets_address, ticket_price } = this.props;
                this.setState({ticket_price});
                const tickets = new web3.eth.Contract(
                                        JSON.parse(JSON.stringify(Tickets.abi)),
                                        tickets_address
                                    );   
                const money = new web3.eth.Contract(
                                    JSON.parse(JSON.stringify(Money.abi)),
                                    money_address
                                );    
                const accounts = await web3.eth.getAccounts();
                const my_account = accounts[0];
                console.log(" my account = ", my_account);
                //this.setState({my_account});
                const money_balance = await money.methods.balanceOf(my_account).call();
                //this.setState({money_balance});
                console.log(" My MNY balance = ", money_balance);
                const tickets_available = parseInt(await tickets.methods.balanceOf(my_account, 0).call());
                //this.setState({tickets_balance});
                console.log(" My available tickets = ", tickets_available);
                console.log(" Want to sell = ", this.state.num_tickets);
                if (parseInt(this.state.num_tickets) >  tickets_available) {
                    this.setState({ errMessage: "Not so many tickets"});
                    assert.fail("You dont have that many tickets to sell");
                }
                require(this.state.ticket_price <= ticket_price);
                let res2 = await tickets.methods.setApprovalForAll(market_address, true).send({from: my_account});
                console.log("approved market place, ", market_address, " for receiving all trades");

                const res = await market.methods.openTrade(0, this.state.num_tickets, this.state.ticket_price).send({from: my_account});
                console.log("Opened trade for", tickets_available, " of item 0 at price ", ticket_price);
                Router.pushRoute(`/details/${my_account}`);
                //let poster, item, amount, price, status, result;
                //result = await market.getTrade(0).send({from: accounts[0]});
                //console.log(" Got trade -", result[0], result[1], result[2], result[3], result[4].toString());    
            } catch (err) {
                this.setState({errMessage:err.message});
                console.log("Oops : ", err.message);
            }
            this.setState({loading: false});
        }

        
        showMarketTrades() {
            let { market_address, money_address, tickets_address, accounts_interacted, num_trades, trades} = this.props;
            console.log("Trades are ", trades);
            //this.setState({errMessage:''});
            try {
                const open_trades = trades.filter(trade => web3.utils.toAscii(trade[4]) !== "Open").map(trade => trade);
                console.log("Open trades are = ", open_trades);
                const items = open_trades.map(
                        (trade,index) => {
                            return {
                                header: `${trade[2]} tickets for Sale`,
                                meta: `From Seller ${trade[0]}`,
                                extra: `Sale Status = ${web3.utils.toAscii(trade[4])}`,
                                description: <Link route={`/buytickets/${index}`}><a>Buy tickets</a></Link>,
                                fluid: true
                            }
                        });
                console.log(items);
                return <Card.Group items={items}/>
            } catch (err) {
                //this.setState({errMessage:err.message});
                console.log("Oops : ", err.message);
            }
            //this.setState({errMessage:'', loading:false});
        }

        render() {
                return (
                <Layout>
                        <h2> Available Tickets </h2>
                        {this.showMarketTrades()} 
                        <Divider horizontal>Or</Divider>
                        <Form error={!!this.state.errMessage}>
                            <Form.Group widths="equal">
                                <Form.Field>
                                    <Input 
                                        placeholder='1' 
                                        labelPosition='top'
                                        label="Number of Tickets to Sell" 
                                        value={this.state.num_tickets}
                                        onChange={ event => this.setState( {num_tickets: event.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Input 
                                        placeholder='1' 
                                        labelPosition='top'
                                        label="Price to Sell at" 
                                        value={this.state.ticket_price}
                                        onChange={ event => this.setState( {ticket_price: event.target.value })}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Button primary attached='top' loading={this.state.loading} onClick={event => this.sellTickets(event)}> 
                                    Sell Tickets
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

export default TicketSales;

