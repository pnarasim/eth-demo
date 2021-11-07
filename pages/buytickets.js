import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";

import Money from "../build/contracts/Money.json";
import Tickets from "../build/contracts/Tickets.json";
import Market from "../build/contracts/Market.json";

import { Input, Item, Button, Message, Form } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link, Router } from "../routes";


class BuyTickets extends Component {
    state = {
            num_tickets: 1,
            address: '',
            errMessage:'',
            loading: false
        }

	static async getInitialProps(props) {
		const trade_index  = props.query.index;
        console.log(" trade_index = ", trade_index);
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

        return {market_address, money_address, tickets_address, trade_index};
	}

    buyTickets = async (event) => {
        event.preventDefault();
        this.setState({errMessage:'', loading:true});
        try {
            const { market_address, money_address, tickets_address, trade_index} = this.props;
            this.setState({loading: true, errMessage:''});
            let amount_to_buy = this.state.num_tickets; 
            console.log("Will buy tickets = ", amount_to_buy, " from trade at index ", trade_index);

            const tickets = new web3.eth.Contract(
                                    JSON.parse(JSON.stringify(Tickets.abi)),
                                    tickets_address
                                );   
            const money = new web3.eth.Contract(
                                JSON.parse(JSON.stringify(Money.abi)),
                                money_address
                            );
            window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            const address = accounts[0];
            console.log("Address = ", address);
            // const money_balance = await money.methods.balanceOf(address).call();
            // console.log(" Before : My MNY balance = ", money_balance);
            // const tickets_owned = await tickets.methods.balanceOf(address, 0).call();
            // console.log(" Tickets owned  = ", tickets_owned);
            let poster, item, amount, price, status, result;
            result = await market.methods.getTrade(trade_index).call();
            console.log("Got a trade at index  ", trade_index, " = ", result);
            poster = result[0];
            item = result[1];
            amount = result[2];
            price = result[3];
            status = result[4];
            console.log(" Got trade -", result[0], result[1], result[2], result[3], web3.utils.toAscii(result[4])); 
            const newnftbal1 = await tickets.methods.balanceOf(address,0).call();
            const newnftbal0 = await tickets.methods.balanceOf(market_address,0).call();
            console.log("Buyer = ", address, " Market = ", market_address, " Poster = ", poster);
            console.log("Before: tickets held by market and buyer = ", newnftbal0, newnftbal1);
            const newbal1 = await money.methods.balanceOf(address).call();
            const newbal0 = await money.methods.balanceOf(poster).call();
            console.log("Before: mny balance of poster and buyer = ", newbal0, newbal1);
              
            await money.methods.increaseAllowance(market_address, 1000).send({from: address});
            await market.methods.executeTrade(trade_index, amount_to_buy).send({from: address});
            console.log(" executed trade by ", address);
            newnftbal1 = await tickets.methods.balanceOf(address,0).call();
            newnftbal0 = await tickets.methods.balanceOf(poster,0).call();
            console.log("now tickets held by buyer and poster= ", newnftbal0, newnftbal1);
            newbal1 = await money.methods.balanceOf(address).call();
            newbal0 = await money.methods.balanceOf(poster).call();
            console.log(" mny balance of poster  = ", newbal0);
            Router.pushRoute(`/details/${address}`); 
        } catch (err) {
            this.setState({errMessage:err.message});
            console.log("Oops : ", err.message);
        }   
        this.setState({loading: false});    
    }

	render() {
            return (
                <Layout>
                    <Form error={!!this.state.errMessage} >
                        <Input 
                            placeholder='100' 
                            labelPosition='right' 
                            value={this.state.num_tickets}
                            onChange={ event => this.setState( {num_tickets: event.target.value })}
                        />
                        <Button primary loading={this.state.loading} onClick={this.buyTickets}> 
                            Get me Tickets!
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

export default BuyTickets;