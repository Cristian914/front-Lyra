import React from 'react';

export const ConfirmationModal = ({ visible, onConfirm, onCancel, message }) => {
  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <p style={{ marginBottom: '20px' }}>{message || "Tem certeza que deseja continuar?"}</p>
        <button
          onClick={() => {
            console.log('[DEBUG] Botão "Sim" clicado no modal');
            onConfirm();
          }}
          style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer' }}
        >
          Sim
        </button>
        <button
          onClick={() => {
            console.log('[DEBUG] Botão "Cancelar" clicado no modal');
            onCancel();
          }}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
