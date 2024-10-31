import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import styles from './speech.module.css'; // Importing CSS Module
import goa_logo from '/goa_image.png'
function Cophelp() {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [translatedtext, settranslatedtext] = useState(null); 
  const [sol, setsol] = useState(null);
  const [pol, setpol] = useState([]);
  const [but, setBut] = useState("english"); // Default to English
//   const 

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
        settranslatedtext(data.translatedText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getSOl = async () => {
    try {
      const response = await fetch("https://cda2-2409-40c2-2040-a78e-a428-16b8-4790-9bdd.ngrok-free.app/classify", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question : translatedtext
        })
      });

      if (response.ok) {
        const data = await response.json();
        const procedure = data.answer;

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
          }else{
            
          }
          const hindiQues = await fetch("https://hackathon-second.vercel.app/enHi", {
            method : "POST",
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({
                text : data.question
            })
          })
          if (hindiQues.ok) {
            const hindiQuestion = await hindiQues.json();
            data.question = hindiQuestion.translatedText;
        }
        }

        const arr = translatedProcedure.split('\\n');
        setpol(arr);
        setsol(data.question);
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
            <h1>COPHELP</h1>
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
        <p>{translatedtext ? "YOUR TEXT HAS BEEN TRANSLATED YOU CAN GET THE SOLUTION" : ""}</p>
      </div>
    <div className={styles.vvi}>
      <select className={styles.dropbox} value={but} onChange={(e) => setBut(e.target.value)}>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
      </select>
    </div>
      <div className={styles.solution}>
        <div className={styles.first}>
          Question -<br />
          <p>{sol ? sol : ""}</p>
        </div>
        <div className={styles.first}>
          Answer - <br />
          <ul>
            {pol.map((line, index) => (<li key={index}>{line}</li>))}
          </ul>
        </div>
      </div>

      <footer className={styles.footer}>
        <p>Powered by COPHELP &copy; 2024</p>
      </footer>
    </>
  );
}

export default Cophelp;
