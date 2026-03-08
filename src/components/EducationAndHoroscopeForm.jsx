import { useContext } from 'react';
import { BioContext } from '../context/BioContext';

export default function EducationAndHoroscopeForm() {
  const { bioData, updateBioData } = useContext(BioContext);
  const { education, horoscope } = bioData;

  const handleEduChange = (e) => updateBioData('education', e.target.name, e.target.value);
  const handleHoroChange = (e) => updateBioData('horoscope', e.target.name, e.target.value);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      
      {/* Education & Profession Section */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">3. Education & Profession</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Highest Degree</label>
          <input type="text" name="degree" value={education.degree} onChange={handleEduChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., B.Tech, MBA" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profession / Job Title</label>
          <input type="text" name="profession" value={education.profession} onChange={handleEduChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Software Engineer" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Income</label>
          <input type="text" name="income" value={education.income} onChange={handleEduChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., 12 LPA (Optional)" />
        </div>
      </div>

      {/* Optional Horoscope Section */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">4. Horoscope Details (Optional)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rashi</label>
          <input type="text" name="rashi" value={horoscope.rashi} onChange={handleHoroChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g., Leo" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Manglik?</label>
          <select name="manglik" value={horoscope.manglik} onChange={handleHoroChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="No">No</option>
            <option value="Yes">Yes</option>
            <option value="Anshik">Anshik (Partial)</option>
            <option value="Don't Know">Don't Know</option>
          </select>
        </div>
      </div>

    </div>
  );
}