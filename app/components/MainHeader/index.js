import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

const MainHeader = () => (
	<header className={style.mainHeader}>
		<div className={style.logo}>BibleMine</div>
		<input className={style.searchField} type="text" ng-model="searchTerm" ng-change="getVerse()" placeholder="Search"/>
		<div className={`${style.button} fa fa-th fa-lg`}></div>
		<div className={`${style.button} fa fa-gear fa-lg`}></div>
		<section className={style.searchResults}>
			<div ng-repeat="searchResult in searchResults" ng-switch="searchResult.type" className="search-result">
				<div ng-switch-when="reference">
					<a href="#{{ searchResult_url }}">
						<div className="title">searchResult.name</div>
						<div>searchResult.content</div>
					</a>
				</div>
			</div>
		</section>
	</header>
);


export default MainHeader;