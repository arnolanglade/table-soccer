import {Game, Player, Score} from "./TableSoccer";

describe('Game', () => {
    test('it start a game with two players', () => {
        expect(
            Game.start('arn0', 'Popeye')
        ).toEqual(
            new Game(new Player('arn0'), new Player('Popeye'), Score.playersHaveNotScored())
        );
    })
});

describe('Score', () => {
    test('the score is 0 - 0 at the beginning of the game ', () => {
        expect(Score.playersHaveNotScored()).toEqual(new Score(0, 0));
    })
});