type Nickname = string;

export class Team {
    constructor(private players: Player[]) {}

    public static ofOnePlayer(nickname: Nickname): Team {
        return new Team([new Player(nickname)]);
    }

    public static ofTwoPlayer(strikerNickname: Nickname, fullbackNickname: Nickname): Team {
        return new Team([new Player(strikerNickname), new Player(fullbackNickname)]);
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
    constructor(private redPlayer: Player,  private bluePlayer: Player, private gameScore: Score) {}

    public static start(redPlayerNickname: Nickname, bluePlayerNickname: Nickname): Game {
        return new Game(new Player(redPlayerNickname), new Player(bluePlayerNickname), Score.playersHaveNotScored());
    }

    public recordScore(redPlayerScore: number, bluePlayerScore: number) {
        return new Game(this.redPlayer, this.bluePlayer, new Score(redPlayerScore, bluePlayerScore));
    }
}
