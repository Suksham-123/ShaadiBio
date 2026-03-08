import { useContext } from 'react';
import { BioContext } from '../../context/BioContext';

export default function Template2() {
  const { bioData } = useContext(BioContext);
  const { personal, family, education, horoscope, settings } = bioData;

  // Dictionary mapping our theme state specifically for the sidebar layout
  const themeConfig = {
    pink: {
      sidebarBg: 'bg-rose-900', sidebarText: 'text-rose-50', sidebarBorder: 'border-rose-700', sidebarSubText: 'text-rose-300',
      headerText: 'text-rose-900', headerBorder: 'border-rose-200', iconBg: 'bg-rose-100', iconText: 'text-rose-900', imgBorder: 'border-rose-200'
    },
    blue: {
      sidebarBg: 'bg-blue-900', sidebarText: 'text-blue-50', sidebarBorder: 'border-blue-700', sidebarSubText: 'text-blue-300',
      headerText: 'text-blue-900', headerBorder: 'border-blue-200', iconBg: 'bg-blue-100', iconText: 'text-blue-900', imgBorder: 'border-blue-200'
    },
    neutral: {
      sidebarBg: 'bg-slate-800', sidebarText: 'text-slate-50', sidebarBorder: 'border-slate-600', sidebarSubText: 'text-slate-300',
      headerText: 'text-slate-800', headerBorder: 'border-slate-200', iconBg: 'bg-slate-200', iconText: 'text-slate-800', imgBorder: 'border-slate-400'
    }
  };

  // Grab the right color palette
  const colors = themeConfig[settings.themeColor] || themeConfig.pink;

  return (
    // Apply the dynamic font family to the main wrapper
    <div className={`bg-white w-full max-w-[210mm] min-h-[297mm] shadow-2xl flex mx-auto box-border overflow-hidden transition-colors duration-300 ${settings.fontFamily}`}>
      
      {/* Left Sidebar (Dynamic Color) */}
      <div className={`w-1/3 ${colors.sidebarBg} ${colors.sidebarText} p-8 flex flex-col items-center border-r-4 ${colors.sidebarBorder}`}>
        
        {/* Profile Photo */}
        <div className={`w-32 h-32 rounded-full overflow-hidden border-4 ${colors.imgBorder} mb-6 bg-black/20 flex-shrink-0 shadow-lg`}>
          {bioData.photoUrl ? (
            <img src={bioData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${colors.sidebarSubText} text-sm`}>No Photo</div>
          )}
        </div>
        
        {/* Name & Title */}
        <h1 className="text-2xl font-bold text-center mb-1">{personal.fullName || 'Your Name'}</h1>
        <p className={`text-sm italic ${colors.sidebarSubText} text-center mb-8`}>{education.profession || 'Profession'}</p>

        {/* Sidebar Details */}
        <div className="w-full text-sm space-y-4">
          <div>
            <h3 className={`uppercase tracking-widest text-xs border-b pb-1 mb-2 ${colors.sidebarSubText} ${colors.sidebarBorder}`}>About</h3>
            <p><span className="font-semibold">DOB:</span> {personal.dob || '—'}</p>
            <p><span className="font-semibold">Age:</span> {personal.age ? `${personal.age} Yrs` : '—'}</p>
            <p><span className="font-semibold">Gender:</span> {personal.gender || '—'}</p>
          </div>
          <div>
            <h3 className={`uppercase tracking-widest text-xs border-b pb-1 mb-2 mt-6 ${colors.sidebarSubText} ${colors.sidebarBorder}`}>Horoscope</h3>
            <p><span className="font-semibold">Rashi:</span> {horoscope.rashi || '—'}</p>
            <p><span className="font-semibold">Manglik:</span> {horoscope.manglik || 'No'}</p>
          </div>
        </div>
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-10 text-gray-800 bg-[#fdfbf7]">
        <h2 className={`text-3xl font-bold border-b-2 pb-2 mb-8 uppercase tracking-wide ${colors.headerText} ${colors.headerBorder}`}>
          Biodata
        </h2>

        <div className="mb-10">
          <h3 className={`text-xl font-bold mb-4 flex items-center ${colors.headerText}`}>
            <span className={`${colors.iconBg} ${colors.iconText} p-1 rounded mr-2 text-sm`}>✦</span> Education & Career
          </h3>
          <div className="pl-6 space-y-3">
            <p><span className="font-semibold w-28 inline-block">Degree:</span> {education.degree || '—'}</p>
            <p><span className="font-semibold w-28 inline-block">Profession:</span> {education.profession || '—'}</p>
            <p><span className="font-semibold w-28 inline-block">Income:</span> {education.income || '—'}</p>
          </div>
        </div>

        <div>
          <h3 className={`text-xl font-bold mb-4 flex items-center ${colors.headerText}`}>
            <span className={`${colors.iconBg} ${colors.iconText} p-1 rounded mr-2 text-sm`}>✦</span> Family Details
          </h3>
          <div className="pl-6 space-y-4">
            <p><span className="font-semibold w-28 inline-block text-gray-600">Father:</span> {family.fatherName ? `${family.fatherName} (${family.fatherOccupation})` : '—'}</p>
            <p><span className="font-semibold w-28 inline-block text-gray-600">Mother:</span> {family.motherName ? `${family.motherName} (${family.motherOccupation})` : '—'}</p>
            <div>
              <span className="font-semibold block mb-2 text-gray-600">Siblings:</span>
              <p className="whitespace-pre-wrap text-gray-700 leading-relaxed bg-white p-4 rounded border border-gray-200 shadow-sm">{family.siblings || '—'}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}