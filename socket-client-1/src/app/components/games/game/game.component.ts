import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @Input() game: Game | null = null;
  @Output() makeMoveEmitter = new EventEmitter();
  @Output() resetGameEmitter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  makeMove(player: number, choice: string) {
    this.makeMoveEmitter.emit({
      gameId: this.game?.id,
      player: player,
      choice: choice
    });
  }

  resetGame() {
    this.resetGameEmitter.emit({
      gameId: this.game?.id
    });
  }

  displayWin() {
    let winText = '';
    if (this.game?.player1.choice === 'rock') {
      switch (this.game?.player2.choice) {
        case 'rock':
          winText = 'It\'s a tie';
          break;

        case 'scissors':
          winText = 'Player 1 wins';
          break;

        case 'paper':
          winText = 'Player 2 wins';
          break;
      }
      
    } else if (this.game?.player1.choice === 'paper') {
      switch (this.game?.player2.choice) {
        case 'paper':
          winText = 'It\'s a tie';
          break;

        case 'rock':
          winText = 'Player 1 wins';
          break;

        case 'scissors':
          winText = 'Player 2 wins';
          break;
      }
      
    } else {
      switch (this.game?.player2.choice) {
        case 'scissors':
          winText = 'It\'s a tie';
          break;

        case 'paper':
          winText = 'Player 1 wins';
          break;

        case 'rock':
          winText = 'Player 2 wins';
          break;
      }
    }

    return winText;
  }
  

  
}
