import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { Story } from '../../types/story';
import { getNodeIssues, getStoryHealthSummary, NodeIssue } from '../../utils/nodeAnalysis';

/**
 * IssuePanel Component
 * 
 * Displays a comprehensive analysis of story health and node issues.
 * This panel shows:
 * - Overall story health summary
 * - Categorized list of issues by severity
 * - Quick navigation to problematic nodes
 * - Actionable recommendations for fixes
 * 
 * Issue types tracked:
 * - Critical: Orphaned nodes, broken connections
 * - Warning: Dead ends, unreachable nodes
 * - Info: Optimization suggestions
 */

interface IssuePanelProps {
  story: Story;
  onNodeSelect: (nodeId: string) => void;
}

export const IssuePanel: React.FC<IssuePanelProps> = ({ story, onNodeSelect }) => {
  const nodeIssues = getNodeIssues(story);
  const healthSummary = getStoryHealthSummary(story);
  
  // Flatten all issues with node context
  const allIssues: Array<NodeIssue & { nodeId: string; nodeTitle: string }> = [];
  
  Object.entries(nodeIssues).forEach(([nodeId, issues]) => {
    const node = story.nodes[nodeId];
    if (node) {
      issues.forEach(issue => {
        allIssues.push({
          ...issue,
          nodeId,
          nodeTitle: node.title,
        });
      });
    }
  });
  
  // Group issues by severity
  const criticalIssues = allIssues.filter(issue => 
    issue.type === 'orphaned' || issue.type === 'broken_connection'
  );
  
  const warningIssues = allIssues.filter(issue => 
    issue.type === 'dead_end' || issue.type === 'no_choices'
  );
  
  const infoIssues = allIssues.filter(issue => 
    !criticalIssues.includes(issue) && !warningIssues.includes(issue)
  );
  
  // Get appropriate icon for issue type
  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'orphaned':
      case 'broken_connection':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'dead_end':
      case 'no_choices':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Story Health Analysis</h3>
        {allIssues.length === 0 && (
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm font-medium">All Good!</span>
          </div>
        )}
      </div>
      
      {/* Health Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white">{healthSummary.totalNodes}</div>
          <div className="text-sm text-gray-300">Total Nodes</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400">{criticalIssues.length}</div>
          <div className="text-sm text-gray-300">Critical Issues</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{warningIssues.length}</div>
          <div className="text-sm text-gray-300">Warnings</div>
        </div>
        
        <div className="bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{healthSummary.healthyNodes}</div>
          <div className="text-sm text-gray-300">Healthy Nodes</div>
        </div>
      </div>
      
      {/* Issue Lists */}
      {allIssues.length > 0 && (
        <div className="space-y-4">
          {/* Critical Issues */}
          {criticalIssues.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-red-400 mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Critical Issues ({criticalIssues.length})</span>
              </h4>
              <div className="space-y-2">
                {criticalIssues.map((issue, index) => (
                  <div 
                    key={index}
                    className="bg-red-900/20 border border-red-700/50 rounded-lg p-3 cursor-pointer hover:bg-red-900/30 transition-colors"
                    onClick={() => onNodeSelect(issue.nodeId)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="text-white font-medium">{issue.nodeTitle}</div>
                        <div className="text-red-300 text-sm">{issue.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Warning Issues */}
          {warningIssues.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-yellow-400 mb-3 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Warnings ({warningIssues.length})</span>
              </h4>
              <div className="space-y-2">
                {warningIssues.map((issue, index) => (
                  <div 
                    key={index}
                    className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 cursor-pointer hover:bg-yellow-900/30 transition-colors"
                    onClick={() => onNodeSelect(issue.nodeId)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="text-white font-medium">{issue.nodeTitle}</div>
                        <div className="text-yellow-300 text-sm">{issue.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Info Issues */}
          {infoIssues.length > 0 && (
            <div>
              <h4 className="text-lg font-medium text-blue-400 mb-3 flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Suggestions ({infoIssues.length})</span>
              </h4>
              <div className="space-y-2">
                {infoIssues.slice(0, 3).map((issue, index) => (
                  <div 
                    key={index}
                    className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-3 cursor-pointer hover:bg-blue-900/30 transition-colors"
                    onClick={() => onNodeSelect(issue.nodeId)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIssueIcon(issue.type)}
                      <div className="flex-1">
                        <div className="text-white font-medium">{issue.nodeTitle}</div>
                        <div className="text-blue-300 text-sm">{issue.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {infoIssues.length > 3 && (
                  <div className="text-center text-gray-400 text-sm">
                    +{infoIssues.length - 3} more suggestions
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* No Issues State */}
      {allIssues.length === 0 && (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-white mb-2">Story Looks Great!</h4>
          <p className="text-gray-300">
            No issues detected. Your story structure is well-connected and ready for players.
          </p>
        </div>
      )}
    </div>
  );
};