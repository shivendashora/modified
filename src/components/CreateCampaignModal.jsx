import React, { useState } from 'react';
import GenresSelector from './GenresSelector';

const CreateCampaignModal = ({ isOpen, onClose, onCreate }) => {
  // ...existing code...
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add genres to the form data
    const formData = {
      // ...existing form data...
      genres: selectedGenres.join(', ')
    };
    onCreate(formData);
  };

  return (
    // ...existing modal container code...
    <form onSubmit={handleSubmit}>
      {/* ...existing form fields... */}
      
      <GenresSelector 
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

      {/* ...existing submit button... */}
    </form>
    // ...existing closing tags...
  );
};

export default CreateCampaignModal;
