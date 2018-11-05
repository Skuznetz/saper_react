import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import GameBoard from './GameBoard.jsx';

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
            <div>Hello</div>
        );
    }
}