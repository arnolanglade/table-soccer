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
    private static readonly MAX_SCORE = 10;
    private scores: Record<TeamColor, number> = {[TeamColor.Red]: 0, [TeamColor.Blue]: 0};

    constructor(redPlayerScore: number, bluePlayerScore: number) {
        this.scores[TeamColor.Red] = redPlayerScore;
        this.scores[TeamColor.Blue] = bluePlayerScore;
    }

    public static playersHaveNotScored(): Score {
        return new Score(0, 0);
    }

    public increase(team: TeamColor): Score {
        let scores = [this.scores[TeamColor.Red], this.scores[TeamColor.Blue]];
        scores[team] = scores[team] + 1;
        return new Score(scores[TeamColor.Red], scores[TeamColor.Blue]);
    }

    public canIncrease(team: TeamColor): boolean {
        return this.scores[team] < Score.MAX_SCORE;
    }

    public toState(): [number, number] {
        return [this.scores[TeamColor.Red], this.scores[TeamColor.Blue]];
    }
}

interface Event {
    toState(): string
}

export class GameStarted implements Event {
    constructor(public readonly redTeam: Team, public readonly blueTeam: Team) {}

    public toState(): string {
        return JSON.stringify({
            red: this.redTeam.toState(),
            blue: this.blueTeam.toState(),
        });
    }
}

export class GameEnded implements Event {
    constructor(public readonly redTeam: Team, public readonly blueTeam: Team,  public readonly score: Score) {}

    public toState(): string {
        return JSON.stringify({
            red: this.redTeam.toState(),
            blue: this.blueTeam.toState(),
            score: this.score.toState(),
        });
    }
}

export class GoalScored implements Event {
    constructor(public readonly teamColor: TeamColor, public readonly player: Player, public readonly score: Score) {}

    public toState() {
        return JSON.stringify({
            teamColor: this.teamColor,
            player: this.player,
            score: this.score.toState(),
        });
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

    public static fromEvents(events: Event[]): Game {
        let redTeam, blueTeam, score;
        events.forEach((event: Event) => {
            switch (true) {
                case event instanceof GameStarted:
                    redTeam = event.redTeam;
                    blueTeam = event.blueTeam;
                    break;
                case event instanceof GameEnded:
                    score = event.score;
                    break;
            }

        });

        return new Game(redTeam, blueTeam, score, events);
    }

    public goalScoredBy(player: Player): Game {
        const teamColor = this.redTeam.isTeammate(player) ? TeamColor.Red : TeamColor.Blue;
        const gameScore = this.gameScore.increase(teamColor);

        this.events.push(new GoalScored(teamColor, player, gameScore))

        if (!gameScore.canIncrease(teamColor)) {
            this.events.push(new GameEnded(this.redTeam, this.blueTeam, gameScore))
        }

        return new Game(
            this.redTeam,
            this.blueTeam,
            gameScore,
            this.events,
        );
    }

    public toState(): [[string, string]] {
        return this.events.map((event: Event) => ['Game', event.toState()]);
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

    public withGoalScoredEvent(player: Player, redTeamScore, blueTeamScore): aGame {
        const teamColor = this.redTeam.isTeammate(player) ? TeamColor.Red : TeamColor.Blue;
        this.events = [...this.events, new GoalScored(teamColor, player, new Score(redTeamScore, blueTeamScore))];
        return this;
    }

    public withGameEndedEvent(): aGame {
        this.events = [...this.events, new GameEnded(this.redTeam, this.blueTeam, this.gameScore)];
        return this;
    }

    public build(): Game {
        return new Game(this.redTeam, this.blueTeam, this.gameScore, this.events);
    }
}