export interface Player {
    name: string;
    choice: string;
}

export interface Game {
    id: string;
    player1: Player;
    player2: Player;
}

export interface GameList {
    games: Game[]
}

export interface GameData {
    game: Game
}