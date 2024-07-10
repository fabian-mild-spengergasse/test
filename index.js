import fetch from 'node-fetch';

const fetchQuotesFromPage = async (page, limit) => {
  const response = await fetch(`https://api.quotable.io/quotes?limit=${limit}&page=${page}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch quotes from page ${page}`);
  }
  return response.json();
};

const fetchSinglePageQuotes = async () => {
  try {
    const data = await fetchQuotesFromPage(1, 10); // Fetch only 10 quotes from the first page
    console.log('Fetched quotes:', data.results);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

// Main function to initiate the fetching process
(async () => {
  await fetchSinglePageQuotes();
})();
