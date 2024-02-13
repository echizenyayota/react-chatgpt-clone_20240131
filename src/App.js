import { useEffect, useState } from "react";

const App = () => {

  const [value, setValue] = useState("");
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  }

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

  useEffect(() => {

    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if(currentTitle && value && message) {
      setPreviousChats(preChats => (
        [...previousChats,
          {
            title: currentTitle,
            role: "user",
            content: value,
          },
          {
            title: currentTitle,
            role: message.role,
            content: message.content,
          }
        ]
      ))
    }

  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle);
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat =>
    previousChat.title
  )));

  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, _index) => 
          <li key={_index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Echizenya</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>Echizenya GPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, _index) => 
            <li key={_index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          )}
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
