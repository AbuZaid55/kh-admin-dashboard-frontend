// Base Section Component
export default SectionManagement = ({ 
  title, 
  sectionKey, 
  enabled, 
  children, 
  onSave,
  onReset,
  onToggle
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title} Section</h2>
        <div className="flex items-center space-x-3">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enabled}
              onChange={() => onToggle(sectionKey, !enabled)}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900">{enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>
      </div>
      
      {enabled && (
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
            <button 
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </div>
  );
};