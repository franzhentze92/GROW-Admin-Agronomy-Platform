import React from 'react';

const GManChatPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4 p-4 bg-white rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold text-foreground">G-Man Chat</h1>
        <p className="text-muted-foreground mt-1">Your personal AI assistant for agronomy questions.</p>
      </div>
      <div className="rounded-lg overflow-hidden shadow-lg h-full">
        <iframe
          src="https://www.chatbase.co/chatbot-iframe/495OL95GJUbHmOtYjtTr-"
          width="100%"
          style={{ height: 'calc(100vh - 12rem)', minHeight: '600px' }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default GManChatPage; 