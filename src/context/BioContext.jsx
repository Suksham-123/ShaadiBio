import { createContext, useState, useEffect } from 'react';

export const BioContext = createContext();

export const BioProvider = ({ children }) => {
  // 1. Initialize state by checking for a saved draft first
  const [bioData, setBioData] = useState(() => {
    const savedDraft = localStorage.getItem('shaadibio_draft');
    if (savedDraft) {
      return JSON.parse(savedDraft);
    }
    // If no draft exists, load the blank default state
    return {
      personal: { fullName: '', dob: '', age: '', gender: '' },
      family: { fatherName: '', fatherOccupation: '', motherName: '', motherOccupation: '', siblings: '' },
      education: { degree: '', profession: '', income: '' },
      horoscope: { rashi: '', manglik: 'No' },
      photoUrl: null,
      templateId: 1,
      settings: { themeColor: 'blue', fontFamily: 'font-sans' } 
    };
  });

  // 2. The Auto-Save Engine: Every time bioData changes, save it silently!
  useEffect(() => {
    localStorage.setItem('shaadibio_draft', JSON.stringify(bioData));
  }, [bioData]);

  const updateBioData = (section, field, value) => {
    setBioData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  return (
    <BioContext.Provider value={{ bioData, setBioData, updateBioData }}>
      {children}
    </BioContext.Provider>
  );
};