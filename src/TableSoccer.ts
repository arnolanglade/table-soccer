interface Event {}

export class GameStarted implements Event {
    constructor(private redTeam: Team, private blueTeam: Team) {}
}

export class GameEnded implements Event {
    constructor(private redTeam: Team, private blueTeam: Team,  private score: Score) {}
}

export type Player = string;

export class Team {
    constructor(private players: Player[]) {}

    public static ofOnePlayer(player: Player): Team {
        return new Team([player]);
    }

    public static ofTwoPlayer(attacker: Player, defender: Player): Team {
        return new Team([attacker, defender]);
    }
}

export class Score {
    constructor(private redPlayerScore: number, private bluePlayerScore: number) {}

    public static playersHaveNotScored(): Score {
        return new Score(0, 0);
    }
}

export class Game {
    constructor(
        private redTeam: Team,
        private blueTeam: Team,
        private gameScore: Score,
        private events: Event[] = []
    ) {}

    public static startOneVersusOne(
        redPlayer: Player,
        bluePlayer: Player
    ): Game {
        const redTeam = Team.ofOnePlayer(redPlayer);
        const blueTeam = Team.ofOnePlayer(bluePlayer);

        return new Game(
            redTeam,
            blueTeam,
            Score.playersHaveNotScored(),
            [new GameStarted(redTeam, blueTeam)],
        );
    }

    public static startTwoVersusTwo(
        redAttacker: Player,
        redDefender: Player,
        blueAttacker: Player,
        blueDefender: Player
    ): Game {
        const redTeam = Team.ofTwoPlayer(redAttacker, redDefender);
        const blueTeam = Team.ofTwoPlayer(blueAttacker, blueDefender);

        return new Game(
            redTeam,
            blueTeam,
            Score.playersHaveNotScored(),
            [new GameStarted(redTeam, blueTeam)],
        );
    }

    public recordScore(redPlayerScore: number, bluePlayerScore: number) {
        const score = new Score(redPlayerScore, bluePlayerScore);

        return new Game(
            this.redTeam,
            this.blueTeam,
            score,
            [new GameEnded(this.redTeam, this.blueTeam, score)],
        );
    }
}

/** @internal */
export class aGame {
    private redTeam: Team
    private blueTeam: Team
    private gameScore: Score
    private events: Event[] = []

    constructor() {
        this.redTeam = Team.ofOnePlayer('arn0');
        this.blueTeam = Team.ofOnePlayer('Popeye');
        this.gameScore = new Score(0, 0)
    }

    public withRedPlayer(player: Player): aGame {
        this.redTeam = Team.ofOnePlayer(player);
        return this;
    }

    public withBluePlayer(player: Player): aGame {
        this.blueTeam = Team.ofOnePlayer(player);
        return this;
    }

    public withRedTeam(attacker: Player, defender: Player): aGame {
        this.redTeam = Team.ofTwoPlayer(attacker, defender);
        return this;
    }

    public withBlueTeam(attacker: Player, defender: Player): aGame {
        this.blueTeam = Team.ofTwoPlayer(attacker, defender);
        return this;
    }

    public withScore(redScore, blueCore): aGame {
        this.gameScore = new Score(redScore, blueCore);
        return this;
    }

    public withGameStartedEvent(): aGame {
        this.events = [new GameStarted(this.redTeam, this.blueTeam)];
        return this;
    }

    public withGameEndedEvent(): aGame {
        this.events = [new GameEnded(this.redTeam, this.blueTeam, this.gameScore)];
        return this;
    }

    public build(): Game {
        return new Game(this.redTeam, this.blueTeam, this.gameScore, this.events);
    }
}