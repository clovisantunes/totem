import React, { useEffect, useState } from 'react';
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
  pago: boolean;
  reconsulta: boolean;
}

const HasAppointmentScreen: React.FC<HasAppointmentScreenProps> = ({
  cpf,
  loading,
  onConfirm,
  onAssistance
}) => {
  const [countdown, setCountdown] = useState(5);
  const [autoRedirect, setAutoRedirect] = useState(false);

  const consultasPorCPF: Record<string, ConsultaInfo> = {
    '04364979058': {
      nome: ' EX: Usuario Teste Pago',
      tipo: 'Consulta de Rotina',
      medico: 'Dra. Tais',
      especialidade: 'Endocrinologia',
      data: '25/01/2024',
      horario: '14:30',
      sala: 'Sala 205',
      pago: true,
      reconsulta: false
    },
    '89790014015': {
      nome: ' EX: Dimitrio Martins de Andrade',
      tipo: 'Consulta Clínica',
      medico: 'Dr. Gabriel Porto',
      especialidade: 'Clínica Geral',
      data: '25/01/2024',
      horario: '15:45',
      sala: 'Sala 108',
      pago: true,
      reconsulta: false
    },
    '69163915880': {
      nome: 'EX: Paciente Reconsulta',
      tipo: 'Reconsulta',
      medico: 'Dr. Carlos Silva',
      especialidade: 'Cardiologia',
      data: '25/01/2024',
      horario: '16:30',
      sala: 'Sala 301',
      pago: false,
      reconsulta: true
    },
    '70367617331': {
      nome: 'EX: Paciente Não Pago',
      tipo: 'Consulta Nova',
      medico: 'Dra. Ana Oliveira',
      especialidade: 'Dermatologia',
      data: '26/01/2024',
      horario: '09:00',
      sala: 'Sala 102',
      pago: false,
      reconsulta: false
    }
  };

  const consultaInfo = consultasPorCPF[cpf.replace(/\D/g, '')] || {
    nome: 'EX:Paciente',
    tipo: 'Consulta Médica',
    medico: 'Médico',
    especialidade: 'Especialidade',
    data: 'Data',
    horario: 'Horário',
    sala: 'Sala',
    pago: false,
    reconsulta: false
  };

  const mostrarBotaoConfirmar = consultaInfo.pago || consultaInfo.reconsulta;
  const consultaNaoPaga = !consultaInfo.pago && !consultaInfo.reconsulta;

  useEffect(() => {
    if (consultaNaoPaga) {
      setAutoRedirect(true);
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onAssistance();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [consultaNaoPaga, onAssistance]);

  if (consultaNaoPaga && autoRedirect) {
    return (
      <div className="screen has-appointment-screen">
        <div className="consulta-nao-paga-container">          
          <div className="consulta-details">
            <div className="paciente-info">
              <h3>Paciente: {consultaInfo.nome}</h3>
              <p><strong>CPF:</strong> {cpf}</p>
              <div className="status-consulta">
              </div>
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

          <div className="countdown-message">
            <div className="countdown-display">
              <span className="countdown-number">{countdown}</span>
              <span className="countdown-text">segundos</span>
            </div>
            <p className="info-text">
              Aguarde, seu ticket será emitido automaticamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="screen has-appointment-screen">
      <h2>Consulta Encontrada</h2>
      
      <div className="consulta-details">
        <div className="paciente-info">
          <h3>Paciente: {consultaInfo.nome}</h3>
          <p><strong>CPF:</strong> {cpf}</p>
          <div className="status-consulta">
            {!consultaInfo.reconsulta && (
              <span className={`status-badge ${consultaInfo.pago ? 'pago' : 'nao-pago'}`}>
                {consultaInfo.pago ? '✅ Pré-Pago' : '❌ Não pago'}
              </span>
            )}
            
            {consultaInfo.reconsulta && (
              <span className="status-badge reconsulta">
                🔄 Reconsulta
              </span>
            )}
          </div>
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
      
      <div className="instruction-text">
        {consultaInfo.reconsulta ? (
          <p>Deseja confirmar chegada e aguardar atendimento médico</p>
        ) : consultaInfo.pago ? (
          <p>Deseja confirmar chegada e aguardar atendimento médico?</p>
        ) : (
          <p>Consulta não paga - necessário falar com atendente para regularização.</p>
        )}
      </div>
      
      <div className="button-group">
        {mostrarBotaoConfirmar && (
          <button 
            className="btn btn-success" 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="loading"></span> : null}
            {loading ? 'Processando...' : 'Sim, Confirmar Consulta'}
          </button>
        )}
        
        <button 
          className="btn btn-secondary" 
          onClick={onAssistance}
          disabled={loading}
        >
          {loading ? <span className="loading"></span> : null}
          {loading ? 'Processando...' : 'Falar com Atendente'}
        </button>
      </div>

      <div className="info-message">
        {consultaInfo.reconsulta && !consultaInfo.pago && (
          <p className="info-text">
            ℹ️ Consulta de retorno - confirmação liberada.
          </p>
        )}
      </div>
    </div>
  );
};

export default HasAppointmentScreen;