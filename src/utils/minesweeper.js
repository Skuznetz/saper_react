import { fromJS, Map, List } from 'immutable';
import repeat from './repeat';

export function isTileOnWEdge(game, tileId) {
    return tileId % game.get('cols') === 0;
}

export function isTileOnEEdge(game, tileId) {
    return tileId % game.get('cols') === game.get('cols') - 1;
}

export function startGame(params) {
    const game = fromJS({
        cols: params.cols,
        rows: params.rows,
        mines: params.mines,
        board: generateBoard(params),
        moves: 0,
        startedAt: Date.now()
    });
    return addMineCounts(game);
}

export function generateBoard({ cols, rows, mines }) {
    const cell = Map({ isRevealed: false, isFlagged: false });

    const safeCells = repeat(cols * rows - mines, cell);
    const mineCells = repeat(mines, cell.set('isMine', true));
     return safeCells
        .concat(mineCells)
        .sort(() => Math.random() - 0.5)
        .map((с, idx) => с.set('id', idx));
}