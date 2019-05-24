import React              from 'react';
import ReactDOM           from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import './assets/base.scss';
import { Navbar }         from './components/navbar/navbar';

ReactDOM.render (<div className="App">
	<Navbar/>
</div>, document.getElementById ('root'));

serviceWorker.unregister ();
