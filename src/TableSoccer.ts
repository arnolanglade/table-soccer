type Nickname = string;

export class Player {
    constructor(private nickname: Nickname) {}
}

export class Score {
    constructor(private redPlayerScore: number, private bluePlayerScore: number) {}

    public static empty(): Score {
        return new Score(0, 0);
    }
}

export class Game {
    constructor(private redPlayer: Player,  private bluePlayer: Player, private gameScore: Score) {}

    public static start(redPlayerNickname: Nickname, bluePlayerNickname: Nickname): Game {
        return new Game(new Player(redPlayerNickname), new Player(bluePlayerNickname), Score.empty());
    }
}
