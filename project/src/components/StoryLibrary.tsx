import React from 'react';
import { Play, Clock, User, Tag } from 'lucide-react';
import { Story, GameSave } from '../types/story';

interface StoryLibraryProps {
  stories: Record<string, Story>;
  saves: GameSave[];
  onSelectStory: (storyId: string) => void;
}

export const StoryLibrary: React.FC<StoryLibraryProps> = ({
  stories,
  saves,
  onSelectStory,
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getSaveForStory = (storyId: string) => {
    return saves.find(save => save.storyId === storyId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Story Library</h2>
        <p className="text-gray-300 text-lg">Choose your next adventure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(stories).map((story) => {
          const save = getSaveForStory(story.id);
          
          return (
            <div
              key={story.id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-gray-600"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-white leading-tight pr-2">
                  {story.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor(story.difficulty)}`}>
                  {story.difficulty}
                </span>
              </div>

              <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {story.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <User className="h-4 w-4" />
                  <span>by {story.author}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Tag className="h-4 w-4" />
                  <span>{Object.keys(story.nodes).length} scenes</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>Created {formatDate(story.createdAt)}</span>
                </div>
              </div>

              {save && (
                <div className="bg-emerald-600/20 border border-emerald-600/30 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span className="text-sm text-emerald-300 font-medium">
                      Continue as {save.playerName}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 mt-1">
                    Saved {formatDate(save.savedAt)}
                  </p>
                </div>
              )}

              <button
                onClick={() => onSelectStory(story.id)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                <Play className="h-4 w-4" />
                <span>{save ? 'Continue Story' : 'Start Adventure'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {Object.keys(stories).length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-6">📚</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No Stories Available</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            There are no stories in the library yet. Create your first story using the admin panel or import stories from other creators.
          </p>
        </div>
      )}
    </div>
  );
};