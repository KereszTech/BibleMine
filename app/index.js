import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { HashRouter, Switch, Route } from 'react-router-dom';

import reducers from './reducers'
import Home from 'scenes/Home';
import Bible from 'scenes/Bible';

let store = createStore(
	reducers,
	applyMiddleware(thunk)
);

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<HashRouter>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/bible/:translation/:book?/:chapter?/:verse?/:verseRange?" component={Bible} />
				</Switch>
			</HashRouter>
		</Provider>,
		document.getElementById('root')
	);
};

render();

if (process.env.NODE_ENV !== 'production') {
	// Hot Module Replacement API
	if (module.hot) {
		module.hot.accept('/', () => {
			render(ControlPanel);
		});
	}
}