const express = require("express");
const http = require("http");
const app = express();
const socket = require('socket.io');
const shortid = require('shortid');
const Game = require('./game');

var server = http.createServer(app);
const io = socket(server, {
    cors: {
        origin: 'http://localhost:4200'
    }
});

let games = [];

const findGame = async function(gameId) {
    return games.find((game) => {
        return game.id === gameId;
    });
}
console.log('setting up sockets');

io.on('connection', (socket) => {
    console.log('connected - sending games');
    socket.emit('gamesSent', { games: games });
    let previousRoomId;

    socket.on('getGame', async (payload) => {
        const game = await findGame(payload.gameId);

        socket.emit('gameLoaded', { game: game });
    });

    socket.on('createGame', () => {
        const randId = shortid.generate(); 
        const newGame = new Game(randId);

        games.push(newGame);
        // emit newly created game to all connected clients 
        io.emit('gameCreated', { game: newGame }); 
    });  

    socket.on('joinGame', async (payload) => { 
        const gameId = payload.gameId; 

        // join a room/channel for specific game
        if (previousRoomId) {
            socket.leave(previousRoomId);
        }
        socket.join(gameId);
        previousRoomId = gameId;

        // now you are subscribed to all events for that game
    }); 

    socket.on('leaveGame', (payload) => {  
        const gameId = payload.gameId; 

        // leave the game 
        socket.leave(gameId);

        // if you joined the room before, now you are not 
    });

    socket.on('makeMove', async (payload) => {
        const gameId = payload.gameId;
        const player = payload.player;
        const choice = payload.choice;
    
        // save choice to game
        const game = await findGame(gameId);
        game.saveChoice(player, choice);
       
        // emit new game state to all subscribed players
        io.to(gameId).emit('moveMade', { game: game });
    
        // emit new game state to all subscribed players except the sender
        // socket.to(gameId).emit('moveMade', { game: game });
    });

    socket.on('resetGame', async (payload) => {
        const gameId = payload.gameId;
    
        // save choice to game
        const game = await findGame(gameId);
        game.resetGame();
       
        // emit new game state to all subscribed players
        io.to(gameId).emit('gameReset', { game: game });
    
        // emit new game state to all subscribed players except the sender
        // socket.to(gameId).emit('moveMade', { game: game });
    });
});

const data = {
    app: app,
    server: server,
    io: io
};

module.exports = data;
