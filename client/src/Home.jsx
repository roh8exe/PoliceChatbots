import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing_page.css';
import img1 from '/img1.png'
import img2 from '/img2.png'
import img3 from '/img3.png'
import img4 from '/img4.png'
import police from '/goa_image.png'

function App() {
  const navigate = useNavigate();
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  const goToForm = () => {
    navigate('/PCCForm');
  };

  const goToStatus = () => {
    navigate('/PCCStatus');
  };

  const adminLogin = () => {
    navigate('/admin');
  };
  const report = () => {
    navigate('/report');
  };
  const service = () => {
    navigate('/service')
  }
  const cophelp = () => {
    navigate('/cophelp')
  }
  const faq = () => {
    navigate('/Faq')
  }

  useEffect(() => {
    const startSlider = (sliderId) => {
      const slider = document.getElementById(sliderId);
      const images = slider.getElementsByTagName('img');
      let currentIndex = 0;

      const slideImages = () => {
        currentIndex++;
        if (currentIndex >= images.length) {
          currentIndex = 0; // Reset to first image
        }
        const offset = -currentIndex * 400; // Adjust based on image height
        slider.style.transform = `translateY(${offset}px)`; // Move the slider
      };

      // Change the image every 2 seconds (2000 ms)
      setInterval(slideImages, 2000);
    };

    // Start sliders for both sections
    startSlider('slider1');
    startSlider('slider2');
  }, []);

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">
            <img src={police} alt="Police Logo" />
          </div>
          <div className="center-text">
            <h1>GOA POLICE</h1>
          </div>
          <div className="menu">
            <button id="homeButton" >Home</button>
            <button id="aboutButton" onClick={scrollToBottom}>About us</button>
            <button id="featuresButton" onClick={service}>Services</button>
            <button id="contactUs" onClick={faq}>FAQ'S</button>
          </div>
        </div>
      </header>

      <div className="below">
        <div className="left">
        <div className="headingContainer">
  <h1 className="heading">Welcome to our online portal</h1>
        </div>
          <h3 className='random_text'>

          </h3>
          <div className="buttonContainer">
            <button className='b1' onClick={goToForm}>Start a New PCC Application</button>
            <button className='b1' onClick={goToStatus}>Review your status</button>
            <button className='b1' onClick={adminLogin}>Admin Login</button>
            <button className='b1' onClick={report}>COPBOT </button>
            <button className='b1' onClick={cophelp}>COPHELP</button>
          </div>
          <div className='cophelpContainer'>
            <p><h2>COPBOT</h2> Confused about paperwork or processes? Let our AI tool assist you, offering precise answers to make your police station visit smoother  </p>
            <p><h2>COPHELP</h2>Need help with common queries? Our AI FAQ tool provides clear, accurate answers to prepare you for your police station visit.</p>
            <p><h2>LANGUAGE SUPPORT</h2> We offer multilingual support to cater to diverse needs</p>
          </div>
        </div>
        
        <div className="right">
          <div className="right1">
            <div className="slider-container">
              <div className="slider" id="slider1">
                <img src={img1} alt="Image 1" />
                <img src={img3} alt="Image 3" />
                <img src={img4} alt="Image 4" />
              </div>
            </div>
          </div>

          <div className="right2">
            <div className="slider-container">
              <div className="slider" id="slider2">
                <img src={img4} alt="Image 2" />
                <img src={img3} alt="Image 1" />
                <img src={img1} alt="Image 4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className='foot'>
        <div className="footer-container">
          <div className="footer-about">
            <h3>About Goa Police</h3>
            <p>
              The Goa Police is committed to ensuring safety and security in the
              state, utilizing modern technology and community engagement to
              maintain law and order. With a focus on serving the public, the
              Goa Police aims to protect citizens and enhance their quality of
              life.
            </p>
          </div>
          <div className="footer-features">
            <h3>Features</h3>
            <ul>
              <li>AI-Driven Case Detection</li>
              <li>Multilingual Speech-to-Text Translation</li>
              <li>Legal Guidance</li>
              <li>Database for Victim Information</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contact Goa Police</h3>
            <p>If you need assistance, please reach out to us:</p>
            <p>
              <strong>Phone:</strong> 100 (Emergency)
            </p>
            <p>
              <strong>Email:</strong> info@goapolice.gov.in
            </p>
            <p>
              <strong>Address:</strong> Police Headquarters, Panaji, Goa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
