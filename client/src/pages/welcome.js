import useEth from '../contexts/EthContext/useEth';
import { Outlet, Link } from 'react-router-dom';
import MainNavBar from '../components/navigation/mainNavBar';
import { useEffect } from 'react';

const Welcome = () => {
	const { state } = useEth();

	// useEffect(() => {
	// 	console.log(state);
	// }, [state]);

	if (state.accounts == null) {
		return <h1>Please connect your wallet.</h1>;
	} else {
		return (
			<div>
				<MainNavBar />
				<div>
					<Outlet />
				</div>
			</div>
		);
	}
};

export default Welcome;
