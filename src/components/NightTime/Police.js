import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { JOB_NAME_OF_MAFIA } from '../../contants/Job';

class Police extends Component {
	state = {
		selected: false,
		isMafia: false,
		selectName: ''
	};
	detectingMafiaByPolice = (name) => {
		const { players } = this.props;
		players.find((person) => person.get('name') === name).get('jobName') === JOB_NAME_OF_MAFIA
			? this.setState({
				selected: true,
				selectName: name,
				isMafia: true
			})
			: this.setState({
				selected: true,
				selectName: name,
				isMafia: false
			});
	};
	handleNextOrder = () => {
		const { changeNightTimeOrder, toggleConfirmed } = this.props;
		toggleConfirmed()
		changeNightTimeOrder()
	};
	render() {
		const { isMafia, selected, selectName } = this.state;
		const { players, me, revoted } = this.props;
		return (
			<div>
				경찰의 차례입니다. 경찰은 마피아로 의심되는 사람을 지목해 마피아가 맞는지 확인할 수 있습니다.
				{revoted ?
					<div>
						<h3>재투표 중일때 경찰은 다른 이의 직업을 볼 수 없습니다.</h3>
						<button onClick={this.handleNextOrder}>다음</button>
					</div>
					: !selected ?
						<div>
							{
								players
									.filter((person) => person.get('name') !== me.get('name'))
									.map((person, i) => (
										<button key={`police-select-${i}`} onClick={() => this.detectingMafiaByPolice(person.get('name'))}>
											{person.get('name')}
										</button>
									))}
						</div>
						:
						<>
							<div>
								{selectName}은 마피아가 {isMafia ? '맞습니다.' : '아닙니다.'}
							</div>
							<div>
								<button onClick={this.handleNextOrder}>다음</button>
							</div>
						</>
				}
				{
				}
			</div>
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
