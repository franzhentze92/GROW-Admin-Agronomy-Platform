import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const ArticleDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    console.log('ArticleDetailsPage: Loading article with ID:', id);
    fetch('/articles.json')
      .then(res => {
        console.log('ArticleDetailsPage: Fetch response status:', res.status);
        if (!res.ok) throw new Error('Failed to fetch articles');
        return res.json();
      })
      .then(data => {
        console.log('ArticleDetailsPage: Fetched articles data length:', data.length);
        console.log('ArticleDetailsPage: Looking for article with ID:', id);
        const foundArticle = data.find((a: any) => a.id === id);
        console.log('ArticleDetailsPage: Found article:', foundArticle);
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          console.log('ArticleDetailsPage: Article not found, available IDs:', data.map((a: any) => a.id).slice(0, 5));
          setError('Article not found');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('ArticleDetailsPage: Error loading article:', err);
        setError('Could not load article.');
        setLoading(false);
      });
  }, [id]);

  // Add a helper to clean up/normalize article content
  function cleanContent(content: string): string {
    if (!content) return '';
    // Replace common encoding artifacts
    let cleaned = content
      .replace(/â€™/g, "'")
      .replace(/â€œ|â€/g, '"')
      .replace(/â€“/g, '-')
      .replace(/â€”/g, '--')
      .replace(/â€¢/g, '•')
      .replace(/â€¦/g, '...')
      .replace(/â€˜/g, "'")
      .replace(/Â/g, '')
      .replace(/â€/g, '');
    // Decode HTML entities
    const txt = document.createElement('textarea');
    txt.innerHTML = cleaned;
    cleaned = txt.value;
    return cleaned;
  }

  // Function to render content with images and justified text
  const renderContent = (content: string) => {
    if (!content) return null;
    const cleanedContent = cleanContent(content);
    if (!cleanedContent.trim()) {
      return (
        <div className="text-gray-600 text-center py-8">
          <p className="mb-4">Full content not available.</p>
          {article.link && (
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-lime-500 text-white font-semibold rounded-lg px-6 py-3 shadow hover:bg-lime-600 transition"
            >
              <i className="fa fa-external-link mr-2"></i>
              Read on Nutri-Tech Blog
            </a>
          )}
        </div>
      );
    }

    // Split content into paragraphs
    const paragraphs = cleanedContent.split('\n\n').filter((p: string) => p.trim());
    
    return paragraphs.map((paragraph: string, index: number) => {
      // Check if paragraph contains an image URL
      const imageMatch = paragraph.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp)/i);
      
      if (imageMatch) {
        const imageUrl = imageMatch[0];
        const textContent = paragraph.replace(imageMatch[0], '').trim();
        
        return (
          <div key={index} className="mb-8">
            {textContent && (
              <p className="text-gray-800 text-lg leading-relaxed mb-4 text-justify">
                {textContent}
              </p>
            )}
            <div className="flex justify-center mb-6">
              <img 
                src={imageUrl} 
                alt={`Article image ${index + 1}`}
                className="max-w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  // Hide image if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        );
      } else {
        // If paragraph looks like HTML, render as HTML
        if (/<[a-z][\s\S]*>/i.test(paragraph)) {
          return (
            <div key={index} className="text-gray-800 text-lg leading-relaxed mb-6 text-justify prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: paragraph }} />
          );
        }
        return (
          <p key={index} className="text-gray-800 text-lg leading-relaxed mb-6 text-justify">
            {paragraph}
          </p>
        );
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
          <div className="text-center text-gray-500 py-10">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="w-full flex justify-center bg-gray-50 min-h-screen">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
          <div className="text-center text-red-500 py-10">
            {error || 'Article not found'}
          </div>
          <div className="text-center">
            <button 
              onClick={() => navigate('/app/education/articles')}
              className="bg-lime-500 text-white font-semibold rounded-lg px-6 py-3 shadow hover:bg-lime-600 transition"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/app/education/articles')}
            className="flex items-center text-lime-600 hover:text-lime-700 mb-4 transition"
          >
            <i className="fa fa-arrow-left mr-2"></i>
            Back to Articles
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            {article.date && (
              <div className="flex items-center">
                <i className="fa fa-calendar mr-2"></i>
                {article.date}
              </div>
            )}
            {article.author && (
              <div className="flex items-center">
                <i className="fa fa-user mr-2"></i>
                {article.author}
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center">
                <i className="fa fa-clock-o mr-2"></i>
                {article.readTime}
              </div>
            )}
          </div>
          
          {article.image && (
            <div className="mb-6">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content ? (
            renderContent(article.content)
          ) : (
            <div className="text-gray-600 text-center py-8">
              <p className="mb-4">Full content not available.</p>
              <a 
                href={article.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-lime-500 text-white font-semibold rounded-lg px-6 py-3 shadow hover:bg-lime-600 transition"
              >
                <i className="fa fa-external-link mr-2"></i>
                Read on Nutri-Tech Blog
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Source: Nutri-Tech Solutions Blog
            </div>
            <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lime-600 hover:text-lime-700 text-sm font-medium"
            >
              View Original Article
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailsPage; 