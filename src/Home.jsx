import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import memeDog from './assets/dog-meme.jpg';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to JustiFi AI</h1>
      <p>
        Are you tired of using the same old excuses like <em>"I forgot my homework"</em> or <em>"My dog ate it"</em>?  
        <br />
        Well... not anymore!
      </p>

      <div className="meme-section">
        <img src={memeDog} alt="Dog Ate Homework Meme" className="meme-image" />
        <p className="meme-caption">
          "*Bro... not this excuse again.*"
        </p>
      </div>

      <Link to="/generate">
        <button className="start-button">Generate Excuses</button>
      </Link>
    </div>
  );
}

export default Home;
