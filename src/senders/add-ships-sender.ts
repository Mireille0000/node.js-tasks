import { WebSocket } from "ws";
import { StartGameData } from "../interfaces/ships-interfaces";
import { ResponseWS } from "../interfaces/player-interfaces";

const addShipSender = (ws: WebSocket, data: string, players: ResponseWS[], playersShips: StartGameData[]) => {
    const shipsPositionsParsed = JSON.parse(data);
    const { ships, indexPlayer } = shipsPositionsParsed;

    // add_ships
    const shipsData: StartGameData = {
        ships: ships,
        currentPlayerIndex: indexPlayer,
    }
    const responseStartGame = {
        type: "start_game",
        data: JSON.stringify(shipsData),
        id: 0
    }

    // turn
    const responseTurn = {
        type: "turn",
        data: JSON.stringify({currentPlayer: indexPlayer}),
        id: 0,
    }
    players.push(responseStartGame);
    if (players.length < 3) {
        playersShips.push(shipsData);
        ws.send(JSON.stringify(responseTurn));
        console.log("Game!");
        players.forEach((player) => ws.send(JSON.stringify(player)));
    } else {
        console.log("Wait a minute...");
    }
    console.log('Another type: add_ships');
}

export default addShipSender