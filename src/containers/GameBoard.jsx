import React, { Component } from 'react';
import { connect } from 'react-redux';

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



