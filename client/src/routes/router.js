import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/welcome';
import Register from '../pages/register/register';
import Profile from '../pages/profile/profile';
import SharePopup from '../pages/profile/sharePopup';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Welcome />}>
				<Route path='register' element={<Register />} />
				<Route path='profile' element={<Profile />} />
				<Route path='share/:id' element={<SharePopup />} />
			</Route>
		</Routes>
	);
};

export default Router;
