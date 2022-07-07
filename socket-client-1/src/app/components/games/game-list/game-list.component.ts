import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Game } from '../../../models/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  currentGame: Game | null = null;
  games: Game[] = [];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.gamesSent.subscribe((payload) => {
      this.games = payload.games;
    });

    this.gameService.gameCreated.subscribe((payload) => {
      this.games.push(payload.game);
    });

    this.gameService.gameLoaded.subscribe((payload) => {
      this.currentGame = payload.game;
    });

    this.gameService.moveMade.subscribe((payload) => {
      // update game state
      this.currentGame = payload.game;
      // console.log('updated game', this.currentGame);
    });

    this.gameService.gameReset.subscribe((payload) => {
      // update game state
      this.currentGame = payload.game;
      // console.log('updated game', this.currentGame);
    });
  }

  loadGame(gameId: string) {
    this.gameService.getGame(gameId);
    this.gameService.joinGame(gameId);
  }

  newGame() {
    this.gameService.createGame();
  }

  makeMove(payload: any) {
    this.gameService.makeMove(payload.gameId, payload.player, payload.choice);
  }

  resetGame(payload: any) {
    this.gameService.resetGame(payload.gameId);
  }
}
