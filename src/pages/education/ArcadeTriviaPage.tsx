import React from 'react';

const ArcadeTriviaPage: React.FC = () => {
  return (
    <iframe
      src="/grow-arcade-trivia.html"
      style={{ width: '100%', height: '92vh', border: 'none' }}
      title="GROW Trivia Challenge"
      allowFullScreen
    />
  );
};

export default ArcadeTriviaPage; 