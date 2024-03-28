export type newDeckResp = {
    "success": boolean;
    "deck_id": string;
    "shuffled": boolean;
    "remaining": number;
}

export type card = {
    "code": string;
    "image": string;
    "images": Record<string,string>
    "value": string;
    "suit": string;
}