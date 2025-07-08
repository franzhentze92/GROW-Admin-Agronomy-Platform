// import-clients.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { createClient } = require('./src/lib/clientsApi');

// Helper to load Supabase client if needed
require('dotenv').config();

const csvFile = path.join(__dirname, 'client_database.csv');

async function importClients() {
  let count = 0;
  let errors = 0;
  const clients = [];

  fs.createReadStream(csvFile)
    .pipe(csv())
    .on('data', (row) => {
      if (!row.NAME) return; // Skip if no name
      const address = [row.ADDRESS1, row.ADDRESS2, row.ADDRESS3, row.ADDRESS4]
        .filter(Boolean)
        .join(', ');
      clients.push({
        name: row.NAME.trim(),
        email: row.EMAIL ? row.EMAIL.trim() : undefined,
        phone: row.PHONE ? row.PHONE.trim() : undefined,
        address: address || undefined,
      });
    })
    .on('end', async () => {
      console.log(`Parsed ${clients.length} clients. Importing...`);
      for (const client of clients) {
        try {
          await createClient(client);
          count++;
          if (count % 50 === 0) console.log(`Imported ${count} clients...`);
        } catch (err) {
          errors++;
          console.error('Error importing client:', client, err.message);
        }
      }
      console.log(`Done! Imported ${count} clients with ${errors} errors.`);
      process.exit(0);
    });
}

importClients(); 