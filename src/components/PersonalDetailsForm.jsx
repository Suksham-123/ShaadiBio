import { useContext } from 'react';
import { BioContext } from '../context/BioContext';

export default function PersonalDetailsForm() {
  const { bioData, updateBioData, setBioData } = useContext(BioContext);
  const { personal } = bioData;

  const handleChange = (e) => {
    updateBioData('personal', e.target.name, e.target.value);
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    updateBioData('personal', 'gender', selectedGender);

    // Auto-apply the color themes based on the user's choice
    if (selectedGender === 'Female') {
      updateBioData('settings', 'themeColor', 'pink');
    } else if (selectedGender === 'Male') {
      updateBioData('settings', 'themeColor', 'blue'); 
    }
  };

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    updateBioData('personal', 'dob', dobValue);

    if (dobValue) {
      const today = new Date();
      const birthDate = new Date(dobValue);
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      updateBioData('personal', 'age', calculatedAge.toString());
    } else {
      updateBioData('personal', 'age', '');
    }
  };

  // Handle the photo upload and generate a local preview URL
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBioData(prev => ({ ...prev, photoUrl: imageUrl }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">1. Personal Details</h2>
      
      {/* Profile Photo Upload Input */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handlePhotoUpload} 
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all cursor-pointer"
        />
        <p className="text-xs text-gray-400 mt-1">Select an image to see it previewed on your biodata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input type="text" name="fullName" value={personal.fullName} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Enter full name" />
        </div>
        
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input type="date" name="dob" value={personal.dob} onChange={handleDobChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>

        {/* Auto-calculated Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input type="text" name="age" value={personal.age} readOnly className="w-full p-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" placeholder="Auto-calculates" />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select name="gender" value={personal.gender} onChange={handleGenderChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
}