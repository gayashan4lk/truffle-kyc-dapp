import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

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
				<table>
					<tbody>
						{data.map((cred) => (
							<tr key={cred.CredentialId}>
								<td>{cred.CredentialId}</td>
								<td>{cred.Definition}</td>
								<td></td>
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

export default VerfierView;
