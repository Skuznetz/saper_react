import React, { Component } from 'react';
import { connect } from 'react-redux';

import GameStatItem from '../components/GameStatItem.jsx';

@connect(mapStateToProps)
export default class MinesLeftCount extends Component {
    render() {
        const { mines } = this.props;

        return <GameStatItem stat={mines} label="Mines left" />;
    }
}

function getMinesLeft(state) {
    return state.getIn(['game', 'mines']) - state.getIn(['game', 'board']).reduce((minesLeft, tile) =>
        tile.get('isFlagged') ? minesLeft + 1 : minesLeft
    , 0);
}

function mapStateToProps(state, ownProps) {
    return {
        mines: getMinesLeft(state)
    };
}