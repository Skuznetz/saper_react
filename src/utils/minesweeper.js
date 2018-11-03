import { fromJS, Map, List } from 'immutable';
import repeat from './repeat';

export function startGame(params) {
    const game = fromJS({
        cols: params.cols,
        rows: params.rows,
        mines: params.mines,
        board: generateBoard(params),
        moves: 0,
        startedAt: Date.now()
    });
}

export function generateBoard({ cols, rows, mines }) {
    const cell = Map({ isRevealed: false, isFlagged: false });

    const safeCells = repeat(cols * rows - mines, cell);
    const mineCells = repeat(mines, cell.set('isMine', true));
}