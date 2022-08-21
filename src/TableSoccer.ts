type Nickname = string;

export class Team {
    constructor(private players: Player[]) {}

    public static ofOnePlayer(nickname: Nickname): Team {
        return new Team([new Player(nickname)]);
    }

    public static ofTwoPlayer(attackerNickname: Nickname, defenderNickname: Nickname): Team {
        return new Team([new Player(attackerNickname), new Player(defenderNickname)]);
    }
}

export class Player {
    constructor(private nickname: Nickname) {}
}

export class Score {
    constructor(private redPlayerScore: number, private bluePlayerScore: number) {}

    public static playersHaveNotScored(): Score {
        return new Score(0, 0);
    }
}

export class Game {
    constructor(private redTeam: Team,  private blueTeam: Team, private gameScore: Score) {}

    public static startOneVersusOne(
        redPlayerNickname: Nickname,
        bluePlayerNickname: Nickname
    ): Game {
        return new Game(
            Team.ofOnePlayer(redPlayerNickname),
            Team.ofOnePlayer(bluePlayerNickname),
            Score.playersHaveNotScored()
        );
    }

    public static startTwoVersusTwo(
        redAttackerNickname: Nickname,
        redDefenderNickname: Nickname,
        blueAttackerNickname: Nickname,
        blueDefenderNickname: Nickname
    ): Game {
        return new Game(
            Team.ofTwoPlayer(redAttackerNickname, redDefenderNickname),
            Team.ofTwoPlayer(blueAttackerNickname, blueDefenderNickname),
            Score.playersHaveNotScored()
        );
    }

    public recordScore(redPlayerScore: number, bluePlayerScore: number) {
        return new Game(this.redTeam, this.blueTeam, new Score(redPlayerScore, bluePlayerScore));
    }
}

/** @internal */
export class aGame {
    private redTeam: Team
    private blueTeam: Team
    private gameScore: Score

    constructor() {
        this.redTeam = Team.ofOnePlayer('arn0');
        this.blueTeam = Team.ofOnePlayer('Popeye');
        this.gameScore = new Score(0, 0)
    }

    public withRedPlayer(nickname: Nickname): aGame {
        this.redTeam = Team.ofOnePlayer(nickname);
        return this;
    }

    public withBluePlayer(nickname: Nickname): aGame {
        this.blueTeam = Team.ofOnePlayer(nickname);
        return this;
    }

    public withRedTeam(attackerNickname: Nickname, defenderNickname: Nickname): aGame {
        this.redTeam = Team.ofTwoPlayer(attackerNickname, defenderNickname);
        return this;
    }

    public withBlueTeam(attackerNickname: Nickname, defenderNickname: Nickname): aGame {
        this.blueTeam = Team.ofTwoPlayer(attackerNickname, defenderNickname);
        return this;
    }

    public withScore(redScore, blueCore): aGame {
        this.gameScore = new Score(redScore, blueCore);
        return this;
    }

    public build(): Game {
        return new Game(this.redTeam, this.blueTeam, this.gameScore);
    }
}