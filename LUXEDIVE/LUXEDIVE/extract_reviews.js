import fs from 'fs';
const content = fs.readFileSync('c:\\Users\\deepa\\Desktop\\LUXEDIVE\\LUXEDIVE\\LUXEDIVE\\populate_reviews.sql', 'utf8');
const regex = /VALUES \('([^']*)',.*, (\d), '([^']*)',/g;
const reviews = [];
let match;
while ((match = regex.exec(content)) !== null) {
  reviews.push({ id: match[1], rating: parseInt(match[2]), comment: match[3] });
}
const reviewsJson = JSON.stringify(reviews);
fs.writeFileSync('c:\\Users\\deepa\\Desktop\\LUXEDIVE\\LUXEDIVE\\LUXEDIVE\\reviews.json', reviewsJson);
console.log(`Extracted ${reviews.length} reviews.`);
