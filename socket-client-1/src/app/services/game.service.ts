import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { GameData, GameList } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gamesSent = this.socket.fromEvent<GameList>('gamesSent');
  gameCreated = this.socket.fromEvent<GameData>('gameCreated');
  gameLoaded = this.socket.fromEvent<GameData>('gameLoaded');
  moveMade = this.socket.fromEvent<GameData>('moveMade');
  gameReset = this.socket.fromEvent<GameData>('gameReset');

  constructor(private socket: Socket) { }
  
  getGame(gameId: string): void {
    this.socket.emit('getGame', { gameId });
  }

  createGame(): void {
    this.socket.emit('createGame');
  }

  joinGame(gameId: string): void {
    this.socket.emit('joinGame', { gameId });
  }

  makeMove(gameId: string, player: number, choice: string): void {
    this.socket.emit('makeMove', { gameId, player, choice });
  }

  resetGame(gameId: string): void {
    this.socket.emit('resetGame', { gameId });
  }
}
