import { Spinner } from 'react-bootstrap';

function LoadingCircle() {
	return (
		<div className=''>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
}

export default LoadingCircle;
