import React from 'react';
import { Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

const AccountSummary extends Component {
	state = {
		errMessage: '',
		loading: false
	};

	sellTickets = async () =>{

	};

	buyTickets = async () => {

	};

	render() {
		return (
			// <Card>
			// 	<Card.Content>
			// 		<Card.Header>{this.props.name}</Card.Header>
			// 	</Card.Content>
			// 	<Card.Meta> {this.props.mny_balance} </Card.Meta>
			// 	<Card.Meta> {this.props.tickets_owned} </Card.Meta>
			// 	<Card.Content extra>
			// 		<div className='ui two buttons'>
			// 			<Button basic color='green' onClick={this.sellTickets} > Sell Tickets </Button>
			// 			<Button basic color='green' onClick={this.buyTickets} > Buy Tickets </Button>
			// 		</div>
			// 	</Card.Content>
			// </Card>
		);
	}
};

export default AccountSummary;
