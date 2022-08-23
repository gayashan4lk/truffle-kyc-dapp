import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import HolderView from './holderView';
import IssuerView from './issuerView';
import VerfierView from './verifierView';

function Profile() {
	const {
		state: { contract, accounts },
	} = useEth();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const getUser = async () => {
		let result = await contract.methods.getUser().call({ from: accounts[0] });
		return result;
	};

	const getUserType = (type) => {
		let userType = '';
		switch (type) {
			case '0':
				userType = 'Issuer';
				break;
			case '1':
				userType = 'Holder';
				break;
			case '2':
				userType = 'Verifier';
				break;
			default:
				break;
		}
		return userType;
	};

	const getUserConcent = (type) => {
		let content = '';
		switch (type) {
			case '0':
				content = <IssuerView />;
				break;
			case '1':
				content = <HolderView />;
				break;
			case '2':
				content = <VerfierView />;
				break;
			default:
				break;
		}
		return content;
	};

	useEffect(() => {
		if (accounts) {
			(async () => {
				setIsLoading(true);
				let result = await getUser();
				setUser(result);
			})();
			setIsLoading(false);
		}
	}, [accounts]);

	if (!isLoading) {
		return (
			<div>
				{user.Id >= 0 ? (
					<>
						<h1>{user.Name}</h1>
						<h3>{getUserType(user.Type)}</h3>
						<h3>Id : {user.Id}</h3>
						<div>{getUserConcent(user.Type)}</div>
					</>
				) : (
					<>
						<h3>You are a invalied user. Please Register.</h3>
						<a href='/register'>Register Me</a>
					</>
				)}
			</div>
		);
	} else {
		return <LoadingCircle />;
	}
}

export default Profile;
