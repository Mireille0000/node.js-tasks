export interface ResponseWS {
    type: string;
    data: string;
    id: number;
  }

export interface ResponseRegData {
    name: string;
    index: string;
    error: boolean;
    errorText: string;
}

export interface ResponseUpdateWinnersData {
    name: string;
    wins: number;
}