import {Game, aGame, Player, Score, Team, TeamColor} from "./TableSoccer";

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

    test('it records a gaol scored by a registered player', () => {
        const game = new aGame()
            .withRedPlayer('arn0')
            .withBluePlayer('Popeye')
            .withScore(0, 0)
            .build();

        expect(game.goalScoredBy('arn0')).toEqual(
            new aGame()
                .withRedPlayer('arn0')
                .withBluePlayer('Popeye')
                .withScore(1, 0)
            .build()
        );
    })

    test('it turns a game to its state', () => {
        const game = new aGame()
            .withRedTeam('arn0', 'momos')
            .withBlueTeam('Popeye', 'coco')
            .withScore(10, 1)
            .build();

        expect(
            game.toState()
        ).toEqual(
            ['arn0', 'momos', 'Popeye', 'coco', 10, 1]
        );
    })
});

describe('Score', () => {
    test('the score is 0 - 0 at the beginning of the game', () => {
        expect(Score.playersHaveNotScored()).toEqual(new Score(0, 0));
    })

    test('it increase the score for a team', () => {
        expect(new Score(5, 5).increase(TeamColor.Red)).toEqual(
            new Score(6, 5)
        );
    })

    test('it turns a score to its state', () => {
        expect(new Score(10, 5).toState() ).toEqual(
            [10, 5]
        );
    })
});

describe('Team', () => {
    test('it builds a team of one player', () => {
        expect(Team.ofOnePlayer('arn0')).toEqual(new Team(['arn0']));
    })

    test('it builds a team of two players', () => {
        expect(Team.ofTwoPlayer('arn0', 'momos')).toEqual(new Team(['arn0', 'momos']));
    })

    test('it turns a two players team to its state', () => {
        expect(
            Team.ofTwoPlayer('arn0', 'momos').toState()
        ).toEqual(
            ['arn0', 'momos']
        );
    })

    test('it turns a one player team to its state', () => {
        expect(
            Team.ofOnePlayer('arn0').toState()
        ).toEqual(
            ['arn0', '']
        );
    })
});