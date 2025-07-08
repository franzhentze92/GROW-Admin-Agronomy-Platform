const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const EVENTS_URL = 'https://nutri-tech.com.au/pages/events';
const OUTPUT_PATH = path.join(__dirname, 'public', 'events.json');

async function fetchEvents() {
  const { data: html } = await axios.get(EVENTS_URL);
  const $ = cheerio.load(html);
  const events = [];

  // NTS logo image (to filter out)
  const NTS_LOGO = 'https://cdn.shopify.com/s/files/1/0614/9021/0757/files/NTS-Logo.png';

  function isRealEvent(title, image) {
    const lowerTitle = (title || '').toLowerCase();
    if (!title ||
      lowerTitle === 'events' ||
      lowerTitle === 'australian events' ||
      lowerTitle === 'nts' ||
      lowerTitle.includes('nutri-tech solutions') ||
      (image && image.includes('NTS-Logo'))
    ) {
      return false;
    }
    return true;
  }

  function extractDateRange(section, $) {
    const sectionText = $(section).text();
    // Patterns for date ranges and single dates
    const patterns = [
      // August 20–23, 2024 or August 20-23, 2024
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b[\s,]*(\d{1,2})(?:–|-)(\d{1,2})(?:,?\s*(\d{4}))?/i,
      // July 21st - 25th, 2025
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b[\s,]*(\d{1,2})(st|nd|rd|th)?\s*-\s*(\d{1,2})(st|nd|rd|th)?(?:,?\s*(\d{4}))?/i,
      // 20-23 August 2024
      /(\d{1,2})-(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)(?:,?\s*(\d{4}))?/i,
      // Single date: June 24, 2024
      /\b(January|February|March|April|May|June|July|August|September|October|November|December)\b[\s,]*(\d{1,2})(st|nd|rd|th)?(?:,?\s*(\d{4}))?/i,
      // Single date: 24 June 2024
      /(\d{1,2})(st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)(?:,?\s*(\d{4}))?/i
    ];

    for (const pattern of patterns) {
      const match = sectionText.match(pattern);
      if (match) {
        // Handle date range
        if (pattern === patterns[0] || pattern === patterns[1] || pattern === patterns[2]) {
          // Extract start and end
          let month, year, startDay, endDay;
          if (pattern === patterns[0] || pattern === patterns[1]) {
            month = match[1];
            startDay = match[2];
            endDay = match[3] || match[4];
            year = match[4] || match[6] || new Date().getFullYear();
          } else if (pattern === patterns[2]) {
            startDay = match[1];
            endDay = match[2];
            month = match[3];
            year = match[4] || new Date().getFullYear();
          }
          const start = `${month} ${startDay}, ${year}`;
          const end = `${month} ${endDay}, ${year}`;
          return { date: start, endDate: end };
        } else {
          // Single date
          let month, day, year;
          if (pattern === patterns[3]) {
            month = match[1];
            day = match[2];
            year = match[4] || new Date().getFullYear();
          } else if (pattern === patterns[4]) {
            day = match[1];
            month = match[3];
            year = match[4] || new Date().getFullYear();
          }
          const date = `${month} ${day}, ${year}`;
          return { date };
        }
      }
    }
    return null;
  }

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/--+/g, '-')            // Replace multiple - with single -
      .replace(/^-+/, '')              // Trim - from start of text
      .replace(/-+$/, '');             // Trim - from end of text
  }

  $('.shopify-section').each((i, section) => {
    const sectionText = $(section).text();
    if (/Certificate in Nutrition Farming|Soil Health|Festival of Food|Event/i.test(sectionText)) {
      const title = $(section).find('h2, h3').first().text().trim();
      // Extract all <p> tags for full description
      const paragraphs = [];
      $(section).find('p').each((i, el) => {
        const text = $(el).text().trim();
        if (text) paragraphs.push(text);
      });
      const description = paragraphs.join('\n\n');
      const dateObj = extractDateRange(section, $) || { date: 'Unknown' };
      if (dateObj.date === 'Unknown') {
        console.warn(`Warning: No date found for event: ${title}`);
      }
      const locationMatch = sectionText.match(/Where:\s*([^\n]+)/i);
      const location = locationMatch ? locationMatch[1].trim() : '';
      const costMatch = sectionText.match(/Cost:\s*([^\n]+)/i);
      const cost = costMatch ? costMatch[1].trim() : '';
      const image = $(section).find('img').first().attr('src') || '';
      const link = EVENTS_URL;
      if (isRealEvent(title, image)) {
        events.push({
          id: slugify(title),
          title,
          description,
          date: dateObj.date,
          endDate: dateObj.endDate,
          location,
          cost,
          image,
          link
        });
      }
    }
  });

  if (events.length === 0) {
    $('h2, h3').each((i, el) => {
      const title = $(el).text().trim();
      const parent = $(el).parent();
      const description = parent.find('p').first().text().trim();
      const sectionText = parent.text();
      const dateMatch = sectionText.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\b\s+\d{1,2}(–\d{1,2})?/i);
      const date = dateMatch ? dateMatch[0] : '';
      const locationMatch = sectionText.match(/Where:\s*([^\n]+)/i);
      const location = locationMatch ? locationMatch[1].trim() : '';
      const costMatch = sectionText.match(/Cost:\s*([^\n]+)/i);
      const cost = costMatch ? costMatch[1].trim() : '';
      const image = parent.find('img').first().attr('src') || '';
      const link = EVENTS_URL;
      if (isRealEvent(title, image)) {
        events.push({
          id: slugify(title),
          title,
          description,
          date,
          location,
          cost,
          image,
          link
        });
      }
    });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2));
  console.log(`Saved ${events.length} events to ${OUTPUT_PATH}`);
}

fetchEvents().catch(err => {
  console.error('Error fetching events:', err);
  process.exit(1);
}); 