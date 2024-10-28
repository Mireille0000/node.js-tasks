type ids = number | string;

interface CreateGameData {
    idGame: ids;
    idPlayer: ids;
}

interface RoomUsers {
    name: string;
    index: ids;
}

interface UpdateRoomStateData {
    roomId: ids,
    roomUsers: RoomUsers [] | [],
}

export {CreateGameData, RoomUsers, UpdateRoomStateData}