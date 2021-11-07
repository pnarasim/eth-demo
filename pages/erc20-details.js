// sellTickets = async (event) => {
        //     event.preventDefault();
        //     this.setState({loading: true, errMessage:''});
        //     try {
        //         const { market_address, money_address, tickets_address } = this.props;
        //         //const {tickets, money } = this.getContracts();
                
        //         const tickets = new web3.eth.Contract(
        //                                 JSON.parse(JSON.stringify(Tickets.abi)),
        //                                 tickets_address
        //                             );   
        //         const money = new web3.eth.Contract(
        //                             JSON.parse(JSON.stringify(Money.abi)),
        //                             money_address
        //                         );    
        //         //this.setState({market_address, money_address, tickets_address})
        //         const accounts = await web3.eth.getAccounts();
        //         const my_account = accounts[0];
        //         console.log(" my account = ", my_account);
        //         //this.setState({my_account});
        //         const money_balance = await money.methods.balanceOf(my_account).call();
        //         //this.setState({money_balance});
        //         console.log(" My MNY balance = ", money_balance);
        //         const tickets_available = await tickets.methods.balanceOf(my_account, 0).call();
        //         //this.setState({tickets_balance});
        //         console.log(" My available tickets = ", tickets_available);
        //         let res2 = await tickets.methods.setApprovalForAll(market_address, true).send({from: my_account});
        //         console.log("approved market place, ", market_address, " for receiving all trades");

        //         const res = await market.methods.openTrade(0, 10, 10).send({from: my_account});
        //         console.log("Opened trade for 10 of item 0 at price ", 10);
        //         //let poster, item, amount, price, status, result;
        //         //result = await market.getTrade(0).send({from: accounts[0]});
        //         //console.log(" Got trade -", result[0], result[1], result[2], result[3], result[4].toString());    
        //     } catch (err) {
        //         this.setState({errMessage:err.message});
        //         console.log("Oops : ", err.message);
        //     }
        //     this.setState({loading: false});
        // }

        // buyTickets = async (event) => {
        //     event.preventDefault();
        //     try {
        //         this.setState({loading: true, errMessage:''});
        //         let amount_to_buy = event.target.value; 
        //         const { market_address, money_address, tickets_address } = this.props;
        //         const tickets = new web3.eth.Contract(
        //                                 JSON.parse(JSON.stringify(Tickets.abi)),
        //                                 tickets_address
        //                             );   
        //         const money = new web3.eth.Contract(
        //                             JSON.parse(JSON.stringify(Money.abi)),
        //                             money_address
        //                         );    
        //         const accounts = await web3.eth.getAccounts();
        //         const my_account = accounts[0];
        //         console.log(" My account = ", my_account);
        //         const money_balance = await money.methods.balanceOf(my_account).call();
        //         console.log(" My MNY balance = ", money_balance);
        //         const tickets_available = await tickets.methods.balanceOf(my_account, 0).call();
        //         console.log(" My available tickets = ", tickets_available);
        //         // let poster, item, amount, price, status, result;
        //         // result = await market.methods.getTrade(0).send({from: accounts[0]});
        //         // console.log("Got a trade at index 0 ", result);
        //         // poster = result[0];
        //         // item = result[1];
        //         // amount = result[2];
        //         // price = result[3];
        //         // status = result[4];
        //         // console.log(" Got trade -", result[0], result[1], result[2], result[3], result[4]);    
        //         // await money.methods.increaseAllowance(market_address, 1000).send({from: my_account});
        //         await market.methods.executeTrade(0, amount_to_buy).send({from: my_account});
        //         accounts_interacted.push(my_account);
        //         console.log(" executed trade by accounts[1]");
        //         const newnftbal1 = await tickets.methods.balanceOf(my_account,0).call();
        //         const newnftbal0 = await tickets.methods.balanceOf(poster,0).call();
        //         console.log("now tickets held by accounts[0] and 1 = ", newnftbal0.toNumber(), newnftbal1.toNumber());
        //         const newbal1 = await money.methods.balanceOf(my_account).call();
        //         //const newbal0 = await money.methods.balanceOf(poster).call();
        //         console.log(" accounts 0 = ", newbal0.toString());
        //     } catch (err) {
        //         this.setState({errMessage:err.message});
        //         console.log("Oops : ", err.message);
        //     }   
        //     this.setState({loading: false});    
        // }


 // mny_bal = await money.methods.balanceOf(accounts).call();
            // tickets_owned = await tickets.methods.balanceOf(accounts,0).call();
            // console.log(index, accounts, mny_bal, tickets_owned);
            

            // const my_account = accounts[0];
            // console.log("Showing data for ", my_account);
            // const my_mny_bal = await money.methods.balanceOf(my_account).call();
            // const my_ticket_bal = await tickets.methods.balanceOf(my_account, 0).call();
            // console.log("My MNY = ", my_mny_bal, " and my tickets = ", my_ticket_bal);
           

                 // getSomeMoney = async (event) => {
        //     event.preventDefault();
        //     const { market_address, money_address, tickets_address } = this.props;
        //     const tickets = new web3.eth.Contract(
        //                             JSON.parse(JSON.stringify(Tickets.abi)),
        //                             tickets_address
        //                         );   
        //     const money = new web3.eth.Contract(
        //                         JSON.parse(JSON.stringify(Money.abi)),
        //                         money_address
        //                     );    
        //     const accounts = await web3.eth.getAccounts();
        //     const my_account = accounts[0];
        //     console.log(" My account = ", my_account);
        //     const money_balance = await money.methods.balanceOf(my_account).call();
        //     console.log(" My MNY balance = ", money_balance);
        //     let res = await money.methods.mintSome(my_account).send({from: my_account});
        //     const new_balance = await money.methods.balanceOf(my_account).call();
        //     console.log(" My new MNY balance = ", new_balance);
        //     return <div> {my_account}  {money_balance} { new_balance} </div> 
        // }



