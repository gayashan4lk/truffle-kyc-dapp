// import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import useEth from '../../contexts/EthContext/useEth';

function MainNavBar() {
	// const {
	// 	state: { contract, accounts },
	// } = useEth();
	// const [address, setAddress] = useState('');

	// useEffect(() => {
	// 	setAddress(accounts[0]);
	// }, []);

	const appName = process.env.REACT_APP_NAME;
	return (
		<Navbar bg='light' expand='lg'>
			<Container>
				<Link to='/' className='navbar-brand' id='appHome'>
					{appName}
				</Link>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Link to='/profile' className='nav-link' id='profile'>
							Profile
						</Link>
						<Link to='/register' className='nav-link' id='register'>
							Register
						</Link>
					</Nav>
				</Navbar.Collapse>
				{/* <h6>Connected Account : {address}</h6> */}
			</Container>
		</Navbar>
	);
}

export default MainNavBar;
