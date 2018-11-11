import React, { Component } from 'react';
import { connect } from 'react-redux';

import EmojiStatus from '../components/EmojiStatus.jsx';

@connect(mapStateToProps)

function mapStateToProps(state, ownProps) {
    return {
        status: getGameStatus(state)
    };
}