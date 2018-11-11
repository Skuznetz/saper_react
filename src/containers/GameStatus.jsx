import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmojiStatus from '../components/EmojiStatus.jsx';

const statusEmojis = {
    'LOOSER': 'dizzy-face',
    'WINNER': 'sunglasses',
    'PLAYING': 'smiley'
};

@connect(mapStateToProps)

export default class GameStatus extends Component {
    render() {
        const { status } = this.props;

        return <EmojiStatus mapper={statusEmojis} status={this.props.status} />;
    }
}

function getGameStatus(state) {
    const isWin = state.getIn(['game', 'board']).reduce(
        (status, tile) => tile.get('isMine') ? status : status && tile.get('isRevealed'),
        true
    );

    if (isWin) {
        return 'WINNER';
    }

    const isLoose = state.getIn(['game', 'board']).reduce(
        (status, tile) => tile.get('isMine') ? status && tile.get('isRevealed') : status,
        true
    );

    if (isLoose) {
        return 'LOOSER';
    }


    return 'PLAYING';
}

function mapStateToProps(state, ownProps) {
    return {
        status: getGameStatus(state)
    };
}