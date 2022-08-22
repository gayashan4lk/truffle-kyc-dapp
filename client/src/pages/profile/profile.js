import { useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

function Profile() {
	const {
		state: { contract, accounts },
	} = useEth();
	const [user, setUser] = useState({ address: '', id: '', name: '', type: '' });
	const [isRegistered, setIsRegistered] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsRegistered(false);
		const getUser = async () => {
			console.log(accounts[0]);
			const _user = await contract.methods
				.getUser()
				.call({ from: accounts[0] });

			setUser({
				address: accounts[0],
				id: _user['Id'],
				name: _user['Name'],
				type: _user['Type'],
			});
			if (_user['Id'] > 0) {
				setIsRegistered(true);
			}
		};
		getUser().catch(console.error);
		setIsLoading(false);
		if (user) {
			setIsSuccess(true);
		} else {
			setIsError(true);
		}
	}, [accounts]);

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

	let pageContent;
	if (isLoading) {
		pageContent = <LoadingCircle />;
	}
	if (isSuccess) {
		if (isRegistered) {
			let userType = getUserType(user.type);
			pageContent = (
				<>
					<div>
						<h5>Hi, {user.name}.</h5>
						<h5>Id: {user.id}</h5>
						<h5>User Type: {userType}</h5>
					</div>
				</>
			);
		} else {
			pageContent = (
				<div>
					<h3>You are a invalied user. Please Register.</h3>
					<a href='/register'>Register Me</a>
				</div>
			);
		}
	}

	return (
		<div>
			<div>{pageContent}</div>
		</div>
	);
}

export default Profile;
