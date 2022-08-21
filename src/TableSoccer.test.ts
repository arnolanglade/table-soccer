import {Game, aGame, Player, Score, Team} from "./TableSoccer";

describe('Game', () => {
    test('it starts a one versus one game', () => {
        expect(
            Game.startOneVersusOne('arn0', 'Popeye')
        ).toEqual(
            new aGame().withRedPlayer('arn0')
                .withBluePlayer('Popeye')
                .withScore(0, 0)
                .withGameStartedEvent()
                .build()
        );
    })

    test('it starts a two versus two game', () => {
        expect(
            Game.startTwoVersusTwo('arn0', 'momos', 'Popeye', 'coco')
        ).toEqual(
            new aGame().withRedTeam('arn0', 'momos')
                .withBlueTeam('Popeye', 'coco')
                .withScore(0, 0)
                .withGameStartedEvent()
                .build()
        );
    })

    test('it records the score at the end of the game', () => {
        const game = new aGame().build();

        expect(
            game.recordScore(10, 1)
        ).toEqual(
            new aGame().withScore(10, 1)
                .withGameEndedEvent()
                .build()
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
        expect(Team.ofOnePlayer('arn0')).toEqual(new Team(['arn0']));
    })

    test('it builds a team of two players', () => {
        expect(Team.ofTwoPlayer('arn0', 'momos')).toEqual(new Team(['arn0', 'momos']));
    })
});