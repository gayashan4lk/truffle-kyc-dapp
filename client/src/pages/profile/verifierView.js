import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import { Table } from 'react-bootstrap';

const VerfierView = () => {
	const {
		state: { contract, accounts },
	} = useEth();

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getAllSharedCredentials = async () => {
		let result = await contract.methods
			.getAllSharedCredentials()
			.call({ from: accounts[0] });
		return result;
	};

	useEffect(() => {
		(async () => {
			setIsLoading(false);
			let result = await getAllSharedCredentials();
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
							<th>Holder Address</th>
							<th>Credentials Details</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{data.map((cred) => (
							<tr key={cred.CredentialId}>
								<td>{cred.Holder}</td>
								<td>{cred.Definition}</td>
								<td>
									{' '}
									<a href='' className='btn btn-primary'>
										View
									</a>
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

export default VerfierView;
