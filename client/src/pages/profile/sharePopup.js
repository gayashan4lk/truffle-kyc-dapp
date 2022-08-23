import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import { useParams } from 'react-router-dom';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import { Form, Button } from 'react-bootstrap';

const SharePopup = () => {
	const {
		state: { contract, accounts },
	} = useEth();
	const { register, handleSubmit } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [credential, setCredential] = useState();
	const { id } = useParams();

	const onSubmit = (data) => {
		console.log(data);
		setIsLoading(true);
		shareCredential(data);
	};

	const getCredentialById = async (id) => {
		let result = await contract.methods
			.getCredentialById(id)
			.call({ from: accounts[0] });
		return result;
	};

	const shareCredential = async (data) => {
		let result = await contract.methods
			.shareCredential(data.verifier, data.id)
			.send({ from: accounts[0] });
		return result;
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			let result = await getCredentialById(id);
			setCredential(result);
			setIsLoading(false);
		})();
	}, []);

	if (credential) {
		return (
			<div>
				<h5>Certificate Details</h5>
				<h6>Description: {credential.Definition} </h6>
				<h6>Holder Address: {credential.Holder} </h6>
				<h6>Issued Date: {credential.CreatedAt} </h6>
				<hr />
				<form onSubmit={handleSubmit(onSubmit)}>
					<h5>Share Cerificate</h5>
					<Form.Control
						type='hidden'
						value={credential.CredentialId}
						{...register('id')}
					/>
					<Form.Group className='mb-3' controlId='veriferAddress'>
						<Form.Label>Verfier Address :</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter Wallet Address'
							{...register('verifier')}
						/>
					</Form.Group>
					<Button variant='primary' type='submit'>
						Share Certificate
					</Button>
				</form>
			</div>
		);
	} else {
		return <LoadingCircle />;
	}
};

export default SharePopup;
