import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select an image.');
      return;
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('imageName', imageName);
    formData.append('description', description);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        // Reset form fields after successful upload
        setFile(null);
        setImageName('');
        setDescription('');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload Images</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Choose Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="imageName">Image Name:</label>
          <input
            type="text"
            id="imageName"
            value={imageName}
            onChange={(e) => setImageName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default ImageUploadForm;
