export type ScreenType = 
  | 'cpf' 
  | 'hasAppointment' 
  | 'noAppointment' 
  | 'confirm' 
  | 'ticket';

export interface TotemState {
  currentScreen: ScreenType;
  cpf: string;
  hasAppointment: boolean;
  ticketNumber: number | null;
  loading: boolean;
  error: string;
}

export interface TicketInfo {
  number: number;
  type: 'confirmation' | 'assistance';
  cpf: string;
  timestamp: Date;
}
