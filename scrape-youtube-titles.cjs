const fs = require('fs');
const https = require('https');

// Your list of YouTube links
const links = [
  "https://www.youtube.com/watch?v=HRqDXnvlRdg",
  "https://www.youtube.com/watch?v=jZgM1iQWqPM",
  "https://www.youtube.com/watch?v=AX5evpVnEBk",
  "https://www.youtube.com/watch?v=1vhDSDl3Y54",
  "https://www.youtube.com/watch?v=XRfu6qI2Glc",
  "https://www.youtube.com/watch?v=4NrWXUkH5cM",
  "https://www.youtube.com/watch?v=PajJ1zRzHrY",
  "https://www.youtube.com/watch?v=wuOiEHt1a48",
  "https://www.youtube.com/watch?v=XYt2Ovia0RA",
  "https://www.youtube.com/watch?v=OjxN2JtxWR0",
  "https://www.youtube.com/watch?v=Jvkr3Wkh7nY",
  "https://www.youtube.com/watch?v=OQ19RgQQIoY",
  "https://www.youtube.com/watch?v=O2MpgSo3UAc",
  "https://www.youtube.com/watch?v=eQYI-1P3YEs",
  "https://www.youtube.com/watch?v=uq7uShYR17Y",
  "https://www.youtube.com/watch?v=gHiG-JrcZMU",
  "https://www.youtube.com/watch?v=SuSAwFd1mRQ",
  "https://www.youtube.com/watch?v=BABGwfoiofs",
  "https://www.youtube.com/watch?v=oCiwhK0RUKA",
  "https://www.youtube.com/watch?v=XKYZasqH89E",
  "https://www.youtube.com/watch?v=GDtr0tn55K8",
  "https://www.youtube.com/watch?v=ap3rlCssNuQ",
  "https://www.youtube.com/watch?v=lZmRCMYbzik",
  "https://www.youtube.com/watch?v=bPQ-iDzURF4",
  "https://www.youtube.com/watch?v=ArFkodAzeQc",
  "https://www.youtube.com/watch?v=1vyq5lkbif8",
  "https://www.youtube.com/watch?v=aadoO667DlY",
  "https://www.youtube.com/watch?v=cvUGWDQZ15Y",
  "https://www.youtube.com/watch?v=eGP1vjdczzo",
  "https://www.youtube.com/watch?v=ZnSjbvilUZA",
  "https://www.youtube.com/watch?v=rMUZhtQl9JA",
  "https://www.youtube.com/watch?v=-bYyVhBX1Ek",
  "https://www.youtube.com/watch?v=_YuNM1Kcwds",
  "https://www.youtube.com/watch?v=2mF31Fj0RVc",
  "https://www.youtube.com/watch?v=i5W-ierGTNY",
  "https://www.youtube.com/watch?v=BiqXEvKBTRU",
  "https://www.youtube.com/watch?v=Iw_eRRfbLzs",
  "https://www.youtube.com/watch?v=hnI18b-ysqo",
  "https://www.youtube.com/watch?v=W8nl7qAtm1g"
];

function extractVideoId(url) {
  const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function fetchTitle(url) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.youtube.com',
      path: new URL(url).pathname + new URL(url).search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          // Look for the title in the HTML
          const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch) {
            let title = titleMatch[1].replace(' - YouTube', '').trim();
            resolve(title);
          } else {
            resolve('Title not found');
          }
        } catch (error) {
          resolve('Error parsing title');
        }
      });
    });

    req.on('error', (error) => {
      resolve('Error fetching video');
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve('Timeout');
    });

    req.end();
  });
}

async function scrapeAllTitles() {
  const results = [];
  
  console.log('Starting to scrape YouTube titles...');
  console.log(`Total videos to process: ${links.length}\n`);
  
  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    const videoId = extractVideoId(url);
    
    if (!videoId) {
      console.log(`Skipping invalid URL: ${url}`);
      continue;
    }
    
    console.log(`[${i + 1}/${links.length}] Fetching title for: ${videoId}`);
    
    const title = await fetchTitle(url);
    
    results.push({
      id: videoId,
      title: title,
      url: url
    });
    
    console.log(`  Title: ${title}`);
    
    // Add a small delay to be respectful to YouTube's servers
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

// Run the scraper
scrapeAllTitles().then(results => {
  console.log('\n=== SCRAPING COMPLETE ===');
  console.log(`Successfully processed ${results.length} videos\n`);
  
  // Save results to JSON file
  fs.writeFileSync('youtube_video_titles.json', JSON.stringify(results, null, 2));
  console.log('Results saved to: youtube_video_titles.json');
  
  // Also save as CSV for easy viewing
  const csvContent = 'Video ID,Title,URL\n' + 
    results.map(r => `"${r.id}","${r.title.replace(/"/g, '""')}","${r.url}"`).join('\n');
  fs.writeFileSync('youtube_video_titles.csv', csvContent);
  console.log('Results also saved to: youtube_video_titles.csv');
  
  // Display summary
  console.log('\n=== SUMMARY ===');
  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.title} (${result.id})`);
  });
}).catch(error => {
  console.error('Error during scraping:', error);
}); 