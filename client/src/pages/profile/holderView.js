import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';
import SharePopup from './sharePopup';
import { Link } from 'react-router-dom';

const HolderView = ({ account }) => {
	const {
		state: { contract, accounts },
	} = useEth();

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
				<table>
					<tbody>
						{data.map((cred) => (
							<tr key={cred.CredentialId}>
								<td>{cred.CredentialId}</td>
								<td>{cred.Definition}</td>
								<td>
									<Link to={'/share/' + cred.CredentialId}>Share Creds</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	} else {
		return <LoadingCircle />;
	}
};

export default HolderView;
