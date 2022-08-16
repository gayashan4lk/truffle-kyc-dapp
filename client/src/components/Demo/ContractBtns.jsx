import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';

function ContractBtns({ setValue }) {
	const {
		state: { contract, accounts },
	} = useEth();
	const [inputValue, setInputValue] = useState('');
	const [user, setUser] = useState({ userName: '', userType: '' });
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		addUser(data);
	};

	const addUser = async (data) => {
		let result = await contract.methods
			.addUser(data.userName, data.userType)
			.send({ from: accounts[0] });
		console.log(result);
	};

	const getUser = async () => {
		console.log(accounts[0]);
		const _user = await contract.methods
			.getUserByAddress(accounts[0])
			.call({ from: accounts[0] });
		console.log(_user);
		console.log(_user['userName']);
		console.log(_user['userType']);
		setUser({ userName: _user['userName'], userType: _user['userType'] });
	};

	useEffect(() => {}, [user]);

	return (
		<>
			<h1 id='welcome'>
				Welcome {user.userName}! You are a type {user.userType} user.
			</h1>
			<div className='identity-stuff'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor=''>User name</label>
					<input {...register('userName')} />
					<input {...register('userType')} />
					<input type='submit' />
				</form>
			</div>
			<div>
				<button onClick={getUser}>Get User</button>
			</div>
		</>
	);
}

export default ContractBtns;
