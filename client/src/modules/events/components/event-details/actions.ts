import { BigNumber } from "ethers";

export enum ActionType {
  EventLoading = 'EVENT_LOADING',
  EventLoaded = 'EVENT_LOADED',
  TicketTransfering = 'TICKET_TRANSFERING',
  TicketTransfered = 'TICKET_TRANSFERED',
  Error='ERROR',
}

export type Action = 
  | EventLoadingAction
  | EventLoadedAction
  | ErrorAction
  | TicketTransferingAction
  | TicketTransferedAction;


export type EventLoadingAction = {
  type: ActionType.EventLoading;
};

export type EventLoadedAction = {
  type: ActionType.EventLoaded;
  tickets: number[];
  ticketPrice: BigNumber;
};

export type ErrorAction = {
  type: ActionType.Error;
  errorMessage: string;
};

export type TicketTransferingAction = {
  type: ActionType.TicketTransfering;
};

export type TicketTransferedAction = {
  type: ActionType.TicketTransfered;
};

const errorAction = (errorMessage: string): ErrorAction => ({
  type: ActionType.Error,
  errorMessage
});

export { errorAction };
