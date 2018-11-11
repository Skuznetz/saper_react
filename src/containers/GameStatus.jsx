import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmojiStatus from '../components/EmojiStatus.jsx';

@connect(mapStateToProps)

export default class GameStatus extends Component {
    render() {
        const { status } = this.props;

        return <EmojiStatus mapper={statusEmojis} status={this.props.status} />;
    }
}

function mapStateToProps(state, ownProps) {
    return {
        status: getGameStatus(state)
    };
}