// <div> 
//         <h2> Welcome to the Marketplace! Buy your tickets here </h2>
//         Market at {this.props.market_address} 
//         <Segment placeholder>
//            {this.showMyBalance}
//         </Segment>
//         <Segment placeholder> 
//             <Header icon>
//                 <Icon name='ticket' />
//                 {this.props.tickets_available} Tickets available for Sale for {this.props.event_name}
//             </Header>
//             <Button primary onClick={this.sellTickets}> Sell tickets </Button>
//             <Button primary onClick={this.buyTickets}> Buy tickets </Button>
            
//         </Segment>
//         <Segment placeholder> 
//             <Header icon>
//                 <Icon name='money' />
//                 Get some {this.props.currency_name} money to buy these tickets 
//             </Header>
//             <Button primary onClick={this.getSomeMoney}> Get money!</Button>
//         </Segment>
// </div>
// /*
// //await window.ethereum.enable();
//                 let accounts = web3.eth.accounts;
//                 console.log("Address of account0 is ", accounts[0]);
//                 const my_balance = await tickets.methods.balanceOf(accounts[0], 0).call();
//                 console.log("My balance is ", my_balance);

//                 const uri = await tickets.methods.uri(0).call();
//                 console.log("URI of 0 is ", uri);

//                 //const my_bal = await money.methods.balanceOf("0x2b1a497b540a7EA4c7E0a108072591838106caEe").call();
//                 const my_bal = await money.methods.balanceOf(accounts[0]).call();
//                 console.log("My MMNY is ", my_bal);

//                 const name = await tickets.methods.name().call();
//                 const sym = await tickets.methods.symbol().call();
//                 const supply = await tickets.methods.totalSupply().call();
//                 console.log(name, symbol, supply);
//                 return {
//                         name: name,
//                         sym: sym,
//                         supply: supply
//                  }
//                  */

// <Form onSubmit={this.buyTickets} error={!!this.state.errMessage} >
//                         <Form.Field>
//                             <label> Buy tickets </label>
//                             <Input  
//                                 label="Number of tickets" 
//                                 labelPosition="left" 
//                             />
//                         </Form.Field>
//                         <Message error header="Ooops!!" content={this.state.errMessage} />
//                         <Button primary loading={this.state.loading} > Buy </Button>
//                     </Form>

// <div> 
//         <h2> Welcome to the Marketplace! Buy your tickets here </h2>
//         Market at {this.props.market_address} 
//         <Segment placeholder>
//            {this.showMyBalance}
//         </Segment>
//         <Segment placeholder> 
//             <Header icon>
//                 <Icon name='ticket' />
//                 {this.props.tickets_available} Tickets available for Sale for {this.props.event_name}
//             </Header>
//             <Button primary onClick={this.sellTickets}> Sell tickets </Button>
//             <Button primary onClick={this.buyTickets}> Buy tickets </Button>
            
//         </Segment>
//         <Segment placeholder> 
//             <Header icon>
//                 <Icon name='money' />
//                 Get some {this.props.currency_name} money to buy these tickets 
//             </Header>
//             <Button primary onClick={this.getSomeMoney}> Get money!</Button>
//         </Segment>
// </div>
// /*
// //await window.ethereum.enable();
//                 let accounts = web3.eth.accounts;
//                 console.log("Address of account0 is ", accounts[0]);
//                 const my_balance = await tickets.methods.balanceOf(accounts[0], 0).call();
//                 console.log("My balance is ", my_balance);

//                 const uri = await tickets.methods.uri(0).call();
//                 console.log("URI of 0 is ", uri);

//                 //const my_bal = await money.methods.balanceOf("0x2b1a497b540a7EA4c7E0a108072591838106caEe").call();
//                 const my_bal = await money.methods.balanceOf(accounts[0]).call();
//                 console.log("My MMNY is ", my_bal);

//                 const name = await tickets.methods.name().call();
//                 const sym = await tickets.methods.symbol().call();
//                 const supply = await tickets.methods.totalSupply().call();
//                 console.log(name, symbol, supply);
//                 return {
//                         name: name,
//                         sym: sym,
//                         supply: supply
//                  }
//                  */