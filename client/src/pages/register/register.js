import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

function Register() {
	const {
		state: { contract, accounts },
	} = useEth();
	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = (data) => {
		console.log(data);
		setIsLoading(true);
		addUser(data);
	};

	const addUser = async (data) => {
		let result = await contract.methods
			.addUser(data.name, data.type)
			.send({ from: accounts[0] });
		console.log(result);
		if (result) {
			setIsLoading(false);
			if (result.status) {
				setIsSuccess(true);
			} else {
				setIsError(true);
			}
		}
	};

	let pageView;
	if (isLoading) {
		pageView = <LoadingCircle />;
	} else if (isError) {
		pageView = <h1>Error Occured!</h1>;
	} else if (isSuccess) {
		pageView = (
			<div>
				<h1>User Created Succesfully.</h1>
				<a href='/profile'>Go to profile</a>
			</div>
		);
	} else {
		pageView = (
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
					<Form.Select
						aria-label='Default select example'
						{...register('type')}
					>
						<option>Select user type</option>
						<option value='Issuer'>Issuer</option>
						<option value='Holder'>Holder</option>
						<option value='Verifier'>Verifier</option>
					</Form.Select>
					<Form.Group
						className='mb-3'
						controlId='formBasicCheckbox'
					></Form.Group>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Form>
			</div>
		);
	}

	return <div className='register-form-wrapper'>{pageView}</div>;
}

export default Register;
