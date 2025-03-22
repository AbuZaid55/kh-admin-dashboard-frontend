import { useState } from "react";
import { CiSquareChevDown } from "react-icons/ci";

const SectionManagement = ({ 
  title, 
  sectionKey, 
  enabled, 
  children, 
  onSave,
  onReset,
  onToggle
}) => {
  const [isOpen,setIsOpen]=useState(false);
  return (
    <div className={`p-6 shadow-md rounded-md ${isOpen ? "h-auto" : "h-[70px]"} overflow-hidden flex flex-col transition-transform duration-500 `}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={ () => setIsOpen(prev => !prev)} className={`flex items-center gap-2 text-[16px] font-semibold cursor-pointer ${!enabled ? "cursor-not-allowed opacity-40 " : ""}`} >
        <h2 className="text-xl text-black font-bold">{title} Section</h2>
                    <CiSquareChevDown className={`${isOpen ? "rotate-180" : "rotate-0"}`} />
        </button>
        <div className="flex items-center space-x-3">
           <div
            className={`w-20 h-9 flex items-center rounded-[10px] p-3 cursor-pointer transition-all duration-500 ease-in-out text-white ${enabled ? "bg-yellow-500 justify-end" : "bg-gray-700 justify-start"}`}
            onClick={() => onToggle(sectionKey, !enabled)}>
            {enabled ? "ON" : "OFF"}
          </div>
        </div>
      </div>
      
      {isOpen && (
        <>
          <div className="mb-4">
            {children}
          </div>
          <div className="flex justify-end space-x-3">
            <button 
              onClick={onReset}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Reset
            </button>
            {
              sectionKey !== "store_feat_section" && (
                <button 
                 onClick={onSave}
                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                 Save Changes
                </button>
              )
            }
          </div>
        </>
      )}
    </div>
  );
};

export default SectionManagement;