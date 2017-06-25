import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

const MainMenu = () => (
	<nav className={style.mainMenu}>
		<ul>
			<li>
				<Link to="/dashboard">
					<div>
						<div className="fa fa-2x fa-columns"></div>
						<div className={style.itemTitle}>Dash</div>
					</div>
				</Link>
			</li>
			<li>
				<Link to="/bible">
					<div>
						<div className="fa fa-2x fa-book"></div>
						<div className={style.itemTitle}>Bible</div>
					</div>
				</Link>
			</li>
			<li>
				<Link to="/search">
					<div>
						<div className="fa fa-2x fa-search"></div>
						<div className={style.itemTitle}>Search</div>
					</div>
				</Link>
			</li>
			<li>
				<Link to="/notes">
					<div>
						<div className="fa fa-2x fa-file"></div>
						<div className={style.itemTitle}>Note</div>
					</div>
				</Link>
			</li>
			<li>
				<Link to="/settings">
					<div>
						<div className="fa fa-2x fa-gear"></div>
						<div className={style.itemTitle}>Settings</div>
					</div>
				</Link>
			</li>
		</ul>
	</nav>
);


export default MainMenu;