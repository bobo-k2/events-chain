interface IEventInfo {
  id: number;
  name: string;
  venue: string;
  date: string;
  ticketPrice: string;
  ticketsCount: number;  
}

interface IEventDbInfo {
  name: string;
  venue: string;
  date: number;
  ticketPrice: string;
  contractAddress: string;
}


export type { IEventInfo, IEventDbInfo };