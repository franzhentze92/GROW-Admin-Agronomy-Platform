const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BLOG_URL = 'https://blog.nutri-tech.com.au/';
const OUTPUT_PATH = path.join(__dirname, 'public', 'articles.json');

async function fetchArticleContent(articleUrl) {
  try {
    const fullUrl = articleUrl.startsWith('http') ? articleUrl : `https://blog.nutri-tech.com.au${articleUrl}`;
    console.log(`Fetching content: ${fullUrl}`);
    
    const { data: html } = await axios.get(fullUrl);
    const $ = cheerio.load(html);
    
    // Extract the main article content
    const content = $('.post-content, .post-body, article, .entry-content').first();
    
    if (content.length === 0) {
      return '';
    }
    
    // Get all paragraphs and format them
    const paragraphs = [];
    content.find('p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote').each((i, el) => {
      const text = $(el).text().trim();
      if (text && text.length > 10) {
        paragraphs.push(text);
      }
    });
    
    // Extract images from the content
    const images = [];
    content.find('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !src.includes('avatar') && !src.includes('logo')) {
        images.push(src);
      }
    });
    
    // Combine text and images
    let fullContent = paragraphs.join('\n\n');
    
    // Add images to the content (insert them between paragraphs)
    if (images.length > 0) {
      const textParts = fullContent.split('\n\n');
      const combinedContent = [];
      
      textParts.forEach((part, index) => {
        combinedContent.push(part);
        // Add an image after every few paragraphs
        if (index < images.length && index % 2 === 1) {
          combinedContent.push(images[index - 1]);
        }
      });
      
      // Add any remaining images
      for (let i = Math.floor(textParts.length / 2); i < images.length; i++) {
        combinedContent.push(images[i]);
      }
      
      fullContent = combinedContent.join('\n\n');
    }
    
    return fullContent;
  } catch (error) {
    console.error(`Error fetching article content: ${error.message}`);
    return '';
  }
}

async function fetchArticles() {
  const articles = [];
  let page = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    try {
      const url = page === 1 ? BLOG_URL : `${BLOG_URL}page/${page}/`;
      console.log(`Fetching page ${page}: ${url}`);
      
      const { data: html } = await axios.get(url);
      const $ = cheerio.load(html);
      
      // Find all article elements
      const articleElements = $('article, .post, .blog-post, [class*="post"], [class*="article"]');
      
      if (articleElements.length === 0) {
        // Try alternative selectors for Ghost blog structure
        const altElements = $('.post-card, .post-feed, [class*="post-card"]');
        
        if (altElements.length === 0) {
          console.log(`No more articles found on page ${page}`);
          hasMorePages = false;
          break;
        }
        
        // Process Ghost blog structure
        for (let i = 0; i < altElements.length; i++) {
          const element = altElements[i];
          const title = $(element).find('h2, h3, .post-card-title').first().text().trim();
          const link = $(element).find('a').first().attr('href');
          const excerpt = $(element).find('.post-card-excerpt, p').first().text().trim();
          const image = $(element).find('img').first().attr('src') || '';
          const dateText = $(element).find('time, .post-card-meta-date').first().text().trim();
          const author = $(element).find('.post-card-meta-author, .author').first().text().trim();
          const readTime = $(element).find('.post-card-meta-readtime, .read-time').first().text().trim();
          
          if (title && !title.includes('Nutrition Matters') && !title.includes('Subscribe')) {
            console.log(`Processing article: ${title}`);
            
            // Fetch full content for in-app reader
            const content = await fetchArticleContent(link);
            
            articles.push({
              id: slugify(title),
              title,
              link,
              excerpt,
              content,
              image,
              date: dateText,
              author,
              readTime
            });
            
            // Add delay between article requests to be respectful
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      } else {
        // Process standard article structure
        for (let i = 0; i < articleElements.length; i++) {
          const element = articleElements[i];
          const title = $(element).find('h1, h2, h3, h4').first().text().trim();
          const link = $(element).find('a').first().attr('href');
          const excerpt = $(element).find('p, .excerpt, .summary').first().text().trim();
          const image = $(element).find('img').first().attr('src') || '';
          const dateText = $(element).find('time, .date, [class*="date"]').first().text().trim();
          const author = $(element).find('.author, [class*="author"]').first().text().trim();
          const readTime = $(element).find('.read-time, [class*="read"]').first().text().trim();
          
          if (title && !title.includes('Nutrition Matters') && !title.includes('Subscribe')) {
            console.log(`Processing article: ${title}`);
            
            // Fetch full content for in-app reader
            const content = await fetchArticleContent(link);
            
            articles.push({
              id: slugify(title),
              title,
              link,
              excerpt,
              content,
              image,
              date: dateText,
              author,
              readTime
            });
            
            // Add delay between article requests to be respectful
            await new Promise(resolve => setTimeout(resolve, 500));
          }
        }
      }
      
      // Check if there's a next page by looking for "Older Posts" link
      const nextPage = $('a').filter((i, el) => {
        const text = $(el).text().toLowerCase();
        return text.includes('older posts') || text.includes('next');
      }).first();
      
      if (nextPage.length === 0) {
        console.log('No more pages found');
        hasMorePages = false;
      } else {
        console.log('Found next page, continuing...');
      }
      
      page++;
      
      // Safety limit to prevent infinite loops
      if (page > 50) {
        console.log('Reached safety limit of 50 pages');
        hasMorePages = false;
      }
      
      // Add delay between page requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error.message);
      hasMorePages = false;
    }
  }

  // Remove duplicates based on title
  const uniqueArticles = articles.filter((article, index, self) => 
    index === self.findIndex(a => a.title === article.title)
  );

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(uniqueArticles, null, 2));
  console.log(`Saved ${uniqueArticles.length} articles to ${OUTPUT_PATH}`);
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

fetchArticles().catch(err => {
  console.error('Error fetching articles:', err);
  process.exit(1);
}); 