import { useEffect, useState } from "react";
import "./App.css";

function pickFromArray(arrayOfQuotes) {
  return arrayOfQuotes[Math.floor(Math.random() * arrayOfQuotes.length)];
}

function App() {
  const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState({ quote: "Life isn’t about getting and having, it’s about giving and being.", author: "Kevin Kruse" });

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch(
          "https://adniyayousafqouteserver1-icbazzdng7yq.runkit.sh/quotes"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data. Status: " + response.status);
        }
        const responseData = await response.json();
        setQuotes(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    }

    fetchQuotes();
  }, []);
  const [nextQuote, setNextQuote] = useState(quotes);

  function handleClick() {
    if (quotes.length > 0) {
      const newQuote = pickFromArray(quotes);
      setNextQuote(newQuote);
    }
  }

  return (
    <div className="container">
      {error && <p>Error: {error}</p>}
      {nextQuote && (
        <p className="quote">
          <span className="quotationMark">“</span>
          {nextQuote.quote}
          <span className="author"> {nextQuote.author}</span>
        </p>
         
      )}
      <button onClick={() => handleClick()}>Next Quotation</button>
    </div>
  );
}

export default App;
