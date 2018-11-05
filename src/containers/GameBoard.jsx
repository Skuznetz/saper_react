import React, { Component } from 'react';


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



