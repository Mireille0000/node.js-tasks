type CurrentPlayer = number | string;
type Status = "miss"|"killed"|"shot";

interface AttackFeedbackData {
    position: {
        x: number,
        y: number,
    },
    currentPlayer: CurrentPlayer,
    status: Status
}

interface PlayerTurnData {
    currentPlayer: CurrentPlayer,
}

interface FinishGameData {
    winPlayer: CurrentPlayer;
}

export { AttackFeedbackData, PlayerTurnData, FinishGameData }