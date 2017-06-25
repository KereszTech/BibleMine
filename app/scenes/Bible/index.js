import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchSettings } from './actions';
import MainHeader from 'components/MainHeader';
import MainMenu from 'components/MainMenu';
import style from './style.css';

const mapStateToProps = store => store.bible;

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSettings }, dispatch);

class Bible extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
		//this.props.fetchSettings();
	}

	render() {
		return (
			<div>
				<MainHeader/>
				<div className={style.mainBody}>
					<MainMenu/>
					<section className={style.mainContent}>Bible</section>
				</div>
			</div>
		);
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Bible);