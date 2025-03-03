

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; 

export default function Settings() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    const settingsOptions = [
        "Store Details",
        "Data Privacy",
        "Social Media Management",
        "Theme Setting",
        "Notification",
        "Backup & Recovery",
        "Import Data",
        "Payment Gateway",
        "Limitations For Stocks",
    ];

    return (
        <div className="">
            <div className=" bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Settings</h2>

                {/* Settings List */}
                <div className="divide-y divide-gray-200">
                    {settingsOptions.map((option, index) => (
                        <div key={index} className="py-3">
                            <button
                                className="w-full text-left text-gray-700 font-medium flex justify-between items-center"
                                onClick={() => toggleSection(index)}
                            >
                                {option}
                                {option === "Import Data" ? (
                                    <select className="border p-2 rounded w-auto ml-4">
                                        <option>PDF</option>
                                        <option>Excel</option>
                                        <option>CSV</option>
                                    </select>
                                ) : openSection === index ? (
                                    <FaChevronUp className="text-gray-500" />
                                ) : (
                                    <FaChevronDown className="text-gray-500" />
                                )}
                            </button>

                            {openSection === index && option !== "Import Data" && (
                                <div className="bg-gray-100 p-3 rounded-md text-gray-600">
                                    <p>Settings details for {option}...</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
