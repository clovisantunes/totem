export interface TotemState {
  currentScreen: 'initial' | 'cpf' | 'hasAppointment' | 'noAppointment' | 'ticket';
  cpf: string;
  hasAppointment: boolean;
  ticketNumber: number | null;
  loading: boolean;
  error: string;
  serviceType?: 'assistencial' | 'trabalho';
  ticketType?: 'confirmation' | 'assistance'; // Adicione esta linha
}

export interface TicketInfo {
  number: number;
  type: 'confirmation' | 'assistance';
  cpf: string;
  timestamp: Date;
  serviceType: 'assistencial' | 'trabalho';
}