export const START_GAME = 'START_GAME';

export const startGame = query => ({
    type: START_GAME,
    cols: 8,
    rows: 8,
    mines: 12
});

export const revealTile = tileId => ({
    type: REVEAL_TILE,
    tileId
});

export const toggleFlaggedTile = tileId => ({
    type: TOGGLE_FLAGGED_TILE,
    tileId
});