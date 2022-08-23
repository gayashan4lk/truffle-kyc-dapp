import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useEth from '../../contexts/EthContext/useEth';
import LoadingCircle from '../../components/navigation/utilities/loadingCircle';

const HolderView = ({ account }) => {
	return (
		<div>
			<h3>My Certificates</h3>
			{account}
		</div>
	);
};

export default HolderView;
