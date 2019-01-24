import React from 'react';
import { useGame } from '../../context/GameContext';

class Police extends React.Component {
	componentWillMount() {
		const { people, setNightOrder } = this.props;
		if (people.filter((person) => person.jobName === 'POLICE').length <= 0) {
			setNightOrder('result');
		}
	}
	detectingMafiaByPolice = (name) => {
		const { people } = this.props;
		people.find((person) => {
			return person.name === name;
		}).jobName === 'MAFIA'
			? this.setState({
					selected: name,
					isMafia: true
				})
			: this.setState({
					selected: name,
					isMafia: false
				});
	};
	render() {
		const { isMafia, selected } = this.state;
		const { people, setNightOrder } = this.props;
		return (
			<div>
				경찰의 차례입니다. 경찰은 마피아로 의심되는 사람을 지목해 마피아가 맞는지 확인할 수 있습니다.
				{people
					.filter((person) => {
						return person.jobName !== 'POLICE';
					})
					.map((person) => (
						<button onClick={() => this.detectingMafiaByPolice(person.name)}>{person.name}</button>
					))}
				{isMafia !== undefined && (
					<div>
						{selected}은 마피아가 {isMafia ? '맞습니다.' : '아닙니다.'}
						<button onClick={() => setNightOrder('result')}>밤 투표 결과</button>
					</div>
				)}
			</div>
		);
	}
}

export default useGame(({ state, actions }) => ({
	people: state.people,
	setNightOrder: actions.setNightOrder
}))(Police);
