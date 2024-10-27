type ShipType = "small"|"medium"|"large"|"huge";
type PlayerIndex = number | string;

export interface StartGameData {
    ships: [
        {
            position: {
                x: number,
                y: number,
            },
            direction: boolean,
            length: number,
            type: ShipType,
        }
    ],
    currentPlayerIndex: PlayerIndex,
}

