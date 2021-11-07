import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';


const  Header = (props) => {
	return (
		<Menu style={ { marginTop: '10px'} } >
			<Link route="/">
				<a className="item">
					Marketplace
				</a> 
			</Link>
			<Menu.Menu position="right">
				<Link route="/getmoney">
					<a className="item">Get some MNY</a> 
				</Link>
				<Link route="/tickets">
					<a className="item">Buy or Sell Tickets</a> 
				</Link>
				<Link route="/details">
					<a className="item">Summary of balances</a> 
				</Link>
			</Menu.Menu>
		</Menu>
	);
}

export default Header;
