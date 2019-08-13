export type AddFlashMessageType = (
  payload: FlashMessageType,
) => { type: string; payload: FlashMessageType };

export type FlashMessageType = {
  id?: string;
  type: string;
  text: string;
};
