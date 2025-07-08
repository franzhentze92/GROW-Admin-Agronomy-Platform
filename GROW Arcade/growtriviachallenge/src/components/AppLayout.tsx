import React from 'react';
import GameScreen from './GameScreen';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen">
      <GameScreen />
    </div>
  );
};

export default AppLayout;