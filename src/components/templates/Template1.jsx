import { useContext } from 'react';
import { BioContext } from '../../context/BioContext';

export default function Template1() {
  const { bioData } = useContext(BioContext);
  const { personal, family, education, horoscope, settings } = bioData;

  // Dictionary mapping our theme state to actual Tailwind classes
  const themeConfig = {
    blue: { primary: 'text-blue-900', border: 'border-blue-900', bg: 'bg-blue-600' },
    pink: { primary: 'text-pink-900', border: 'border-pink-900', bg: 'bg-pink-600' },
    neutral: { primary: 'text-slate-900', border: 'border-slate-900', bg: 'bg-slate-800' }
  };

  // Get the current colors based on the context state
  const colors = themeConfig[settings.themeColor] || themeConfig.blue;

  return (
    <div className={`bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl p-10 text-gray-800 mx-auto box-border ${settings.fontFamily}`}>
      
      {/* Header Section */}
      <div className={`flex flex-col sm:flex-row items-center gap-6 border-b-4 pb-6 mb-6 text-center sm:text-left ${colors.border}`}>
        
        <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 flex-shrink-0 shadow-sm">
          {bioData.photoUrl ? (
            <img src={bioData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Photo</div>
          )}
        </div>

        <div>
          <h1 className={`text-4xl font-bold tracking-wide uppercase mb-2 ${colors.primary}`}>
            {personal.fullName || 'Your Full Name'}
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            {education.profession || 'Your Profession'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        
        {/* Left Column: Personal & Education */}
        <div>
          <h2 className={`text-2xl font-bold border-b pb-2 mb-4 ${colors.primary} ${colors.border}`}>Personal Details</h2>
          <ul className="space-y-3">
            <li><span className="font-semibold w-24 inline-block">DOB:</span> {personal.dob || '—'}</li>
            <li><span className="font-semibold w-24 inline-block">Age:</span> {personal.age ? `${personal.age} Years` : '—'}</li>
            <li><span className="font-semibold w-24 inline-block">Gender:</span> {personal.gender || '—'}</li>
          </ul>

          <h2 className={`text-2xl font-bold border-b pb-2 mb-4 mt-8 ${colors.primary} ${colors.border}`}>Education & Career</h2>
          <ul className="space-y-3">
            <li><span className="font-semibold w-28 inline-block">Degree:</span> {education.degree || '—'}</li>
            <li><span className="font-semibold w-28 inline-block">Profession:</span> {education.profession || '—'}</li>
            <li><span className="font-semibold w-28 inline-block">Income:</span> {education.income || '—'}</li>
          </ul>
        </div>

        {/* Right Column: Family & Horoscope */}
        <div>
          <h2 className={`text-2xl font-bold border-b pb-2 mb-4 ${colors.primary} ${colors.border}`}>Family Background</h2>
          <ul className="space-y-3">
            <li><span className="font-semibold block text-sm text-gray-500">Father</span> {family.fatherName ? `${family.fatherName} (${family.fatherOccupation})` : '—'}</li>
            <li><span className="font-semibold block text-sm text-gray-500 mt-2">Mother</span> {family.motherName ? `${family.motherName} (${family.motherOccupation})` : '—'}</li>
            <li><span className="font-semibold block text-sm text-gray-500 mt-2">Siblings</span> <p className="whitespace-pre-wrap">{family.siblings || '—'}</p></li>
          </ul>

          <h2 className={`text-2xl font-bold border-b pb-2 mb-4 mt-8 ${colors.primary} ${colors.border}`}>Horoscope</h2>
          <ul className="space-y-3">
            <li><span className="font-semibold w-24 inline-block">Rashi:</span> {horoscope.rashi || '—'}</li>
            <li><span className="font-semibold w-24 inline-block">Manglik:</span> {horoscope.manglik || 'No'}</li>
          </ul>
        </div>

      </div>
    </div>
  );
}