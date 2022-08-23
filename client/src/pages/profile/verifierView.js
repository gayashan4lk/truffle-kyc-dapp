import { useState, useEffect } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

const VerfierView = () => {
	const {
		state: { contract, accounts },
	} = useEth();

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const getSharedCredentials = async () => {};

	if (!isLoading) {
		return (
			<div>
				<h1>shared cred list</h1>
			</div>
		);
	} else {
		return <LoadingCircle />;
	}
};

export default VerfierView;
