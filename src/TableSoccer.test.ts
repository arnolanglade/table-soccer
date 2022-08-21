import {Game, Player, Score, Team} from "./TableSoccer";

describe('Game', () => {
    test('it starts a game with two players', () => {
        expect(
            Game.start('arn0', 'Popeye')
        ).toEqual(
            new Game(new Player('arn0'), new Player('Popeye'), Score.playersHaveNotScored())
        );
    })

    test('it records the score at the end of the game', () => {
        const game = Game.start('arn0', 'Popeye');

        expect(
            game.recordScore(10, 1)
        ).toEqual(
            new Game(new Player('arn0'), new Player('Popeye'), new Score(10, 1))
        );
    })
});

describe('Score', () => {
    test('the score is 0 - 0 at the beginning of the game', () => {
        expect(Score.playersHaveNotScored()).toEqual(new Score(0, 0));
    })
});

describe('Team', () => {
    test('it builds a team of one player', () => {
        expect(Team.ofOnePlayer('arn0')).toEqual(new Team([new Player('arn0')]));
    })
});