import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Register() {
	const {
		state: { contract, accounts },
	} = useEth();
	const [user, setUser] = useState({ userName: '', userType: '' });
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		addUser(data);
	};

	const addUser = async (data) => {
		let result = await contract.methods
			.addUser(data.name, data.type)
			.send({ from: accounts[0] });
		console.log(result);
	};

	// const getUser = async () => {
	// 	console.log(accounts[0]);
	// 	const _user = await contract.methods
	// 		.getUserByAddress(accounts[0])
	// 		.call({ from: accounts[0] });
	// 	console.log(_user);
	// 	console.log(_user['userName']);
	// 	console.log(_user['userType']);
	// 	setUser({ userName: _user['userName'], userType: _user['userType'] });
	// };

	return (
		<div>
			<h1>SignUp</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Your Name'
						{...register('name')}
					/>
				</Form.Group>
				<Form.Select aria-label='Default select example' {...register('type')}>
					<option>Select user type</option>
					<option value='Issuer'>Issuer</option>
					<option value='Holder'>Holder</option>
					<option value='Verifier'>Verifier</option>
				</Form.Select>
				<Form.Group className='mb-3' controlId='formBasicCheckbox'></Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default Register;
