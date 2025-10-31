import React, { createContext, useState } from 'react';
import { subjects as initialSubjects } from '../data/mockData';

// Cria o contexto que vai guardar a lista de matérias
export const SubjectsContext = createContext();

// Cria o componente "Provedor" que vai disponibilizar a lista para as telas
export const SubjectsProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(initialSubjects);

  return (
    <SubjectsContext.Provider value={{ subjects, setSubjects }}>
      {children}
    </SubjectsContext.Provider>
  );
};