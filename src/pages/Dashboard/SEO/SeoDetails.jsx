import { useState, useEffect } from 'react'
import Input from '../../../compoenets/main/Input';
import Button from '../../../compoenets/main/Button';
import axios from 'axios';

const API_URL="http://localhost:3000";

function SeoDetails() {
    const [seoEntries, setSeoEntries] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [currentEntry, setCurrentEntry] = useState({
        page_name: '',
        page: '',
        title: '',
        description: '',
        robots: 'index, follow',
        canonical: '',
        meta_property_og: [{ property: '', content: '' }],
        meta_name_twitter: [{ name: '', content: '' }]
    });


    const [searchTerm, setSearchTerm] = useState('');
    const [formErrors, setFormErrors] = useState({});

    // Fetch all SEO entries
    const fetchSEOEntries = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/seo`);
            setSeoEntries(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch SEO entries. Please try again later.');
            console.error('Error fetching SEO entries:', err);
        } finally {
            setLoading(false);
        }
    };

    // Search SEO entries
    const searchSEOEntries = async (term) => {
        if (!term.trim()) {
            return fetchSEOEntries();
        }

        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/seo/search/${term}`);
            setSeoEntries(response.data);
            setError(null);
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error('Error searching SEO entries:', err);
        } finally {
            setLoading(false);
        }
    };

    // Load data on component mount
    useEffect(() => {
        fetchSEOEntries();
    }, []);

    // Handle search input changes with debounce
    useEffect(() => {
        const delaySearch = setTimeout(() => {
            searchSEOEntries(searchTerm);
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentEntry({ ...currentEntry, [name]: value });
    };

    // Handle Open Graph meta changes
    const handleOgChange = (index, field, value) => {
        const updatedOg = [...currentEntry.meta_property_og];
        updatedOg[index][field] = value;
        setCurrentEntry({ ...currentEntry, meta_property_og: updatedOg });
    };

    // Handle Twitter meta changes
    const handleTwitterChange = (index, field, value) => {
        const updatedTwitter = [...currentEntry.meta_name_twitter];
        updatedTwitter[index][field] = value;
        setCurrentEntry({ ...currentEntry, meta_name_twitter: updatedTwitter });
    };

    // Add new meta tag fields
    const addMetaField = (type) => {
        if (type === 'og') {
            setCurrentEntry({
                ...currentEntry,
                meta_property_og: [...currentEntry.meta_property_og, { property: '', content: '' }]
            });
        } else {
            setCurrentEntry({
                ...currentEntry,
                meta_name_twitter: [...currentEntry.meta_name_twitter, { name: '', content: '' }]
            });
        }
    };

    // Remove meta tag fields
    const removeMetaField = (type, index) => {
        if (type === 'og') {
            const updatedOg = [...currentEntry.meta_property_og];
            updatedOg.splice(index, 1);
            setCurrentEntry({ ...currentEntry, meta_property_og: updatedOg });
        } else {
            const updatedTwitter = [...currentEntry.meta_name_twitter];
            updatedTwitter.splice(index, 1);
            setCurrentEntry({ ...currentEntry, meta_name_twitter: updatedTwitter });
        }
    };

    // Reset form
    const resetForm = () => {
        setCurrentEntry({
            page_name: '',
            page: '',
            title: '',
            description: '',
            robots: 'index, follow',
            canonical: '',
            meta_property_og: [{ property: '', content: '' }],
            meta_name_twitter: [{ name: '', content: '' }]
        });
        setFormMode('create');
        setShowForm(false);
        setFormErrors({});
    };

    // Validate form
    const validateForm = () => {
        const errors = {};

        if (!currentEntry.page_name.trim()) {
            errors.page_name = 'Page name is required';
        }

        if (!currentEntry.page.trim()) {
            errors.page = 'Page URL is required';
        }

        if (!currentEntry.title.trim()) {
            errors.title = 'Title is required';
        }

        if (!currentEntry.description.trim()) {
            errors.description = 'Description is required';
        }

        // Validate meta_property_og fields
        const ogErrors = currentEntry.meta_property_og.map(item => {
            const itemErrors = {};
            if (!item.property.trim()) {
                itemErrors.property = 'Property is required';
            }
            return itemErrors;
        });

        if (ogErrors.some(error => Object.keys(error).length > 0)) {
            errors.meta_property_og = ogErrors;
        }

        // Validate meta_name_twitter fields
        const twitterErrors = currentEntry.meta_name_twitter.map(item => {
            const itemErrors = {};
            if (!item.name.trim()) {
                itemErrors.name = 'Name is required';
            }
            return itemErrors;
        });

        if (twitterErrors.some(error => Object.keys(error).length > 0)) {
            errors.meta_name_twitter = twitterErrors;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Add new SEO entry
    const handleCreate = async () => {
        if (!validateForm()) return;

        try {
            const response = await axios.post(`${API_URL}/seo`, currentEntry);
            setSeoEntries([response.data, ...seoEntries]);
            resetForm();
            fetchSEOEntries(); // Refresh list to ensure correct order
        } catch (err) {
            if (err.response && err.response.data) {
                // Handle validation errors returned from API
                if (err.response.data.field) {
                    setFormErrors({
                        ...formErrors,
                        [err.response.data.field]: err.response.data.message
                    });
                } else {
                    setError(err.response.data.message || 'Failed to create SEO entry');
                }
            } else {
                setError('Failed to create SEO entry. Please try again.');
            }
            console.error('Error creating SEO entry:', err);
        }
    };

    // Update existing SEO entry
    const handleUpdate = async () => {
        if (!validateForm()) return;

        try {
            await axios.put(`${API_URL}/seo/${currentEntry._id}`, currentEntry);
            fetchSEOEntries(); // Refresh list
            resetForm();
        } catch (err) {
            if (err.response && err.response.data) {
                // Handle validation errors returned from API
                if (err.response.data.field) {
                    setFormErrors({
                        ...formErrors,
                        [err.response.data.field]: err.response.data.message
                    });
                } else {
                    setError(err.response.data.message || 'Failed to update SEO entry');
                }
            } else {
                setError('Failed to update SEO entry. Please try again.');
            }
            console.error('Error updating SEO entry:', err);
        }
    };

    // Delete SEO entry
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this SEO entry?')) {
            try {
                await axios.delete(`${API_URL}/seo/${id}`);
                setSeoEntries(seoEntries.filter(entry => entry._id !== id));
            } catch (err) {
                setError('Failed to delete SEO entry. Please try again.');
                console.error('Error deleting SEO entry:', err);
            }
        }
    };

    // Edit SEO entry
    const handleEdit = (entry) => {
        setCurrentEntry({ ...entry });
        setFormMode('edit');
        setShowForm(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formMode === 'create') {
            handleCreate();
        } else {
            handleUpdate();
        }
    };

    // Handle search
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    return (
        <div className="mx-auto p-4 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-6">SEO Management</h1>

            {/* Search and Add New buttons */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full md:w-1/2">
                    <Input
                        type="text"
                        placeholder="Search SEO entries..."
                        value={searchTerm}
                        onChange={handleSearch}

                    />
                </div>
                <button
                    onClick={() => {
                        setCurrentEntry({
                            page_name: '',
                            page: '',
                            title: '',
                            description: '',
                            robots: 'index, follow',
                            canonical: '',
                            meta_property_og: [{ property: '', content: '' }],
                            meta_name_twitter: [{ name: '', content: '' }]
                        });
                        setFormMode('create');
                        setShowForm(true);
                        setFormErrors({});
                    }}
                    className="bg-blue-500 border-2 hover:bg-white hover:text-blue-500  text-white p-2 rounded-lg cursor-pointer w-full md:w-auto"
                >
                    Add New SEO Entry
                </button>
            </div>

            {/* Error message */}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4">{error}</div>}

            {/* Loading indicator */}
            {loading && <div className="text-center py-4">Loading...</div>}

            {/* SEO Entry Form */}
            {showForm && (
                <div className="bg-white shadow rounded p-4 mb-6">
                    <h2 className="text-xl font-semibold mb-4">{formMode === 'create' ? 'Add New SEO Entry' : 'Edit SEO Entry'}</h2>

                    {/* SEO Preview */}
                    <div className="mb-6 border rounded p-4 bg-gray-50">
                        <h3 className="text-lg font-medium mb-4">SEO Preview</h3>

                        <div className="mb-4">
                            <div className="text-blue-600 text-xl font-medium truncate">{currentEntry.title || 'Page Title'}</div>
                            <div className="text-green-700 text-sm mb-1">{currentEntry.canonical || currentEntry.page || 'example.com/page'}</div>
                            <div className="text-gray-600">{currentEntry.description || 'Page description will appear here...'}</div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">Meta Tags:</h4>
                            <div className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Title:</span> {currentEntry.title || 'Not set'}
                            </div>
                            <div className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Description:</span> {currentEntry.description || 'Not set'}
                            </div>
                            <div className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Robots:</span> {currentEntry.robots || 'Not set'}
                            </div>
                            <div className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Canonical:</span> {currentEntry.canonical || 'Not set'}
                            </div>
                        </div>

                        {currentEntry.meta_property_og.some(og => og.property || og.content) && (
                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-medium mb-2">Open Graph Preview:</h4>
                                {currentEntry.meta_property_og.map((og, index) => (
                                    og.property && (
                                        <div key={`preview-og-${index}`} className="text-sm text-gray-700 mb-1">
                                            <span className="font-semibold">{og.property}:</span> {og.content || 'Not set'}
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        {currentEntry.meta_name_twitter.some(twitter => twitter.name || twitter.content) && (
                            <div className="border-t pt-4 mt-4">
                                <h4 className="font-medium mb-2">Twitter Card Preview:</h4>
                                {currentEntry.meta_name_twitter.map((twitter, index) => (
                                    twitter.name && (
                                        <div key={`preview-twitter-${index}`} className="text-sm text-gray-700 mb-1">
                                            <span className="font-semibold">{twitter.name}:</span> {twitter.content || 'Not set'}
                                        </div>
                                    )
                                ))}
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="page_name" className="block text-sm font-medium mb-1">Page Name:</label>
                            <Input
                                type="text"
                                id="page_name"
                                name="page_name"
                                placeholder="Page Name"
                                value={currentEntry.page_name}
                                onChange={handleInputChange}
                                className={`${formErrors.page_name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {formErrors.page_name && <span className="text-red-500 text-sm">{formErrors.page_name}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="page" className="block text-sm font-medium mb-1">Page URL:</label>
                            <Input
                                type="text"
                                id="page"
                                name="page"
                                placeholder="Page URL"
                                value={currentEntry.page}
                                onChange={handleInputChange}
                                className={` ${formErrors.page ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {formErrors.page && <span className="text-red-500 text-sm">{formErrors.page}</span>}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium mb-1">Title:</label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                value={currentEntry.title}
                                onChange={handleInputChange}
                                className={` ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {formErrors.title && <span className="text-red-500 text-sm">{formErrors.title}</span>}
                            <div className="text-xs text-gray-500 mt-1">
                                {currentEntry.title ? `${currentEntry.title.length}/60 characters` : '0/60 characters'} (Recommended: 50-60)
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium mb-1">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={currentEntry.description}
                                onChange={handleInputChange}
                                className={`w-full p-2 border outline-[#EC9D0C]  rounded ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
                                rows="3"
                            />
                            {formErrors.description && <span className="text-red-500 text-sm">{formErrors.description}</span>}
                            <div className="text-xs text-gray-500 mt-1">
                                {currentEntry.description ? `${currentEntry.description.length}/160 characters` : '0/160 characters'} (Recommended: 150-160)
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="robots" className="block text-sm font-medium mb-1">Robots:</label>
                            <Input
                                id="robots"
                                name="robots"
                                value={currentEntry.robots}
                                onChange={handleInputChange}
                            />
                            {/* <option value="index, follow">index, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select> */}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="canonical" className="block text-sm font-medium mb-1">Canonical URL:</label>
                            <Input
                                type="text"
                                id="canonical"
                                name="canonical"
                                value={currentEntry.canonical}
                                onChange={handleInputChange}
                                placeholder="Canonical "
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Open Graph Meta Tags</h3>
                            {currentEntry.meta_property_og.map((og, index) => (
                                <div key={`og-${index}`} className="mb-4 p-4 bg-gray-50 rounded">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Property:</label>
                                            <Input
                                                type="text"
                                                value={og.property}
                                                onChange={(e) => handleOgChange(index, 'property', e.target.value)}
                                                placeholder="e.g., og:title, og:image"
                                                className={` ${formErrors.meta_property_og && formErrors.meta_property_og[index]?.property ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {formErrors.meta_property_og && formErrors.meta_property_og[index]?.property && (
                                                <span className="text-red-500 text-sm">{formErrors.meta_property_og[index].property}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Content:</label>
                                            <Input
                                                type="text"
                                                value={og.content}
                                                onChange={(e) => handleOgChange(index, 'content', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMetaField('og', index)}
                                        className="bg-red-500 text-white border-2 cursor-pointer border-red-500 hover:bg-white hover:text-red-500 p-2 rounded mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addMetaField('og')}
                                className="bg-green-500 cursor-pointer border-2 text-white hover:bg-white hover:text-green-500 p-2 rounded-lg"
                            >
                                Add Open Graph Meta Tag
                            </button>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Twitter Meta Tags</h3>
                            {currentEntry.meta_name_twitter.map((twitter, index) => (
                                <div key={`twitter-${index}`} className="mb-4 p-4 bg-gray-50 rounded">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Name:</label>
                                            <Input
                                                type="text"
                                                value={twitter.name}
                                                onChange={(e) => handleTwitterChange(index, 'name', e.target.value)}
                                                placeholder="e.g., twitter:card, twitter:title"
                                                className={` ${formErrors.meta_name_twitter && formErrors.meta_name_twitter[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {formErrors.meta_name_twitter && formErrors.meta_name_twitter[index]?.name && (
                                                <span className="text-red-500 text-sm">{formErrors.meta_name_twitter[index].name}</span>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Content:</label>
                                            <Input
                                                type="text"
                                                value={twitter.content}
                                                onChange={(e) => handleTwitterChange(index, 'content', e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMetaField('twitter', index)}
                                        className="bg-red-500 text-white border-2 cursor-pointer border-red-500 hover:bg-white hover:text-red-500 p-2 rounded mt-2"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addMetaField('twitter')}
                                className="bg-green-500 cursor-pointer border-2 text-white hover:bg-white hover:text-green-500 p-2 rounded-lg overflow-hidden"
                            >
                                Add Twitter Meta Tag
                            </button>
                        </div>

                        <div className="flex gap-4 md:w-[40%]">
                            <div className=' md:w-[60%]'>
                                <Button
                                    type="submit"
                                    text={formMode === 'create' ? 'Create SEO Entry' : 'Update SEO Entry'}
                                />

                            </div>
                            <div className=' md:w-[40%]'>
                                <Button

                                    className='bg-[#333333] hover:bg-transparent border-[#333333] w-full hover:text-[#333333]'
                                    onClick={() => {
                                        setShowForm(false);
                                        setFormErrors({});
                                    }}
                                    text="Cancel" />
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {/* SEO Entries List */}
            <div className="overflow-x-auto">
                {seoEntries.length === 0 && !loading ? (
                    <div className="text-center py-8 text-gray-500">No SEO entries found.</div>
                ) : (
                    <table className="w-full bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 text-left">Page Name</th>
                                <th className="p-2 text-left">Page URL</th>
                                <th className="p-2 text-left">Title</th>
                                <th className="p-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {seoEntries.map((entry) => (
                                <tr key={entry._id} className="hover:bg-gray-50">
                                    <td className="p-2">{entry.page_name}</td>
                                    <td className="p-2">{entry.page}</td>
                                    <td className="p-2">{entry.title}</td>
                                    <td className="p-2">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => {
                                                    handleEdit(entry);
                                                }}
                                                className="bg-blue-500 cursor-pointer border-2 hover:text-blue-500 hover:bg-white text-white py-1 px-2 rounded"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(entry._id)}
                                                className="bg-red-500 cursor-pointer border-2 hover:text-red-500 hover:bg-white text-white py-1 px-2 rounded"
                                            >
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setCurrentEntry({ ...entry });
                                                    setFormMode('view');
                                                    setShowForm(true);
                                                }}
                                                className="bg-green-500 hover:text-green-500 border-2 hover:bg-white text-white py-1 px-2 cursor-pointer rounded"
                                            >
                                                Preview
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination - Optional */}
            {seoEntries.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-gray-500">
                        Showing {seoEntries.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <button className="bg-gray-200 text-gray-800 p-2 rounded disabled:opacity-50 cursor-pointer">
                            Previous
                        </button>
                        <button className=" text-[#EC9D0C] border cursor-pointer py-2 px-3 hover:bg-[#EC9D0C] hover:text-white rounded">
                            1
                        </button>
                        <button className="bg-gray-200 text-gray-800 p-2 rounded disabled:opacity-50 cursor-pointer" >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
};

export default SeoDetails;
