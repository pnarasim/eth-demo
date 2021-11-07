import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";
import Money from "../build/contracts/Money.json";
import Tickets from "../build/contracts/Tickets.json";
import Market from "../build/contracts/Market.json";

import { Card, Form, Image, Item, Input, Button, Message, Header, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link, Router } from "../routes";


class TicketsDetails extends Component {

        state = {
            my_account: '',
            money_balance: '',
            tickets_balance: '',
            errMessage: '',
            loading: false,
            tickets_to_buy: ''
        }

        static async getInitialProps() {
                // My metamask accounts[0] which deployed these contracts to the rinkeby network
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
                console.log(" All ticket holders = ", accounts_interacted);
                //console.log(" market = ", market_address);
                //console.log(" money = ", money_address);
                //console.log(" tickets = ", tickets_address);
                const tickets_available = await tickets.methods.balanceOf(tickets_admin,0).call();
                const currency_name = await money.methods.name().call();
                const money_balance = await money.methods.balanceOf(tickets_admin).call();
                console.log(" ADMIN account = ", tickets_admin, " His MNY = ", money_balance, " Tickets = ", tickets_available);
                return { market_address, money_address, tickets_address, accounts_interacted};
        }

        
        showMyBalance() {
            //event.preventDefault();
            const { market_address, money_address, tickets_address, accounts_interacted } = this.props;
            try {
                
                let item;
                console.log(" Account details for ", accounts_interacted);
                const items = accounts_interacted.map(
                        address => {
                            return {
                                header: address,
                                description: (
                                    <Link route={ `/details/${address}` }>
                                        <a> View Details </a>
                                    </Link>
                                ),
                                fluid: true
                            }
                        }
                    );
                console.log(items);
                return <Card.Group items={items}/>
            } catch (err) {
                this.setState({errMessage:err.message});
                console.log("Oops : ", err.message);
            }
        }

    

        render() {
                return (
                <Layout>
                    {this.showMyBalance()} 
                </Layout> );
        }
}

export default TicketsDetails;

