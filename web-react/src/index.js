import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppNavigation from './components/AppNavigation';
import Appheader from './components/Appheader';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<div>
		<Appheader/>
		<AppNavigation />
	</div>,
	document.getElementById('root'));
registerServiceWorker();
