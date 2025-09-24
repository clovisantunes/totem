import React from 'react';
import '../styles/screens/NoAppointmentScreen.css';

interface NoAppointmentScreenProps {
  cpf: string;
  loading: boolean;
  onAssistance: () => void;
  onRestart: () => void;
  serviceType?: 'assistencial' | 'trabalho';
}

const NoAppointmentScreen: React.FC<NoAppointmentScreenProps> = ({
  cpf,
  loading,
  onAssistance,
  onRestart
}) => {
  return (
    <div className="screen no-appointment-screen">
      <h2>Nenhuma Consulta Encontrada</h2>
      <p>Não encontramos uma consulta agendada para o CPF: <strong>{cpf}</strong></p>
      <p>Deseja falar com um atendente?</p>
      
      <div className="button-group">
        <button 
          className="btn btn-primary" 
          onClick={onAssistance}
          disabled={loading}
        >
          {loading ? <span className="loading"></span> : null}
          {loading ? 'Processando...' : 'Sim, Falar com Atendente'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onRestart}
          disabled={loading}
        >
          Não, Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default NoAppointmentScreen;