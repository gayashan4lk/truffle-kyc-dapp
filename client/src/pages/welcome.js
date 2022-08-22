import { Outlet, Link } from 'react-router-dom';
import MainNavBar from '../components/navigation/mainNavBar';

const Welcome = () => {
	return (
		<div>
			<MainNavBar />
			<div>
				<Outlet />
			</div>
		</div>
	);
};

export default Welcome;
