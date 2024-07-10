const fetch = require('node-fetch');
const fs = require('fs');
const path = './quotes.json';

// Function to append quotes to the JSON file
const appendQuotesToFile = (quotes) => {
  if (fs.existsSync(path)) {
    // If file exists, read its content
    const existingQuotes = JSON.parse(fs.readFileSync(path, 'utf-8'));
    // Append new quotes to existing ones
    const updatedQuotes = existingQuotes.concat(quotes);
    fs.writeFileSync(path, JSON.stringify(updatedQuotes, null, 2), 'utf-8');
  } else {
    // If file doesn't exist, create it and write the quotes
    fs.writeFileSync(path, JSON.stringify(quotes, null, 2), 'utf-8');
  }
};

// Function to fetch all quotes from Quotable API
const fetchAllQuotes = async () => {
  let currentPage = 1;
  const quotesPerPage = 100; // Quotable API allows fetching up to 100 quotes per request
  let totalPages = 1;

  while (currentPage <= totalPages) {
    const response = await fetch(`https://api.quotable.io/quotes?limit=${quotesPerPage}&page=${currentPage}`);
    const data = await response.json();
    appendQuotesToFile(data.results);
    totalPages = data.totalPages;
    currentPage++;
  }
};

(async () => {
  try {
    await fetchAllQuotes();
    console.log('Quotes fetching completed.');
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
})();
