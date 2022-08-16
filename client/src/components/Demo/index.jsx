import { useState } from 'react';
import useEth from '../../contexts/EthContext/useEth';
import Contract from './Contract';
import ContractBtns from './ContractBtns';
import NoticeNoArtifact from './NoticeNoArtifact';
import NoticeWrongNetwork from './NoticeWrongNetwork';

function Demo() {
	const { state } = useEth();
	const [value, setValue] = useState();

	console.log(state);

	const demo = (
		<>
			<div className='contract-container'>
				<Contract value={value} />
				<ContractBtns setValue={setValue} />
			</div>
		</>
	);

	return (
		<div className='demo'>
			<h2>eKYC dAPP</h2>
			<br />
			{!state.artifact ? (
				<NoticeNoArtifact />
			) : !state.contract ? (
				<NoticeWrongNetwork />
			) : (
				demo
			)}
		</div>
	);
}

export default Demo;
