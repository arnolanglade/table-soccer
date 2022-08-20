import {Game, Player} from "./TableSoccer";

describe('Game', () => {
    test('it start a game with two players', () => {
        expect(
            Game.start('arn0', 'Popeye')
        ).toEqual(
            new Game(new Player('arn0'), new Player('Popeye'))
        );
    })
});