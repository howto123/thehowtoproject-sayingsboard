// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';



// Components
import App from './components/App';

// Styling
import './index.css';

/**
 * This is the main entry point for the frontend.
 * Mayjor imports happen here as well as the structuring of components.
 * Capital .js files define components which are integrated into each other,
 * and finally (indirectly) imported here.
 */

const root = ReactDOM.createRoot(document.getElementById('root') as Element|DocumentFragment);
root.render(
	<React.StrictMode>
		<h2>Here comes theapp</h2>
		<div className="container-fluid text-center">
			<App />
		</div>
    </React.StrictMode>
);

