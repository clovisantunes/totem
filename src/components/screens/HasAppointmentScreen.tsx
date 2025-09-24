import React from 'react';
import '../styles/screens/HasAppointmentScreen.css';

interface HasAppointmentScreenProps {
  cpf: string;
  loading: boolean;
  onConfirm: () => void;
  onAssistance: () => void;
  serviceType?: 'assistencial' | 'trabalho';
}

interface ConsultaInfo {
 nome: string;
  tipo: string;
  medico: string;
  especialidade: string;
  data: string;
  horario: string;
  sala: string;
}

const HasAppointmentScreen: React.FC<HasAppointmentScreenProps> = ({
  cpf,
  loading,
  onConfirm,
  onAssistance
}) => {
  const consultasPorCPF: Record<string, ConsultaInfo> = {
    '04364979058': {
      nome: 'Clovis Antunes',
      tipo: 'Consulta de Retorno',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      data: '25/01/2024',
      horario: '14:30',
      sala: 'Sala 205'
    },
    '89790014015': {
      nome: 'Dimitrio Martins de Andrade',
      tipo: 'Consulta Clinica',
      medico: 'Dra. Gabriel Porto',
      especialidade: 'Clínica Geral',
      data: '25/01/2024',
      horario: '15:45',
      sala: 'Sala 108'
    }
  };

  const consultaInfo = consultasPorCPF[cpf.replace(/\D/g, '')] || {
    nome: 'Paciente',
    tipo: 'Consulta Médica',
    medico: 'Médico',
    especialidade: 'Especialidade',
    data: 'Data',
    horario: 'Horário',
    sala: 'Sala'
  };

  return (
    <div className="screen has-appointment-screen">
      <h2>Consulta Encontrada</h2>
      
      <div className="consulta-details">
        <div className="paciente-info">
          <h3>Paciente: {consultaInfo.nome}</h3>
          <p><strong>CPF:</strong> {cpf}</p>
        </div>
        
        <div className="consulta-info">
          <h4>Detalhes da Consulta:</h4>
          <p><strong>Tipo:</strong> {consultaInfo.tipo}</p>
          <p><strong>Médico:</strong> {consultaInfo.medico}</p>
          <p><strong>Especialidade:</strong> {consultaInfo.especialidade}</p>
          <p><strong>Data:</strong> {consultaInfo.data}</p>
          <p><strong>Horário:</strong> {consultaInfo.horario}</p>
          <p><strong>Local:</strong> {consultaInfo.sala}</p>
        </div>
      </div>
      
      <p className="instruction-text">Por favor, confirme sua chegada ou solicite atendimento.</p>
      
      <div className="button-group">
        <button 
          className="btn btn-success" 
          onClick={onConfirm}
          disabled={loading}
        >
          {loading ? <span className="loading"></span> : null}
          {loading ? 'Processando...' : 'Confirmar Chegada'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onAssistance}
          disabled={loading}
        >
          {loading ? <span className="loading"></span> : null}
          {loading ? 'Processando...' : 'Falar com Atendente'}
        </button>
      </div>
    </div>
  );
};

export default HasAppointmentScreen;