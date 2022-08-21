export type Player = string;

export enum TeamColor {
    Red,
    Blue
}

export class Team {
    constructor(private players: Player[]) {}

    public static ofOnePlayer(player: Player): Team {
        return new Team([player]);
    }

    public static ofTwoPlayer(attacker: Player, defender: Player): Team {
        return new Team([attacker, defender]);
    }

    public isTeammate(player: Player): boolean{
        return this.players.includes(player);
    }

    public toState(): [string, string] {
        return this.players.reduce(
            (players: string[], player: Player, index: number) => {
                players[index] = player;
                return players;
            },
            ['', '']
        );
    }
}

export class Score {
    private scores: Record<TeamColor, number> = {[TeamColor.Red]: 0, [TeamColor.Blue]: 0};

    constructor(redPlayerScore: number, bluePlayerScore: number) {
        this.scores[TeamColor.Red] = redPlayerScore;
        this.scores[TeamColor.Blue] = bluePlayerScore;
    }

    public static playersHaveNotScored(): Score {
        return new Score(0, 0);
    }

    public increase(team: TeamColor): Score {
        this.scores[team]++
        return new Score(this.scores[TeamColor.Red], this.scores[TeamColor.Blue]);
    }

    public toState(): [number, number] {
        return [this.scores[TeamColor.Red], this.scores[TeamColor.Blue]];
    }
}

interface Event {}

export class GameStarted implements Event {
    constructor(private redTeam: Team, private blueTeam: Team) {}
}

export class GameEnded implements Event {
    constructor(private redTeam: Team, private blueTeam: Team,  private score: Score) {}
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

    public goalScoredBy(player: Player): Game {
        return new Game(
            this.redTeam,
            this.blueTeam,
            new Score(1, 0),
            [],
        );
    }

    public toState(): [string, string, string, string, number, number] {
        return [...this.redTeam.toState(), ...this.blueTeam.toState(), ...this.gameScore.toState()];
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