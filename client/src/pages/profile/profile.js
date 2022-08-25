import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
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

	const getUserContent = (type) => {
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
						<div className='mt-2 mb-2'>
							<Card>
								<Card.Body>
									<h3>
										<Badge bg='danger'>{getUserType(user.Type)}</Badge>
										<span> </span>
										<span className='ml-5'>{user.Name}</span>
									</h3>
								</Card.Body>
							</Card>
						</div>
						<div>{getUserContent(user.Type)}</div>
					</>
				) : (
					<>
						<h5>You are a invalied user. Please Register.</h5>
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
