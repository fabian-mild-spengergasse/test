import fetch from 'node-fetch';
import fs from 'fs';

const path = './quotes.json';

const readQuotesFromFile = () => {
  if (fs.existsSync(path)) {
    const existingQuotes = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return existingQuotes;
  }
  return [];
};

const appendQuotesToFile = (quotes) => {
  const existingQuotes = readQuotesFromFile();
  const updatedQuotes = existingQuotes.concat(quotes);
  fs.writeFileSync(path, JSON.stringify(updatedQuotes, null, 2), 'utf-8');
};

const fetchQuotesFromPage = async (page, limit) => {
  const response = await fetch(`https://api.quotable.io/quotes?limit=${limit}&page=${page}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch quotes from page ${page}`);
  }
  return response.json();
};

const fetchAllQuotes = async () => {
  let currentPage = 1;
  const quotesPerPage = 100; // Quotable API allows fetching up to 100 quotes per request
  let totalPages = 1;

  try {
    while (currentPage <= totalPages) {
      console.log(`Fetching page ${currentPage} of ${totalPages}`);
      const data = await fetchQuotesFromPage(currentPage, quotesPerPage);
      appendQuotesToFile(data.results);
      console.log(`Fetched and saved ${data.results.length} quotes from page ${currentPage}`);
      totalPages = data.totalPages;
      currentPage++;
    }
    console.log('Quotes fetching completed.');
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

// Main function to initiate the fetching process
(async () => {
  await fetchAllQuotes();
})();
