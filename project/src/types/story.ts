export interface Choice {
  id: string;
  text: string;
  targetNodeId: string;
  condition?: string;
}

export interface StoryNode {
  id: string;
  title: string;
  content: string;
  choices: Choice[];
  isEnding: boolean;
  image?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  startNodeId: string;
  nodes: Record<string, StoryNode>;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GameSave {
  storyId: string;
  currentNodeId: string;
  playerName: string;
  savedAt: string;
  choices: string[];
}

export interface AppState {
  stories: Record<string, Story>;
  saves: GameSave[];
  currentView: 'menu' | 'admin' | 'play' | 'library';
  currentStory?: string;
  currentNode?: string;
}