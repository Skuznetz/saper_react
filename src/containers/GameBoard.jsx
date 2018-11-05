import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Board from '../components/Board.jsx';

@connect(
    mapStateToProps,
    actions
)
export default class GameBoard extends Component {
    render() {
        const { board, revealTile, toggleFlaggedTile } = this.props;

        return (
            <Board
                rows={board}
               
            />
        );
    }
}



