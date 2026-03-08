import { useContext } from 'react';
import { BioContext } from '../context/BioContext';

export default function FamilyDetailsForm() {
  const { bioData, updateBioData } = useContext(BioContext);
  const { family } = bioData;

  const handleChange = (e) => {
    updateBioData('family', e.target.name, e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">2. Family Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
          <input type="text" name="fatherName" value={family.fatherName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter father's name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Father's Occupation</label>
          <input type="text" name="fatherOccupation" value={family.fatherOccupation} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Business, Retired" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
          <input type="text" name="motherName" value={family.motherName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter mother's name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Occupation</label>
          <input type="text" name="motherOccupation" value={family.motherOccupation} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Homemaker, Teacher" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Siblings Details</label>
          <textarea name="siblings" value={family.siblings} onChange={handleChange} rows="2" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 1 Brother (Married), 1 Sister (Unmarried)"></textarea>
        </div>
      </div>
    </div>
  );
}