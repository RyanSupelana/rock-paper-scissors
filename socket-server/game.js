class Game {
    constructor(id) {
        this.id = id;
        this.player1 = {
            choice: null
        };
        this.player2 = {
            choice: null
        };
    }

    saveChoice(player, choice) {
        if (player === 1) {
            this.player1.choice = choice;
        } else {
            this.player2.choice = choice;
        }
    }

    resetGame() {
        this.player1.choice = null;
        this.player2.choice = null;
    }
}

module.exports = Game;