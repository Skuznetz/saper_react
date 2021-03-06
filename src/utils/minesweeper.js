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

export function isTileMine(tile) {
    return tile.get('isMine');
}

export function isTileIdValid(tileId) {
    return !!tileId;
}

export function setTileRevealed(game, tileId) {
    return game.setIn(['board', tileId, 'isRevealed'], true);
}

export function isTileRevealed(tile) {
    return tile.get('isRevealed');
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


export function getAdjacentTileIds(game, tileId) {
    return directions
        .map(direction => direction(game, tileId))
        .toList()
        .filter(isTileIdValid);
}

export function getAdjacentTiles(game, tileId) {
    const adjacentTileIds = getAdjacentTileIds(game, tileId);

    return adjacentTileIds.map(id => game.getIn(['board', id]));
}

export function getMineCount(game, tileId) {
    const adjacentTiles = getAdjacentTiles(game, tileId);

    return adjacentTiles.filter(isTileMine).size;
}

export function addMineCounts(game) {
    const newBoard = game.get('board').map(tile =>
        tile.set('mineCount', getMineCount(game, tile.get('id')))
    );

    return game.set('board', newBoard);
}

export function revealAllMines(game) {
    const newBoard = game.get('board').map(tile =>
        tile.get('isMine')
        ? tile.set('isRevealed', true)
        : tile
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
        .map((tile, idx) => tile.set('id', idx));
}

export function revealAdjacentSafeTiles(game, tileId) {
    if (game.getIn(['board', tileId, 'isMine'])) {
        return game;
    }

    if (game.getIn(['board', tileId, 'mineCount']) === 0) {
        const adjacentTileIds = getAdjacentTileIds(game, tileId);

        return adjacentTileIds.reduce(
            (g, tileId) => {
                const isRevealed = isTileRevealed(g.getIn(['board', tileId]));

                return isRevealed ? g : revealAdjacentSafeTiles(g, tileId);
            },
            setTileRevealed(game, tileId)
        );
    }

    return setTileRevealed(game, tileId);

}

export function flagTile(game, tileId) {
    return game.setIn(['board', tileId, 'isFlagged'], !game.getIn(['board', tileId, 'isFlagged']));
}

export function revealTile(game, tileId) {
    const updatedGame = game
        .set('moves', game.get('moves') + 1)
        .setIn(['board', tileId, 'isRevealed'], true);

    return updatedGame.getIn(['board', tileId, 'isMine'])
        ? revealAllMines(updatedGame)
        : revealAdjacentSafeTiles(updatedGame, tileId);
}