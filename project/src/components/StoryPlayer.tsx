import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';
import { Story, StoryNode, GameSave } from '../types/story';

interface StoryPlayerProps {
  story: Story;
  saves: GameSave[];
  onSave: (save: GameSave) => void;
  onBack: () => void;
}

export const StoryPlayer: React.FC<StoryPlayerProps> = ({
  story,
  saves,
  onSave,
  onBack,
}) => {
  const [currentNodeId, setCurrentNodeId] = useState(story.startNodeId);
  const [playerName, setPlayerName] = useState('');
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);
  const [showNameInput, setShowNameInput] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const currentNode = story.nodes[currentNodeId];
  const existingSave = saves.find(save => save.storyId === story.id);

  useEffect(() => {
    if (existingSave && !gameStarted) {
      setPlayerName(existingSave.playerName);
      setShowNameInput(false);
    }
  }, [existingSave, gameStarted]);

  const startGame = () => {
    if (!playerName.trim()) return;
    setShowNameInput(false);
    setGameStarted(true);
  };

  const loadSavedGame = () => {
    if (existingSave) {
      setCurrentNodeId(existingSave.currentNodeId);
      setChoiceHistory(existingSave.choices);
      setPlayerName(existingSave.playerName);
      setShowNameInput(false);
      setGameStarted(true);
    }
  };

  const makeChoice = (choiceText: string, targetNodeId: string) => {
    const newHistory = [...choiceHistory, choiceText];
    setChoiceHistory(newHistory);
    setCurrentNodeId(targetNodeId);
  };

  const saveGame = () => {
    const save: GameSave = {
      storyId: story.id,
      currentNodeId,
      playerName,
      savedAt: new Date().toISOString(),
      choices: choiceHistory,
    };
    onSave(save);
  };

  const restartGame = () => {
    setCurrentNodeId(story.startNodeId);
    setChoiceHistory([]);
    setGameStarted(true);
  };

  if (showNameInput) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Ready to begin your adventure?
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Enter your name
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startGame()}
                placeholder="Your name here..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                autoFocus
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={startGame}
                disabled={!playerName.trim()}
                className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Start New Game
              </button>
              
              {existingSave && (
                <button
                  onClick={loadSavedGame}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Continue Saved
                </button>
              )}
            </div>
            
            <button
              onClick={onBack}
              className="w-full py-2 text-gray-400 hover:text-white transition-colors"
            >
              Back to Library
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentNode) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Story Error</h2>
        <p className="text-gray-300 mb-6">The current story node could not be found.</p>
        <button
          onClick={restartGame}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Restart Story
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Playing as <span className="text-amber-400 font-medium">{playerName}</span></span>
          <div className="flex space-x-2">
            <button
              onClick={saveGame}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={restartGame}
              className="flex items-center space-x-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 leading-tight">
            {currentNode.title}
          </h1>
          
          <div className="prose prose-lg prose-invert max-w-none mb-8">
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
              {currentNode.content}
            </p>
          </div>

          {currentNode.isEnding ? (
            <div className="text-center space-y-6 py-8">
              <div className="text-6xl mb-4">🎭</div>
              <h2 className="text-2xl font-bold text-amber-400 mb-4">The End</h2>
              <p className="text-gray-300 mb-6">
                Thank you for playing, {playerName}! Your journey has come to a conclusion.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={restartGame}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={onBack}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Choose Another Story
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-300 mb-4">What do you choose?</h3>
              <div className="grid gap-3">
                {currentNode.choices.map((choice, index) => (
                  <button
                    key={choice.id}
                    onClick={() => makeChoice(choice.text, choice.targetNodeId)}
                    className="text-left p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-200 border border-gray-600 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium group-hover:bg-amber-500 transition-colors">
                        {index + 1}
                      </span>
                      <span className="text-white group-hover:text-amber-100 transition-colors">
                        {choice.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {choiceHistory.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Your Journey</h3>
          <div className="space-y-2">
            {choiceHistory.map((choice, index) => (
              <div key={index} className="flex items-center space-x-3 text-sm">
                <span className="flex-shrink-0 w-5 h-5 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs">
                  {index + 1}
                </span>
                <span className="text-gray-300">{choice}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};