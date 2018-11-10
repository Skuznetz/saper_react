import { fromJS } from 'immutable';
import { startGame, revealTile, flagTile } from '../utils/minesweeper';

import {
    START_GAME,
    TOGGLE_FLAGGED_TILE,
    REVEAL_TILE
} from '../actions';

const DEFAULT_STATE = fromJS({
    board: [],
    cols: 4,
    rows: 6,
    mines: 10,
    moves: 0
});

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case START_GAME: {
            const { rows, cols, mines } = action;

            return startGame({ rows, cols, mines });
        }

        
        case REVEAL_TILE: {
            return revealTile(state, action.tileId);
        }

        case TOGGLE_FLAGGED_TILE: {
            return flagTile(state, action.tileId);
        }
        
             default: {
            return state;
        }
    }
};