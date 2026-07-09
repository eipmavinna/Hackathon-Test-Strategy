import { useState } from "react";
import { genreRuleSets } from "./data/escapeRoomCorpus";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <main>
      <h1>Digital Escape Room Designer</h1>

      <label htmlFor="genre">Escape-room genre</label>

      <select
        id="genre"
        value={selectedGenre}
        onChange={(event) => setSelectedGenre(event.target.value)}
      >
        <option value="">Select a genre</option>

        {genreRuleSets.map((ruleSet) => (
          <option key={ruleSet.genre} value={ruleSet.genre}>
            {ruleSet.displayName}
          </option>
        ))}
      </select>
      <p>Selected genre: {selectedGenre}</p>
    </main>
  );
}

export default App;