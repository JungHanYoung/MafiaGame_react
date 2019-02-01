import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './App.css';
import { useGame } from './context/GameContext';

import logoImg from './assets/logo.png'

class App extends Component {
	render() {
		const { people } = this.props;
		const location = this.props.location;
		// console.log(location.state);
		// console.log(location.state ? location.state.redirectMesg : 'not exists location');
		location.state && location.state.redirectMesg && alert(location.state.redirectMesg);
		return (
			<>
				<main className="main-container">
					<img alt="로고" src={logoImg} className="main-img" />
					<h1 className="main-title">HELLO MAFIA</h1>
					{people.length > 0 && (
						<Link className="btn-main" to="/check">
							게임 시작
						</Link>
					)}
					<Link className="btn-main" to="/setting">
						게임 설정
					</Link>

					<Link className="btn-main" to="/about">
						게임 설명
					</Link>
				</main>
			</>
		);
	}
}

export default withRouter(
	useGame(({ state, actions }) => ({
		people: state.people
	}))(App)
);
