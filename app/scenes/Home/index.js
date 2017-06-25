import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
	render() {
		return (
			<Link to="/bible/hu/1/1/1/3">Go to a chapter</Link>
		);
	}

}

export default Home;