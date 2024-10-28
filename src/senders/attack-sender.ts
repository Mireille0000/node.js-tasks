import { WebSocket } from "ws";
import { StartGameData } from "../interfaces/ships-interfaces";

const attackSender = (ws: WebSocket, data: string, playersShips: StartGameData[]) => {
    const attackDataParsed = JSON.parse(data);
    console.log(attackDataParsed);
    const { gameId, x, y, indexPlayer } = attackDataParsed
    interface Position {x: number, y: number}
    const attackedPoint: Position = {x: x, y: y};
    let status!: string;
    const enemyFleet = playersShips.find((fleet) => fleet.currentPlayerIndex !== indexPlayer) as StartGameData;
    const enemyFleetPositions = enemyFleet.ships.reduce((acc: string[], {position}) => {
        acc.push(JSON.stringify(position))
        return acc;
    }, []);

    const enemyShipLength = enemyFleet.ships.reduce((acc: {length: number}[], {length}) => {
        acc.push({length: length})
        return acc;
    }, []);
    const shot = (point: string) => point === JSON.stringify(attackedPoint);

    const responseTurn = {
        type: "turn",
        data: JSON.stringify({currentPlayer: enemyFleet.currentPlayerIndex}),
        id: 0,
    }
    const touchedShip = enemyFleetPositions.indexOf(JSON.stringify(attackedPoint));
    
    if (
            enemyFleetPositions.some(shot) && 
            enemyFleet.ships[touchedShip].length &&
            enemyFleet.ships[touchedShip].length > 2
        ) 
    {
        status = "shot";
    } else if (
        enemyFleetPositions.some(shot) &&
        enemyFleet.ships[touchedShip].length &&
        enemyFleet.ships[touchedShip].length === 1) {
        status = "killed";
    } else {
        status = "miss";
    }

    const attackData = {
        position: attackedPoint,
        currentPlayer: indexPlayer,
        status: status,
    }

    const responseAttack = {
        type: "attack",
        data: JSON.stringify(attackData),
        id: 0,
    }

    if (status === "shot") {
        ws.send(JSON.stringify(responseAttack));
    } else if (status === "miss" || status === "killed") {
        ws.send(JSON.stringify(responseAttack));
        ws.send(JSON.stringify(responseTurn));
    }
    console.log('Another type: attack');
}

export default attackSender;