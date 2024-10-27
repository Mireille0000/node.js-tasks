type ids = number | string;

interface CreateGameData {
    idGame: ids;
    idPlayer: ids;
}

interface UpdateRoomStateData {
    roomId: ids,
    roomUsers: [
        {
            name: string,
            index: ids,
        }
    ]
}

export {CreateGameData, UpdateRoomStateData}