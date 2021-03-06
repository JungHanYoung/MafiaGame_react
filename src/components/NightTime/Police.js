import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'


class Police extends Component {
	state = {
		selected: false,
		jobName: '',
		selectName: ''
	};
	detectingByPolice = (name) => {
		const { players } = this.props;
		const player = players.find((person) => person.get('name') === name);
		//.get('jobName') === JOB_NAME_OF_MAFIA
		this.setState({
			selected: true,
			selectName: player.get('name'),
			jobName: player.get('jobName')
		})
		// ? this.setState({
		// 	selected: true,
		// 	selectName: name,
		// 	jobName: true
		// })
		// : this.setState({
		// 	selected: true,
		// 	selectName: name,
		// 	isMafia: false
		// });
	};
	handleNextOrder = () => {
		const { changeNightTimeOrder, toggleConfirmed } = this.props;
		toggleConfirmed()
		changeNightTimeOrder()
	};
	render() {
		const { selected, selectName, jobName } = this.state;
		const { players, me, revoted } = this.props;
		return (
			<>
				{revoted ? (<>
					<div className="game-content">
						<p className="content-description">재투표 중일때 경찰은 다른 이의 직업을 볼 수 없습니다.</p>
					</div>
					<button onClick={this.handleNextOrder}>다음</button>
				</>) : (
						<>
							<div className="game-content">
								<p className="content-description">경찰의 차례입니다.<br /> 한 사람의 직업을 확인할 수 있습니다.</p>
								{!selected ?
									<div className="vote-btn-container">
										<div>
											{
												players
													.filter((person) => person.get('name') !== me.get('name'))
													.map((person, i) => (
														<button
															key={`police-select-${i}`}
															onClick={() => this.detectingByPolice(person.get('name'))}
															className="btn-sm"
														>
															{person.get('name')}
														</button>
													))
											}
										</div>
									</div>
									: <div>{selectName}님의 직업은 {jobName}입니다.</div>}
							</div>
							{selected &&
								<button
									className="btn-lg"
									onClick={this.handleNextOrder}>다음</button>}
						</>
					)}
			</>
		);
	}
}

Police.propTypes = {
	// // context
	// players: PropTypes.arrayOf(
	// 	PropTypes.shape({
	// 		name: PropTypes.string.isRequired,
	// 		daytimeVoted: PropTypes.number,
	// 		jobName: PropTypes.string.isRequired,
	// 		code: PropTypes.number
	// 	})
	// ).isRequired,
	// nextOrder: PropTypes.func.isRequired,
	// // parent
	// handleConfirmAndCheck: PropTypes.func.isRequired
	players: ImmutablePropTypes.list,
	me: ImmutablePropTypes.map,
	revoted: PropTypes.bool.isRequired,
	toggleConfirmed: PropTypes.func.isRequired,
	changeNightTimeOrder: PropTypes.func.isRequired
};

export default Police
