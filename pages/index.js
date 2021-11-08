import React, { Component } from "react";
import web3 from "../ethereum/web3";
import market from "../ethereum/market";
import Money from "../build/contracts/Money.json";
import Tickets from "../build/contracts/Tickets.json";
import Market from "../build/contracts/Market.json";

import { Card, Message} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import Layout from "../components/Layout";
import { Link } from "../routes";


class TicketsHome extends Component {

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
                let itemOwnersCount = await market.methods.itemOwnersCount().call();
                console.log(" Number of ticket owners = ", itemOwnersCount);

                //console.log(" market = ", market_address);
                //console.log(" money = ", money_address);
                //console.log(" tickets = ", tickets_address);
                const tickets_available = await tickets.methods.balanceOf(tickets_admin,0).call();
                const currency_name = await money.methods.name().call();
                const money_balance = await money.methods.balanceOf(tickets_admin).call();
                console.log(" ADMIN account = ", tickets_admin, " His MNY = ", money_balance, " Tickets = ", tickets_available);
                return { market_address, money_address, tickets_address };
        }

        
        showSummary()  {
            const { market_address, money_address, tickets_address } = this.props;
            //this.setState({errMessage:'', loading: true});
            try {
                const tickets = new web3.eth.Contract(
                                        JSON.parse(JSON.stringify(Tickets.abi)),
                                        tickets_address
                                    );   
                const money = new web3.eth.Contract(
                                    JSON.parse(JSON.stringify(Money.abi)),
                                    money_address
                                );    
                
                const items = [
                    {
                        header: "Marketplace has been deployed ",
                        meta: market_address,
                        description: 'The marketplace contains the links to the NFT tickets and the ERC20 currency MNY',
                        style: { overflowWrap: 'break-word' }
                    },
                    {
                        header: "NFT tickets (1000) deployed",
                        meta: tickets_address,
                        description: 'The contract address of the ERC 1153 contract containing the 1000 tickets deployed',
                        style: { overflowWrap: 'break-word' }
                    }, 
                    {
                        header: "ERC20 currency MNY deployed",
                        meta: money_address,
                        description: 'The contract address of the ERC20 currency MNY',
                        style: { overflowWrap: 'break-word' }
                    }
                ];
                console.log(items);
                return <Card.Group items={items}/>
            } catch (err) {
                //this.setState({errMessage:err.message});
                console.log("Oops : ", err.message);
            } 
        }

        render() {
                return (
                <Layout>
                    {this.showSummary()}
                </Layout> );
        }
}

export default TicketsHome;

