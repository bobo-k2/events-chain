interface IEventInfo {
  id: number;
  name: string;
  venue: string;
  date: string;
  ticketPrice: number;
  ticketsCount: number;  
}

interface IEventDbInfo {
  name: string;
  venue: string;
  date: number;
  ticketPrice: number;
  contractAddress: string;
}


export type { IEventInfo, IEventDbInfo };