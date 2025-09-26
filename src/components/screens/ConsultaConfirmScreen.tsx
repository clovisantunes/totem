import React from 'react';
import '../styles/screens/ConsultaConfirmScreen.css';

interface ConsultaConfirmScreenProps {
  loading: boolean;
  onSim: () => void;
  onNao: () => void;
  onBack: () => void;
}

const ConsultaConfirmScreen: React.FC<ConsultaConfirmScreenProps> = ({
  loading,
  onSim,
  onNao,
  onBack
}) => {
  return (
    <div className="screen consulta-confirm-screen">
      <button className="back-button" onClick={onBack}>
        ← Voltar
      </button>
      
      <div className="confirm-container">
        <div className="confirm-icon">❓</div>
        
        <h2>Possui consulta agendada?</h2>
        
        <p className="confirm-description">
          Para atendimento mais rápido, confirme se você já possui uma consulta agendada em nossa clínica.
        </p>
        
        <div className="confirm-options">
          <button 
            className="confirm-btn sim-btn"
            onClick={onSim}
            disabled={loading}
          >
            {loading ? (
              <span className="loading"></span>
            ) : (
              <>
                <span className="btn-icon">✅</span>
                <span className="btn-text">Sim, tenho consulta</span>
              </>
            )}
            {loading && 'Processando...'}
          </button>
          
          <button 
            className="confirm-btn nao-btn"
            onClick={onNao}
            disabled={loading}
          >
            {loading ? (
              <span className="loading"></span>
            ) : (
              <>
                <span className="btn-icon">❌</span>
                <span className="btn-text">Preciso falar com a Recepção</span>
              </>
            )}
            {loading && 'Processando...'}
          </button>
        </div>
        
        <div className="confirm-instructions">
          <h4>Como funciona:</h4>
          <ul>
            <li><strong>Sim</strong>: Digite seu CPF para confirmar a consulta</li>
            <li><strong>Não</strong>: Falar com a recepção</li>
            <li>Ambas as opções garantem seu atendimento</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConsultaConfirmScreen;