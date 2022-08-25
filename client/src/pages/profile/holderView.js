import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import SharePopup from './sharePopup';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const HolderView = ({ account }) => {
	const {
		state: { contract, accounts },
	} = useEth();

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const getAllCredentials = async () => {
		let result = await contract.methods
			.getAllCredentials()
			.call({ from: accounts[0] });
		return result;
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			let result = await getAllCredentials();
			setData(result);
			setIsLoading(false);
		})();
	}, []);

	if (!isLoading) {
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Credentials Details</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((cred) => (
							<tr key={cred.CredentialId}>
								<td>{cred.CredentialId}</td>
								<td>{cred.Definition}</td>
								<td>
									<Link
										to={'/share/' + cred.CredentialId}
										className='btn btn-primary'
									>
										Share Credential
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		);
	} else {
		return <LoadingCircle />;
	}
};

export default HolderView;
