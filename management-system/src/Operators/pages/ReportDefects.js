import React, { useState } from 'react';
import { ref as dbRef, set } from 'firebase/database'; // Import Realtime Database functions
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import { database , storage } from '../../firebase/firebase'; // Import the initialized Firebase instances


import '../css/Reportdefects.css'; // Import the CSS file for styling

// Import images directly
import AutomatedGuidedVehicles from '../assets/Automated Guided Vehicles.png';
import CNC_Machines from '../assets/CNC Machines.png';
import LeakTestMachine from '../assets/Leak Test Machine.png';
import PaintingRobots from '../assets/Painting Robots.webp'; // New image
import StampingPresses from '../assets/Stamping Presses.png'; // New image
import WeldingRobots from '../assets/Welding Robots.webp'; // New image


function ReportDefects() {
    
  const [issues, setIssues] = useState({
    noise: false,
    stops: false,
    overheating: false,
    notResponding: false,
    vibrating: false,
    other: '',
    hasMedia: false, // Track if the user has media
    mediaFile: null, // Track the uploaded media file
    highPriority: false, // Track high priority status
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(null); // Track the selected image

  // Updated array of image objects with source, alt text, and name
  const images = [
    { src: AutomatedGuidedVehicles, alt: 'Automated Guided Vehicles', name: 'Automated Guided Vehicles' },
    { src: CNC_Machines, alt: 'CNC Machines', name: 'CNC Machines' },
    { src: LeakTestMachine, alt: 'Leak Test Machine', name: 'Leak Test Machine' },
    { src: PaintingRobots, alt: 'Painting Robots', name: 'Painting Robots' },
    { src: StampingPresses, alt: 'Stamping Presses', name: 'Stamping Presses' },
    { src: WeldingRobots, alt: 'Welding Robots', name: 'Welding Robots' },
  ];

  // Function to handle media file change
  const handleMediaChange = (event) => {
    setIssues((prev) => ({
      ...prev,
      mediaFile: event.target.files[0],
    }));
  };

  // Function to save defect to Realtime Database
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Function to save defect to the database
  const saveDefectToDatabase = async () => {
    // Prevent further clicks
    setLoading(true);
    
    try {
      let mediaUrl = null;

      // If there is a media file, upload it to Firebase Storage
      if (issues.mediaFile) {
        const storageReference = storageRef(storage, `defects/${Date.now()}_${issues.mediaFile.name}`);
        console.log('Uploading media file:', issues.mediaFile.name);
        await uploadBytes(storageReference, issues.mediaFile);
        mediaUrl = await getDownloadURL(storageReference);
        console.log('Media file uploaded successfully:', mediaUrl);
      }

      // Construct the data to be saved
      const defectData = {
        machineName: selectedImageIndex !== null ? images[selectedImageIndex].name : 'Unknown Machine',
        issues: {
          noise: issues.noise,
          stops: issues.stops,
          overheating: issues.overheating,
          notResponding: issues.notResponding,
          vibrating: issues.vibrating,
          other: issues.other.trim(),
        },
        media: mediaUrl,
        highPriority: issues.highPriority,
      };

      // Reference to a new defect entry
      const defectRef = dbRef(database, 'defects/' + Date.now());

      // Save the defect data to the Realtime Database
      await set(defectRef, defectData);
      console.log('Defect saved successfully:', defectData);
      
      // Set success message
      setMessage('Defect saved successfully!');
    } catch (error) {
      console.error('Error saving defect:', error);
      
      // Set error message
      setMessage('Failed to save defect. Please try again.');
    } finally {
      // Re-enable the button after operation
      setLoading(false);
    }
  };

  return (
    <div>
        <div className="question-container">
      <h1 className='H1-repport'>Report Defects</h1>
      <div className="gallery">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image-container ${selectedImageIndex === index ? 'selected' : ''}`} // Add class if selected
            onClick={() => setSelectedImageIndex(index)}
          >
            <img src={image.src} alt={image.alt} className="image" />
            <p className="image-name">{image.name}</p>
          </div>
        ))}
      </div>
      </div>
      <div className="question-container">
      {/* Issue description section */}
      <h2 style={{ textAlign: 'center' }}>Describe the Issue</h2>
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            name="noise"
            checked={issues.noise}
            onChange={() => setIssues((prev) => ({ ...prev, noise: !prev.noise }))}
          />
          Making a noise
        </label>
        <label>
          <input
            type="checkbox"
            name="stops"
            checked={issues.stops}
            onChange={() => setIssues((prev) => ({ ...prev, stops: !prev.stops }))}
          />
          Stops
        </label>
        <label>
          <input
            type="checkbox"
            name="overheating"
            checked={issues.overheating}
            onChange={() => setIssues((prev) => ({ ...prev, overheating: !prev.overheating }))}
          />
          Overheating
        </label>
        <label>
          <input
            type="checkbox"
            name="notResponding"
            checked={issues.notResponding}
            onChange={() => setIssues((prev) => ({ ...prev, notResponding: !prev.notResponding }))}
          />
          Not responding
        </label>
        <label>
          <input
            type="checkbox"
            name="vibrating"
            checked={issues.vibrating}
            onChange={() => setIssues((prev) => ({ ...prev, vibrating: !prev.vibrating }))}
          />
          Vibrating
        </label>
        <label>
          <input
            type="checkbox"
            checked={issues.other !== ''} // Check if "Other" has a value
            onChange={() => {
              // If checked, set to an empty string; if unchecked, keep it empty
              setIssues((prev) => ({
                ...prev,
                other: issues.other === '' ? '' : prev.other,
              }));
            }}
          />
          Other:
          <input
            type="text"
            value={issues.other} // Keep the input value as it is
            onChange={(e) => setIssues((prev) => ({ ...prev, other: e.target.value }))}
            placeholder="Describe the issue"
            className="other-input"
          />
        </label>
      </div>
      </div>

      {/* Media upload question */}

      <div className="question-container">
      <h2 style={{}}>Do you have a photo  describing the problem?</h2>
      <div className="media-question">
        <label>
          <input
            type="radio"
            name="hasMedia"
            value="yes"
            checked={issues.hasMedia}
            onChange={() => setIssues((prev) => ({ ...prev, hasMedia: true }))}
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="hasMedia"
            value="no"
            checked={!issues.hasMedia}
            onChange={() => setIssues((prev) => ({ ...prev, hasMedia: false }))}
          />
          No
        </label>
      </div>
      </div>
      {/* Conditional media upload input */}
      {issues.hasMedia && (
        <div className="media-upload">
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
          />
          <p>{issues.mediaFile ? `Selected file: ${issues.mediaFile.name}` : 'No file selected'}</p>
        </div>
      )}

      {/* High priority toggle */}
      <div className="question-container">
      <div className="high-priority">

  <h3>Is this high priority?</h3> {/* Added question */}
  <label>
    <input
      type="checkbox"
      name="highPriority"
      checked={issues.highPriority}
      onChange={() => setIssues((prev) => ({ ...prev, highPriority: !prev.highPriority }))}
    />
    High Priority
  </label>
</div>
</div>

      {/* Submit button */}
      <button className='button-report' onClick={saveDefectToDatabase}>Submit Defect</button>
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default ReportDefects;
