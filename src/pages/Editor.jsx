import { useContext, useRef, useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { LogOut, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ThemeControls from '../components/ThemeControls';
import { BioContext } from '../context/BioContext';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import FamilyDetailsForm from '../components/FamilyDetailsForm';
import EducationAndHoroscopeForm from '../components/EducationAndHoroscopeForm';
import Template1 from '../components/templates/Template1';
import Template2 from '../components/templates/Template2';

export default function Editor() {
  const { bioData, setBioData } = useContext(BioContext);
  const navigate = useNavigate();
  
  // Ref to target the template for PDF extraction
  const templateRef = useRef(null);
  // State to show a loading spinner while the PDF generates
  const [isGenerating, setIsGenerating] = useState(false);

  //  The magic PDF generation function
  const handleDownloadPdf = async () => {
    const element = templateRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      // 1. Take a high-resolution canvas snapshot of the template
      const canvas = await html2canvas(element, {
        scale: 2, // Increases quality/sharpness
        useCORS: true, // Allows cross-origin images to load
        logging: false
      });

      // 2. Convert canvas to image data
      const imgData = canvas.toDataURL('image/png');

      // 3. Create a new A4 PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // 4. Calculate dimensions to fit the image perfectly on A4 paper
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // 5. Add image to PDF and trigger download
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Name the file dynamically based on the user's input
      const fileName = bioData.personal.fullName 
        ? `${bioData.personal.fullName.replace(/\s+/g, '_')}_Biodata.pdf` 
        : 'ShaadiBio_Biodata.pdf';
        
      pdf.save(fileName);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Left Side: Form Controls */}
      <div className="w-full md:w-1/2 p-6 overflow-y-auto h-screen border-r border-gray-200 bg-white">
        
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-3xl font-bold text-gray-800">ShaadiBio Editor</h1>
          <button 
            type="button"
            onClick={() => navigate('/login')} 
            className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors border border-red-100"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        <p className="text-gray-500 mb-6">Fill in your details below. The preview will update automatically.</p>
        
        <ProgressBar />
        <PersonalDetailsForm />
        <FamilyDetailsForm />
        <EducationAndHoroscopeForm />
      </div>

      {/* Right Side: Live Dynamic Preview */}
      <div className="w-full md:w-1/2 p-6 bg-gray-200 h-screen overflow-y-auto flex flex-col items-center">

        {/* Action Bar: Download Button */}
        <div className="w-full max-w-[210mm] flex justify-end mb-4">
          <button
            onClick={handleDownloadPdf}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <><Loader2 className="animate-spin" size={18} /> Generating...</>
            ) : (
              <><Download size={18} /> Download PDF</>
            )}
          </button>
        </div>

        {/* 1. Theme Controls */}
        <ThemeControls />
        
        {/* 2. Template Switcher Buttons */}
        <div className="mb-6 flex gap-4 w-full max-w-[210mm]">
          <button
            type="button"
            onClick={() => setBioData(prev => ({ ...prev, templateId: 1 }))}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${bioData.templateId === 1 ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'}`}
          >
            Template 1 (Modern)
          </button>
          
          <button
            type="button"
            onClick={() => setBioData(prev => ({ ...prev, templateId: 2 }))}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${bioData.templateId === 2 ? 'bg-rose-800 text-white shadow-lg scale-[1.02]' : 'bg-white text-gray-500 border border-gray-300 hover:bg-gray-50'}`}
          >
            Template 2 (Traditional)
          </button>
        </div>

        {/* 3. The Target Area for PDF Generation */}
        <div ref={templateRef} className="w-full max-w-[210mm] bg-white shadow-2xl">
          {bioData.templateId === 1 ? <Template1 /> : <Template2 />}
        </div>

      </div>
      
    </div>
  )
}