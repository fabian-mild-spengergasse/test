const readQuotesFromFile = () => {
  if (fs.existsSync(path)) {
    const existingQuotes = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return {
      quotes: existingQuotes,
      count: existingQuotes.length
    };
  }
  return {
    quotes: [],
    count: 0
  };
};

// Example usage
const { quotes, count } = readQuotesFromFile();
console.log('Number of quotes:', count);
console.log('Quotes:', quotes);
