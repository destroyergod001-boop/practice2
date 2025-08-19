import React from 'react';
import { HeroSection } from './homepage/HeroSection';
import { StatsSection } from './homepage/StatsSection';
import { FeaturesSection } from './homepage/FeaturesSection';
import { HowItWorksSection } from './homepage/HowItWorksSection';
import { CallToActionSection } from './homepage/CallToActionSection';

interface HomepageProps {
  storiesCount: number;
  savesCount: number;
  onViewChange: (view: 'menu' | 'admin' | 'play' | 'library') => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  storiesCount,
  savesCount,
  onViewChange,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <HeroSection onViewChange={onViewChange} />

      {/* Stats Section */}
      <StatsSection storiesCount={storiesCount} savesCount={savesCount} />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Call to Action */}
      <CallToActionSection onViewChange={onViewChange} />
    </div>
  );
};