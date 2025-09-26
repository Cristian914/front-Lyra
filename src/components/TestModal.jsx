import React, { useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal'; // ajuste o caminho conforme o seu projeto

export const TestModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    console.log('Confirmou!');
    alert('Confirmou!');
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log('Cancelou!');
    alert('Cancelou!');
    setModalVisible(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setModalVisible(true)}>Abrir Modal</button>

      <ConfirmationModal
        visible={modalVisible}
        message="Você confirma essa ação?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
