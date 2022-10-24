const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loader
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
// Show new quote
function newQuote() {
  loading();
  // Pick a random quotes form getQuotes API array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check the length of quote to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;

  // Check if the author name is unknows or not
  if (quote.author) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = "Unknown";
  }

  complete();
}

// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // You will catch the error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// On Load
getQuotes();

// Event listener
newQuoteBtn.addEventListener("click", (event) => {
  newQuote();
});
twitterBtn.addEventListener("click", (event) => {
  tweetQuote();
});
