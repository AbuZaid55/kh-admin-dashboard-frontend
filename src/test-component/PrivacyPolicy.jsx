import React, { useState, useEffect } from "react";

const API_URL = 'http://localhost:4000/common/customization';
// const API_URL = BASE_URL + /common/customization';   IN PRODUCTION

const PrivacyPolicy = () => {
    const [greeting, setGreeting] = useState("");
    const [privacyList, setPrivacyList] = useState([{ title: "", description: "" }]);

    useEffect(() => {
        fetch(`${API_URL}/privacy-policy`)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setGreeting(data.greeting);
                    setPrivacyList(data.privacy_list);
                }
            });
    }, []);

    const handleInputChange = (index, field, value) => {
        const updatedList = [...privacyList];
        updatedList[index][field] = value;
        setPrivacyList(updatedList);
    };

    const addPrivacyItem = () => {
        setPrivacyList([...privacyList, { title: "", description: "" }]);
    };

    const removePrivacyItem = (index) => {
        const updatedList = privacyList.filter((_, i) => i !== index);
        setPrivacyList(updatedList);
    };

    const handleSubmit = async () => {
        await fetch(`${API_URL}/privacy-policy`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ greeting, privacy_list: privacyList }),
        });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Policy</h2>
            
            {/* Greeting Input */}
            <h4 className="text-green-400">Greeting</h4>
            <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Enter greeting"
            />

            {/* Privacy List */}
            <h3 className="text-lg font-medium text-gray-700 mb-2">Privacy List</h3>
            {privacyList.map((item, index) => (
                <div key={index} className="mb-4 p-4 border rounded-lg relative">
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2"
                        value={item.title}
                        onChange={(e) => handleInputChange(index, "title", e.target.value)}
                        placeholder="Title"
                    />
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                        value={item.description}
                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                        placeholder="Description"
                    />
                    {/* Remove Button */}
                    <button
                        onClick={() => removePrivacyItem(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                        X
                    </button>
                </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={addPrivacyItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add Item
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Save Policy
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
