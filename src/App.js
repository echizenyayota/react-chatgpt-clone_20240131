import { useState } from "react";

const App = () => {

  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);

  const getMessages = async() => {

    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      }
    };

    try {
      const response = await fetch('http://localhost:8000/completions', options);
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch(err) {
      console.log(err);
    }
  }

  console.log(message);

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>aaaaa</li>
          <li>bbbb</li>
          <li>cccccccc</li>
        </ul>
        <nav>
          <p>Made by Echizenya</p>
        </nav>
      </section>
      <section className="main">
        <h1>Echizenya GPT</h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
            <p className="info">
              Chat GPT Dec 29 version. Free Research Preview. Our goal is to make AI systems more natural and safe to interact with. Your feedback will help us improve.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
