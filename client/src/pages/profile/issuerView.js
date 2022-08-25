import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

const IssuerView = () => {
	const {
		state: { contract, accounts },
	} = useEth();

	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const onSubmit = (data) => {
		setIsLoading(true);
		createCredential(data);
	};

	const createCredential = async (data) => {
		let result = await contract.methods
			.createCredential(data.holder, data.definition)
			.send({ from: accounts[0] });
		if (result) {
			setIsLoading(false);
			if (result.status) {
				setIsSuccess(true);
			} else {
				setIsError(true);
			}
		}
	};

	let pageContent;
	if (isLoading) {
		pageContent = <LoadingCircle />;
	} else if (isError) {
		pageContent = <h1>Error Occured!</h1>;
	} else if (isSuccess) {
		pageContent = <h1>Credential issued successfully.</h1>;
	} else {
		pageContent = (
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-3' controlId='holderAddress'>
						<Form.Label>Holder Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Holder Address'
							{...register('holder')}
						/>
					</Form.Group>
					<Form.Group className='mb-3' controlId='certificateDetails'>
						<Form.Label>Certificate Details</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Cerificate'
							{...register('definition')}
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Issue
					</Button>
				</form>
			</div>
		);
	}

	return (
		<div>
			<h5>Issue a certificate</h5>
			{pageContent}
		</div>
	);
};

export default IssuerView;
