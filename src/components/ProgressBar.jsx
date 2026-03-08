import { useContext } from 'react';
import { BioContext } from '../context/BioContext';

export default function ProgressBar() {
  const { bioData } = useContext(BioContext);
  
  // Calculate completion percentage based on core fields
  const calculateProgress = () => {
    const fieldsToCheck = [
      bioData.personal.fullName, bioData.personal.dob, bioData.personal.gender,
      bioData.family.fatherName, bioData.family.motherName,
      bioData.education.degree, bioData.education.profession
    ];
    
    const filledFields = fieldsToCheck.filter(field => field && field.trim() !== '').length;
    const percentage = Math.round((filledFields / fieldsToCheck.length) * 100);
    return percentage;
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Profile Completion</h3>
          <p className="text-xs text-gray-500 mt-1">
            {progress === 100 ? "Ready to download!" : "Fill out core fields for a better biodata."}
          </p>
        </div>
        <span className="text-2xl font-black text-blue-600">{progress}%</span>
      </div>
      
      {/* The Bar Background */}
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        {/* The Animated Fill */}
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}