import { EthProvider } from './contexts/EthContext';
import './App.css';
import Register from './components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile/Profile';

function App() {
	return (
		<EthProvider>
			<div id='App'>
				<div className='container'>
					<Register />
					<Profile />
				</div>
			</div>
		</EthProvider>
	);
}

export default App;
