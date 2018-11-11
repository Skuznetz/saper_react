import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import * as actions from '../actions';
import GameBoard from './GameBoard.jsx';
import GameStatus from './GameStatus.jsx';

import Footer from '../components/Footer.jsx';
@connect(
    null,
    actions
)
export default class Game extends Component {
    componentDidMount() {
        this.props.startGame();
    }
    render() {
        return (
            <div>
                <GameBoard />
                <GameBoard />
                <Footer />
            </div>
        );
    }
}