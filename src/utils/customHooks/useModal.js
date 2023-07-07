import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProp, setModalProp] = useState(null);

  const openModal = (prop) => {
    setModalProp(prop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalProp(null);
  };

  return { isModalOpen, modalProp, openModal, closeModal };
};

export default useModal;
