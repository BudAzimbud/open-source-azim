import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Types
interface WorkspaceFormData {
  title: string;
  description: string;
  category: string;
  setupType: string;
  budgetRange: string;
  images: File[];
  tags: string[];
  socialLinks: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
  submitterInfo: {
    name: string;
    email: string;
    bio?: string;
  };
}

const categories = [
  'Gaming Setup',
  'Productivity Workspace',
  'Creative Studio',
  'Streaming Setup',
  'Home Office',
  'Developer Workspace',
  'Minimalist Setup',
  'RGB Gaming',
  'Music Production',
  'Video Editing'
];

const budgetRanges = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  'Over $10,000'
];

const componentCategories = [
  'Monitor',
  'Keyboard',
  'Mouse',
  'Headphones',
  'Speakers',
  'PC/Laptop',
  'Desk',
  'Chair',
  'Lighting',
  'Webcam',
  'Microphone',
  'Other'
];

export default function SubmitWorkspace() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WorkspaceFormData>({
    title: '',
    description: '',
    category: '',
    setupType: '',
    budgetRange: '',
    images: [],
    tags: [],
    socialLinks: {},
    submitterInfo: {
      name: '',
      email: '',
      bio: ''
    }
  });

  const [newTag, setNewTag] = useState('');

  const totalSteps = 3;

  // Handle form updates
  const updateFormData = (field: keyof WorkspaceFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSubmitterInfo = (field: keyof WorkspaceFormData['submitterInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      submitterInfo: {
        ...prev.submitterInfo,
        [field]: value
      }
    }));
  };

  const updateSocialLinks = (field: keyof WorkspaceFormData['socialLinks'], value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }));
  };

  // Handle tags
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      updateFormData('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  // Handle components
  // Removed - components will be managed in individual workspace pages

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    updateFormData('images', [...formData.images, ...files]);
  };

  const removeImage = (index: number) => {
    updateFormData('images', formData.images.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Submitting workspace:', formData);
    alert('Workspace submitted successfully! We\'ll review it and get back to you soon.');
    // Here you would typically send the data to your backend
  };

  // Step validation
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.title.trim() && formData.description.trim() && formData.category;
      case 2:
        return formData.images.length > 0;
      case 3:
        return formData.submitterInfo.name.trim() && formData.submitterInfo.email.trim();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Submit Your Workspace
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Share your setup with the community and inspire others with your workspace design and component choices.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step <= currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-2 mx-4 rounded-full transition-all duration-300 ${
                        step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900">Basic Info</div>
                <div className="text-gray-500">Title, description, category</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Images</div>
                <div className="text-gray-500">Upload setup photos</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900">Contact</div>
                <div className="text-gray-500">Your information</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="p-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workspace Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="e.g., My Ultimate Gaming Setup 2024"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      rows={5}
                      placeholder="Describe your workspace, what makes it special, your use cases, etc."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => updateFormData('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget Range
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => updateFormData('budgetRange', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Add tags (e.g., RGB, Minimal, Dual Monitor)"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Images */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Images</h2>
                    <p className="text-gray-600 mb-6">
                      Upload high-quality photos of your workspace. The first image will be used as the main cover photo.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Workspace Photos <span className="text-red-500">*</span>
                    </label>
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-lg font-medium text-gray-900 mb-2">Click to upload images</p>
                          <p className="text-sm text-gray-500">Or drag and drop your files here</p>
                          <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.images.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Images ({formData.images.length})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                Cover Photo
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Contact Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                    <p className="text-gray-600 mb-6">
                      We'll use this information to contact you about your submission and give you credit for your workspace.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.submitterInfo.name}
                        onChange={(e) => updateSubmitterInfo('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.submitterInfo.email}
                        onChange={(e) => updateSubmitterInfo('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio (Optional)
                    </label>
                    <textarea
                      value={formData.submitterInfo.bio}
                      onChange={(e) => updateSubmitterInfo('bio', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      rows={4}
                      placeholder="Tell us about yourself, your profession, hobbies, etc."
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Social Links (Optional)</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                        <input
                          type="url"
                          value={formData.socialLinks.instagram || ''}
                          onChange={(e) => updateSocialLinks('instagram', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="https://instagram.com/username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                        <input
                          type="url"
                          value={formData.socialLinks.twitter || ''}
                          onChange={(e) => updateSocialLinks('twitter', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="https://twitter.com/username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube</label>
                        <input
                          type="url"
                          value={formData.socialLinks.youtube || ''}
                          onChange={(e) => updateSocialLinks('youtube', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="https://youtube.com/@username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={formData.socialLinks.website || ''}
                          onChange={(e) => updateSocialLinks('website', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-medium text-blue-900 mb-2">📋 Submission Guidelines</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• All images should be high quality and well-lit</li>
                      <li>• Provide accurate information about your components</li>
                      <li>• Your workspace will be reviewed before publication</li>
                      <li>• We reserve the right to edit descriptions for clarity</li>
                      <li>• By submitting, you agree to let us feature your workspace</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-200">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid(currentStep)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!isStepValid(currentStep)}
                    className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Workspace 🚀
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📸 Photography Tips</h4>
                <p className="text-sm text-gray-600">
                  Use natural lighting, clean your workspace, and take photos from multiple angles.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">📝 Writing Descriptions</h4>
                <p className="text-sm text-gray-600">
                  Be specific about your components and explain your choices and use cases.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">🤝 Contact Support</h4>
                <p className="text-sm text-gray-600">
                  Have questions? Email us at budazimbud@gmail.com for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
