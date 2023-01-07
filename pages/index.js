import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import oldManDappLogo from '/Users/paulmcfarlane/Downloads/GPT_writer/gpt3-writer-starter/pages/oldmandapp.png'; // add this line
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Psycho Teacher</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">

            <h1>Talk to Psycho Teacher</h1>
          </div>
          <div className="header-subtitle">
            <h2>Input a topic that you want psycho teacher to explain to you in simple terms</h2>
          </div>
        </div>
     
        <div className="prompt-container">
          <textarea 
          placeholder="Type your psychology question here" 
          className="prompt-box"
          value={userInput}
          onChange={onUserChangedText}
          />
            
            <div className="prompt-buttons">
              <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Answer</p>}
                </div>
              </a>
            
            </div>
                  


            {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Psycho Teacher says ...</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}



        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
          
            <p>Built by OldManDapp</p>
          </div>
        </a>
      </div> 
    </div>
  );
};

export default Home;
