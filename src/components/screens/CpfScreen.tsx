import React from 'react';
import '../styles/screens/CpfScreen.css';

interface CpfScreenProps {
  cpf: string;
  loading: boolean;
  error: string;
  onCpfChange: (cpf: string) => void;
  onCpfSubmit: (cpf: string) => void;
}

const CpfScreen: React.FC<CpfScreenProps> = ({
  cpf,
  loading,
  error,
  onCpfChange,
  onCpfSubmit
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCpfSubmit(cpf);
  };

  return (
    <div className="screen cpf-screen">
      <h2>Bem-vindo ao Atendimento</h2>
      <p>Por favor, digite seu CPF para verificar se você tem uma consulta agendada.</p>
      
      <form onSubmit={handleSubmit} className="cpf-form">
        <input
          type="text"
          className="cpf-input"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => onCpfChange(e.target.value)}
          maxLength={14}
          disabled={loading}
        />
        
        {error && <div className="error-message">{error}</div>}
        
        <button 
          type="submit"
          className="btn btn-primary" 
          disabled={loading || cpf.length < 14}
        >
          {loading ? <span className="loading"></span> : null}
          {loading ? 'Verificando...' : 'Verificar Consulta'}
        </button>
      </form>
    </div>
  );
};

export default CpfScreen;