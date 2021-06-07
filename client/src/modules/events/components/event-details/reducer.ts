import { BigNumber } from 'ethers';

import {
  Action,
  ActionType,
} from './actions';

const initialState: State = {
  tickets: [],
  ticketPrice: BigNumber.from('0'),
  errorMessage: '',
  isLoading: false
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.EventLoading:
      return {
        ...state,
        errorMessage: '',
        isLoading: true
      };
    case ActionType.EventLoaded:
      return {
        ...state,
        tickets: action.tickets,
        ticketPrice: action.ticketPrice,
        isLoading: false
      };
    case ActionType.TicketTransfering:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };
      case ActionType.TicketTransfered:
        return {
          ...state,
          isLoading: false,
        };
    case ActionType.Error:
      return {
        ...state,
        errorMessage: action.errorMessage,
        isLoading: false
      };
    default:
      return state;
  }
}

type State = {
  tickets: number[];
  ticketPrice: BigNumber;
  errorMessage: string;
  isLoading: boolean;
};

export { initialState, reducer };

