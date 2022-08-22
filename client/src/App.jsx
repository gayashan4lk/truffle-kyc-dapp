import { BrowserRouter } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './routes/router';

function App() {
	return (
		<BrowserRouter>
			<EthProvider>
				<div id='App'>
					<div className='container'>
						<Router />
					</div>
				</div>
			</EthProvider>
		</BrowserRouter>
	);
}

export default App;
