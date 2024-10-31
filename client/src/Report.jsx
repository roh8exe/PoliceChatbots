import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './speech.module.css'; // Importing CSS Module
import goa_logo from '/goa_image.png'
function Report() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [translatedtext, settranslatedtext] = useState(null); 
  const [sol, setsol] = useState(null);
  const [pol, setpol] = useState([]);
  const [but, setBut] = useState("english"); // Default to English

  const startListening = () => {
    resetTranscript();
    settranslatedtext(null);
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const reset = () => {
    settranslatedtext(null);
    resetTranscript();
    setpol([]);
    setsol("");
  };

  const externalML = async () => {
    try {
      const response = await fetch("https://hackathon-second.vercel.app/language", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: transcript
        })
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data.translatedText)
        settranslatedtext(data.translatedText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getSOl = async () => {
    try {
      const response = await fetch("https://8d5d-2409-40c2-2040-a78e-a428-16b8-4790-9bdd.ngrok-free.app/classify", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_description: translatedtext
        })
      });

      if (response.ok) {
        const data = await response.json();
        const procedure = data.procedure;

        let translatedProcedure = procedure;
        if (but === "hindi") {
          const hindiResponse = await fetch("https://hackathon-second.vercel.app/enHi", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: procedure
            })
          });
          if (hindiResponse.ok) {
            const hindiData = await hindiResponse.json();
            translatedProcedure = hindiData.translatedText;
          }
        }

        const arr = translatedProcedure.split('\\n');
        setsol(data.case_type);
        setpol(arr);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div>
        <p>Your browser does not support speech recognition.</p>
        <p>Please use an updated version of Chrome or Firefox for the best experience.</p>
      </div>
    );
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <img src={goa_logo} alt="Goa Police Logo" />
          </div>
          <div className={styles.title}>
            <h1>COPBOT</h1>
            <h3>AI Tool to assist visitors at police station</h3>
          </div>
        </div>
        <div className={styles.animatedBg}></div>
      </header>

      <div className={styles.speech}>
        <div className={styles.speech__transcript}>
          {transcript || "Your text will appear here."}
        </div>

      </div>
      <div className={styles.buttonsContainer}>
          <button className={styles.speech__button} onClick={startListening}>Start Listening</button>
          <button className={styles.speech__button} onClick={stopListening}>Stop Listening</button>
          <button className={styles.speech__button} onClick={reset}>Reset</button>
          <button className={styles.speech__button} onClick={externalML}>Translate your text</button>
          <button className={styles.speech__button} onClick={getSOl}>Get solution for problem</button>
        </div>
      <div className={styles.otpt}>
        <p>{translatedtext ? "YOUR TEXT HAS BEEN TRANSLATED YOU CAN GET THE SOLUTION" : "Start Listening -> Stop Listening -> Translate Text -> Get solution"}</p>
      </div>
    <div className={styles.vvi}>
      <select className={styles.dropbox} value={but} onChange={(e) => setBut(e.target.value)}>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
      </select>
    </div>
      <div className={styles.solution}>
        <div className={styles.first}>
          Case type -<br />
          <p>{sol ? sol : ""}</p>
        </div>
        <div className={styles.first}>
          Procedure - <br />
          <ul>
            {pol.map((line, index) => (<li key={index}>{line}</li>))}
          </ul>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Powered by COPBOT &copy; 2024</p>
      </footer>
    </>
  );
}

export default Report;
