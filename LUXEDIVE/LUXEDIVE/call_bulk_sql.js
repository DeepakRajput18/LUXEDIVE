import fs from 'fs';
const reviews = JSON.parse(fs.readFileSync('c:\\Users\\deepa\\Desktop\\LUXEDIVE\\LUXEDIVE\\LUXEDIVE\\reviews.json', 'utf8'));
const batchSize = 100;
let sql = '';
for (let i = 0; i < reviews.length; i += batchSize) {
  const batch = reviews.slice(i, i + batchSize);
  const ids = batch.map(r => `'${r.id}'`).join(',');
  const comments = batch.map(r => `'${r.comment.replace(/'/g, "''")}'`).join(',');
  const ratings = batch.map(r => r.rating).join(',');
  sql += `SELECT bulk_populate_reviews(ARRAY[${ids}]::UUID[], ARRAY[${comments}], ARRAY[${ratings}]);\n`;
}
fs.writeFileSync('c:\\Users\\deepa\\Desktop\\LUXEDIVE\\LUXEDIVE\\LUXEDIVE\\final_bulk_populate.sql', sql);
console.log(`Generated SQL for ${reviews.length} reviews.`);
