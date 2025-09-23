import React, { useEffect } from 'react';
import type { TicketInfo } from '../../types';
import '../styles/screens/TicketScreen.css';

interface TicketScreenProps {
  ticketInfo: TicketInfo;
  hasAppointment: boolean;
  onRestart: () => void;
}

const TicketScreen: React.FC<TicketScreenProps> = ({
  ticketInfo,
  hasAppointment,
  onRestart
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRestart();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onRestart]);

  return (
    <div className="screen ticket-screen">
      <h2>Seu Ticket foi Emitido</h2>
      <p>Por favor, aguarde ser chamado pelo número do ticket.</p>
      
      <div className="ticket">
        <h3>Ticket de Atendimento</h3>
        <div className="ticket-info">
          <p><strong>CPF:</strong> {ticketInfo.cpf}</p>
          <p><strong>Tipo:</strong> {hasAppointment ? 'Confirmação de Chegada' : 'Atendimento'}</p>
          <p><strong>Data:</strong> {ticketInfo.timestamp.toLocaleDateString('pt-BR')}</p>
          <p><strong>Hora:</strong> {ticketInfo.timestamp.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}</p>
        </div>
        <div className="ticket-number">{ticketInfo.number}</div>
      </div>
      
      <div className="instructions">
        <p><strong>Instruções:</strong></p>
        <p>1. Aguarde na área de espera</p>
        <p>2. Você será chamado pelo número do ticket</p>
        <p>3. Mantenha este número em segurança</p>
      </div>
      
      <div className="countdown">
        <p>Voltando para tela inicial em: <span className="countdown-number">5</span> segundos</p>
      </div>
    </div>
  );
};

export default TicketScreen;