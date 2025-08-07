async function searchWord() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (data.title === "No Definitions Found") {
      resultDiv.innerHTML = `<p>No definition found for "${word}".</p>`;
      return;
    }

    const definition = data[0].meanings[0].definitions[0].definition;
    const example = data[0].meanings[0].definitions[0].example || "No example available.";
    const partOfSpeech = data[0].meanings[0].partOfSpeech;
    const phonetics = data[0].phonetics[0]?.text || "N/A";

    resultDiv.innerHTML = `
      <h2>${data[0].word}</h2>
      <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
      <p><strong>Phonetics:</strong> ${phonetics}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p>Error fetching definition. Try again later.</p>`;
    console.error(error);
  }
}
