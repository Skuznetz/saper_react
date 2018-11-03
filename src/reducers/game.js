import { fromJS } from 'immutable';
import { startGame,defaultGameState } from '../utils/minesweeper';

import {
    START_GAME
} from '../actions';

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case START_GAME: {
            const { rows, cols, mines } = action;

            return startGame({ rows, cols, mines });
        }
             default: {
            return state;
        }
    }
};