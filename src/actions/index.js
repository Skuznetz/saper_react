export const START_GAME = 'START_GAME';

export const startGame = query => ({
    type: START_GAME,
    cols: 8,
    rows: 8,
    mines: 12
});