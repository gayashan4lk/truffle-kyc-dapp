import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';

function Profile() {
	const {
		state: { contract, accounts },
	} = useEth();
	const [user, setUser] = useState({ id: '', name: '', type: '' });

	const getUser = async () => {
		console.log(accounts[0]);
		const _user = await contract.methods.getUser().call({ from: accounts[0] });
		console.log(_user);
		console.log(_user['Name']);
		console.log(_user['Type']);
		setUser({ id: _user['Id'], name: _user['Name'], type: _user['Type'] });
	};

	useEffect(() => {}, [user]);

	return (
		<div>
			<h1>Hi.</h1>
			Id: {user.id}
			Welcome: {user.name} You are a type: {user.type}
			<button onClick={getUser}>Get User</button>
		</div>
	);
}

export default Profile;
