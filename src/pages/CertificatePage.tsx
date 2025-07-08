import React from 'react';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';

const CERT_COMPANY = 'NTS G.R.O.W';
const CERT_LOGO = '/grow_logo.png';
const CERT_TITLE = 'Certificate of Completion';
const CERT_COURSE = 'Soil Testing Mastery: Foundations of Nutrition Farming®';
const CERT_INSTRUCTOR = 'Graeme Sait';
const CERT_DATE = new Date().toLocaleDateString();

export default function CertificatePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAppContext();
  const CERT_USER = currentUser?.name || 'Recipient Name';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 print:bg-white">
      <div className="bg-white shadow-2xl rounded-2xl border-4 border-green-200 max-w-2xl w-full p-10 relative print:border-0 print:shadow-none">
        <div className="flex flex-col items-center mb-6">
          <img src={CERT_LOGO} alt="Logo" className="h-16 w-16 mb-2" />
          <h2 className="text-2xl font-bold text-green-700 tracking-wide uppercase">{CERT_COMPANY}</h2>
        </div>
        <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-800 tracking-wide">{CERT_TITLE}</h1>
        <p className="text-lg text-center mb-8 text-gray-700">This certifies that</p>
        <div className="flex justify-center mb-4">
          <span className="text-2xl font-bold text-green-800 border-b-2 border-green-400 px-8 py-2 bg-green-50 rounded-lg shadow-sm">{CERT_USER}</span>
        </div>
        <p className="text-lg text-center mb-6 text-gray-700">has successfully completed the course</p>
        <h2 className="text-xl font-semibold text-center text-green-700 mb-4">{CERT_COURSE}</h2>
        <div className="flex flex-col items-center mb-6">
          <span className="text-gray-600">Instructor: <span className="font-medium text-gray-800">{CERT_INSTRUCTOR}</span></span>
          <span className="text-gray-600">Date: <span className="font-medium text-gray-800">{CERT_DATE}</span></span>
        </div>
        <div className="flex justify-between items-end mt-10">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Signature</span>
            <span className="font-semibold text-gray-700 border-t border-gray-400 w-32 mt-2 pt-1">{CERT_INSTRUCTOR}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-xs">Company Seal</span>
            <img src={CERT_LOGO} alt="Seal" className="h-10 w-10 opacity-70 mt-2" />
          </div>
        </div>
        <div className="mt-8 flex justify-center print:hidden">
          <Button className="bg-green-600 hover:bg-green-700" onClick={handlePrint}>Download / Print Certificate</Button>
        </div>
        <div className="absolute top-4 right-4 print:hidden">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    </div>
  );
} 