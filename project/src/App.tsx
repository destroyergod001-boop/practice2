import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Homepage } from './components/Homepage';
import { AdminPanel } from './components/AdminPanel';
import { StoryLibrary } from './components/StoryLibrary';
import { StoryPlayer } from './components/StoryPlayer';
import { loadAppState, saveAppState } from './utils/storage';
import { Story, GameSave, AppState } from './types/story';

function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  const updateStory = (story: Story) => {
    setAppState(prev => ({
      ...prev,
      stories: {
        ...prev.stories,
        [story.id]: story,
      },
    }));
  };

  const deleteStory = (storyId: string) => {
    const { [storyId]: deleted, ...remainingStories } = appState.stories;
    setAppState(prev => ({
      ...prev,
      stories: remainingStories,
      saves: prev.saves.filter(save => save.storyId !== storyId),
    }));
  };

  const saveGame = (gameSave: GameSave) => {
    setAppState(prev => {
      const existingIndex = prev.saves.findIndex(
        save => save.storyId === gameSave.storyId
      );
      
      const newSaves = [...prev.saves];
      if (existingIndex >= 0) {
        newSaves[existingIndex] = gameSave;
      } else {
        newSaves.push(gameSave);
      }
      
      return {
        ...prev,
        saves: newSaves,
      };
    });
  };

  const handleViewChange = (view: 'menu' | 'admin' | 'play' | 'library') => {
    setAppState(prev => ({ ...prev, currentView: view }));
    setSelectedStoryId(null);
  };

  const handleSelectStory = (storyId: string) => {
    setSelectedStoryId(storyId);
    setAppState(prev => ({ ...prev, currentView: 'play' }));
  };

  const handleBackToLibrary = () => {
    setSelectedStoryId(null);
    setAppState(prev => ({ ...prev, currentView: 'library' }));
  };

  const renderCurrentView = () => {
    if (appState.currentView === 'play' && selectedStoryId) {
      const story = appState.stories[selectedStoryId];
      if (story) {
        return (
          <StoryPlayer
            story={story}
            saves={appState.saves}
            onSave={saveGame}
            onBack={handleBackToLibrary}
          />
        );
      }
    }

    switch (appState.currentView) {
      case 'admin':
        return (
          <AdminPanel
            stories={appState.stories}
            onStoryUpdate={updateStory}
            onStoryDelete={deleteStory}
          />
        );
      
      case 'library':
        return (
          <StoryLibrary
            stories={appState.stories}
            saves={appState.saves}
            onSelectStory={handleSelectStory}
          />
        );
      
      case 'menu':
      default:
        return (
          <Homepage
            storiesCount={Object.keys(appState.stories).length}
            savesCount={appState.saves.length}
            onViewChange={handleViewChange}
          />
        );
    }
  };

  return (
    <Layout currentView={appState.currentView} onViewChange={handleViewChange}>
      {renderCurrentView()}
    </Layout>
  );
}

export default App;