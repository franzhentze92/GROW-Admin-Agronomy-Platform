import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ArticlesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('/articles.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch articles');
        return res.json();
      })
      .then(data => {
        setArticles(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Could not load articles.');
        setLoading(false);
      });
  }, []);

  // Filter articles by search
  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(search.toLowerCase()) ||
    (article.excerpt && article.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  // Group articles by month/year
  const grouped: Record<string, any[]> = filteredArticles.reduce((acc, article) => {
    let dateKey = 'Unknown Date';
    if (article.date) {
      try {
        const date = new Date(article.date);
        if (!isNaN(date.getTime())) {
          dateKey = date.toLocaleString('default', { month: 'long', year: 'numeric' });
        }
      } catch (err) {
        // Keep as 'Unknown Date'
      }
    }
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(article);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="w-full flex justify-center bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow p-10 my-10 mx-4">
        <h1 className="text-3xl font-bold mb-6">Articles & Blog Posts</h1>
        <hr className="mb-6" />
        
        {/* Search and controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 rounded-lg border px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="bg-lime-500 text-white font-semibold rounded-lg px-4 py-2 text-base shadow hover:bg-lime-600 transition">Search</button>
          <button 
            onClick={() => {
              setLoading(true);
              fetch('/articles.json?t=' + Date.now())
                .then(res => {
                  if (!res.ok) throw new Error('Failed to fetch articles');
                  return res.json();
                })
                .then(data => {
                  setArticles(data);
                  setLoading(false);
                })
                .catch(err => {
                  setError('Could not refresh articles.');
                  setLoading(false);
                });
            }}
            className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2 text-base shadow hover:bg-blue-600 transition"
          >
            <i className="fa fa-refresh mr-2"></i>Refresh
          </button>
        </div>

        {/* Loading/Error */}
        {loading && <div className="text-center text-gray-500 py-10">Loading articles...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        
        {/* Articles List */}
        {!loading && !error && Object.entries(grouped).length === 0 && (
          <div className="text-center text-gray-500 py-10">No articles found.</div>
        )}
        
        {!loading && !error && Object.entries(grouped).map(([month, monthArticles]) => (
          <div key={month} className="mb-10">
            <div className="text-lg font-semibold text-gray-500 mb-4">{month}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthArticles.map((article) => (
                <div 
                  key={article.id || article.title} 
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/app/education/articles/${article.id}`)}
                >
                  {article.image && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {article.date && (
                        <span className="text-sm text-gray-500">
                          <i className="fa fa-calendar mr-1"></i>
                          {article.date}
                        </span>
                      )}
                      {article.readTime && (
                        <span className="text-sm text-gray-500">
                          <i className="fa fa-clock-o mr-1"></i>
                          {article.readTime}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 line-clamp-2">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    {article.author && (
                      <div className="text-sm text-gray-500 mb-3">
                        <i className="fa fa-user mr-1"></i>
                        {article.author}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-lime-600 text-sm font-medium">Read Article</span>
                      <i className="fa fa-external-link text-gray-400"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage; 