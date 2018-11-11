import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameStatItem from '../components/GameStatItem.jsx';

@connect(mapStateToProps)
export default class MovesCount extends Component {
    render() {
        const { moves } = this.props;

        return <GameStatItem stat={moves} label="Moves" />;
    }
}

function getMovesCount(state) {
    return state.getIn(['game', 'moves']);
}

function mapStateToProps(state, ownProps) {
    return {
        moves: getMovesCount(state)
    };
}