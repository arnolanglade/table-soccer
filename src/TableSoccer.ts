type Nickname = string;

export class Player {
    constructor(private nickname: Nickname) {}
}

export class Game {
    constructor(private redPlayer: Player,  private bluePlayer: Player) {}

    public static start(redPlayerNickname: Nickname, bluePlayerNickname: Nickname): Game {
        return new Game(new Player(redPlayerNickname), new Player(bluePlayerNickname));
    }
}
