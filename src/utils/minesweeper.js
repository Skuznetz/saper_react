import { fromJS, Map, List } from 'immutable';
import repeat from './repeat';

export function getTileId(game, tileId) {
    if (tileId < 0 || tileId > game.get('cols') * game.get('rows') - 1) {
        return null;
    }

    if (game.get('board').has(tileId)) {
        return tileId
    }

    return null;
}

export function isTileOnWEdge(game, tileId) {
    return tileId % game.get('cols') === 0;
}

export function isTileOnEEdge(game, tileId) {
    return tileId % game.get('cols') === game.get('cols') - 1;
}

const directions = new Map({
    n: (game, tileId) => getTileId(game, tileId - game.get('cols')),
    nw: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - game.get('cols') - 1),
    ne: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId - game.get('cols') + 1),
    e: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + 1),
    se: (game, tileId) => isTileOnEEdge(game, tileId) ? null : getTileId(game, tileId + game.get('cols') + 1),
    s: (game, tileId) => getTileId(game, tileId + game.get('cols')),
    sw: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId + game.get('cols') - 1),
    w: (game, tileId) => isTileOnWEdge(game, tileId) ? null : getTileId(game, tileId - 1)
});

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

export function addMileCounts(game) {
    const newBoard = game.get('board').map(tile =>
        tile.set('mineCount', getMineCount(game, tile.get('id')))
    );

    return game.set('board', newBoard);
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