   import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";

import Money from "../build/contracts/Money.json";
import Tickets from "../build/contracts/Tickets.json";
import Market from "../build/contracts/Market.json";

import { Item } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";

class ShowDetails extends Component {

	static async getInitialProps(props) {
		const { address } = props.query;

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

        console.log("Showing data for ", address);
        const my_mny_bal = await money.methods.balanceOf(address).call();
        const my_ticket_bal = await tickets.methods.balanceOf(address, 0).call();
        console.log("My MNY = ", my_mny_bal, " and my tickets = ", my_ticket_bal);

        return {address, my_mny_bal, my_ticket_bal};
	}

    renderDetails() {
        const { address, my_mny_bal, my_ticket_bal } = this.props;
        return ( 
            <Item>
                <Item.Header> Account : {this.props.address} </Item.Header>
                <Item.Description> Tickets Owned : {this.props.my_ticket_bal} </Item.Description>
                <Item.Extra> ERC20 Balance: {this.props.my_mny_bal} MNY </Item.Extra>
            </Item>
        );
    }

	render() {
            return (
                <Layout>
                    {this.renderDetails()} 
                </Layout> );
        }
}

export default ShowDetails;