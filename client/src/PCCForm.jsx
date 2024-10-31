import React, { useState } from 'react';
import my_image from '/goa_image.png';
import './PCCForm.css';
import { useEffect } from 'react';

const PCCForm = () => {
  const [district, setDistrict] = useState('');
  const [err, seterr] = useState(null);
  const [comp, setcomp] = useState(null);
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: '', 
    address: '', 
    dateOfAddress: '',
    on_rent: '', 
    number_of_residents: '', 
    occupation: '',
    mobileNo: '', 
    adhaarNumber: '', 
    photo: null, 
    involvedInCase: 'no', 
    paymentReference: '', 
  });

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // Form submission logic here
    
     
        const response = await fetch("https://hackathon-second.vercel.app/PCCInformation", {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body : JSON.stringify({
            PoliceStation: formData.PoliceStation,
            name : formData.name,
            address : formData.address,
            dateOfAddress : formData.dateOfAddress,
            on_rent : formData.on_rent,
            number_of_residents: formData.number_of_residents.toString(),
            occupation : formData.occupation,
            mobileNo : formData.mobileNo,
            adhaarNumber : formData.adhaarNumber
          })
        })
        const result = await response.json();
        if(response.status === 401){
          seterr(result.error || "Something is wrong try again")
        }
        else{
          seterr(null)
          setToken(result.token);
          setcomp("Submitted successfully you can view your status using token below")
        }
        
      };

  return (
    <div className="pcc-container">
      <div className="logo-container">
        <a href="https://citizen.goapolice.gov.in/">
          <img src={my_image} alt="Goa Police Logo" className="logo" />
        </a>
      </div>
      <h1 className="form-title">Police Clearance Certificate</h1>

      <form  onSubmit={handleSubmit}>
        {/* Police station details */}
        <div  id="station-details">
          <h2 className="section-title">Police Station Details</h2>
          <label htmlFor="District">District:</label>
          <select id="District" name="district" className="select-input"  onChange={handleDistrictChange} required>
            <option value="">--Please choose a district--</option>
            <option value="North Goa">North Goa</option>
            <option value="South Goa">South Goa</option>
          </select>

          {/* North Goa Dropdown */}
          {district === 'North Goa' && (
            <div id="north-goa-options" className="dropdown-options">
              <label htmlFor="north-goa">North Goa:</label>
              <select id="north-goa" name="northGoaStation" className="select-input" value={formData.PoliceStation} onChange={handleInputChange}>
                <option value="Panaji Police Station">Panaji Police Station</option>
                <option value="Old Goa Police Station">Old Goa Police Station</option>
                <option value="Agacaim Police Station">Agacaim Police Station</option>
              </select>
            </div>
          )}

          {/* South Goa Dropdown */}
          {district === 'South Goa' && (
            <div id="south-goa-options" className="dropdown-options">
              <label htmlFor="south-goa">South Goa:</label>
              <select id="south-goa" name="southGoaStation" className="select-input" value={formData.PoliceStation} onChange={handleInputChange}>
                <option value="Margao Town Police Station">Margao Town Police Station</option>
                <option value="Colva Police Station">Colva Police Station</option>
              </select>
            </div>
          )}
        </div>

        {/* Other Details Section */}
        <div className="form-section" id="other-details">
          <h2 className="section-title">Other Details</h2>

          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" className="text-input" placeholder="Enter Your full name" value={formData.name} onChange={handleInputChange} required />

          <label htmlFor="address">Address:</label>
          <textarea id="address" name="address" className="textarea-input" placeholder="Enter Your Address" value={formData.address} onChange={handleInputChange} required />

          <label htmlFor="dateOfAddress">Start of residency tenure:</label>
          <input type="date" id="dateOfAddress" name="dateOfAddress" className="date-input" value={formData.dateOfAddress} onChange={handleInputChange} required />

          <label htmlFor="on_rent">On Rent:</label>
          <select id="on_rent" name="on_rent" className="select-input" value={formData.on_rent} onChange={handleInputChange} required>
            <option value="">--Select--</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="number_of_residents">Number of Residents:</label>
          <input type="number" id="number_of_residents" name="number_of_residents" className="number-input" value={formData.number_of_residents} onChange={handleInputChange} required />

          <label htmlFor="occupation">Occupation:</label>
          <input type="text" id="occupation" name="occupation" className="text-input" placeholder="Enter Your Occupation" value={formData.occupation} onChange={handleInputChange} required />

          <label htmlFor="mobileNo">Mobile Number:</label>
          <input type="tel" id="mobileNo" name="mobileNo" className="text-input" placeholder="Enter Your Mobile Number" value={formData.mobileNo} onChange={handleInputChange} required />

          <label htmlFor="adhaarNumber">Aadhar Number:</label>
          <input type="text" id="adhaarNumber" name="adhaarNumber" className="text-input" placeholder="Enter Your Aadhar Number" value={formData.adhaarNumber} onChange={handleInputChange} required />

          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name="photo" className="file-input" accept="image/*" onChange={handleFileChange} required />

          <label htmlFor="involvedInCase">Involved in any Case:</label>
          <select id="involvedInCase" name="involvedInCase" className="select-input" value={formData.involvedInCase} onChange={handleInputChange} required>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>

          <label htmlFor="paymentReference">Payment Reference:</label>
          <input type="text" id="paymentReference" name="paymentReference" className="text-input" placeholder="Enter Payment Reference" value={formData.paymentReference} onChange={handleInputChange} required />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
      <div className='errortag'>{err ? err : ""}</div>
      <div className="corrtag">{comp ? comp : ""}</div>
      <div className='corrtag'> {comp ? token : ""}</div>
    </div>
  );
};

export default PCCForm;
