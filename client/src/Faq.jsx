import React, { useState } from 'react';
import './FAQ.css';
import img from '/goa_image.png'

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div>
            <header>
                <div className="header-logo">
                    <img src={img} alt="Goa Police Logo" />
                </div>
                <div className="header-content">
                    <h1>Frequently asked questions</h1>
                    <p>Click on respective question to get its answer.</p>
                </div>
            </header>

            <div className="faq">
                <h4 onClick={() => toggleAnswer(1)}>1. How to know the procedures on COPBOT?</h4>
                {activeIndex === 1 && (
                    <div className="answer">
                        You should click on COPBOT on Home page → Start Listening → Stop Listening → Translate text (if in Hindi) → Get the solution to your problem.
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(2)}>2. How to access COPHELP?</h4>
                {activeIndex === 2 && (
                    <div className="answer">
                        You should click on COPHELP on the Home page → Start Listening → Stop Listening → Translate text (if in Hindi) → Get the solution to your problem.
                        <br />
                        Also, you can convert the text into Hindi and again click on "Get solution of the problem".
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(3)}>3. Is there an option for multiple languages on the website?</h4>
                {activeIndex === 3 && (
                    <div className="answer">
                        Currently, the website is available in English and Hindi, but we are working on adding more language options in the future.
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(4)}>4. Can I provide feedback about the website?</h4>
                {activeIndex === 4 && (
                    <div className="answer">
                        Absolutely! We welcome your feedback. Please visit the "Feedback" section on the home page to share your thoughts.
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(5)}>5. What should I do if I encounter a technical issue on the website?</h4>
                {activeIndex === 5 && (
                    <div className="answer">
                        If you experience any technical issues, please contact our support team through the "Contact Us" on the footer section.
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(6)}>6. Can I book an appointment with a police officer through the website?</h4>
                {activeIndex === 6 && (
                    <div className="answer">
                        While you can find information on how to request appointments, actual booking needs to be done through the designated police channels.
                    </div>
                )}
            </div>
            <div className="faq">
                <h4 onClick={() => toggleAnswer(7)}>7. What is the difference between COPHELP and COPBOT?</h4>
                {activeIndex === 7 && (
                    <div className="answer">
                        COPHELP is a general FAQ answering bot, whereas COPBOT provides legal procedures for the reported crime.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Faq;
