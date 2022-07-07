import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { GameComponent } from './components/games/game/game.component';
import { GameListComponent } from './components/games/game-list/game-list.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3000', options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
