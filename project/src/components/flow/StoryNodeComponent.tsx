import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { AlertTriangle, Play, Square, Edit3 } from 'lucide-react';
import { StoryNode } from '../../types/story';
import { NodeIssue } from '../../utils/nodeAnalysis';

/**
 * StoryNodeComponent
 * 
 * Custom React Flow node component that represents a story node in the flowchart.
 * This component displays:
 * - Node title and basic info
 * - Visual indicators for node type (start, ending, regular)
 * - Issue warnings with appropriate colors
 * - Interactive handles for connections
 * - Edit button for node management
 * 
 * The component uses different colors and icons to indicate:
 * - Green: Start node or healthy node
 * - Red: Node with critical issues
 * - Yellow: Node with warnings
 * - Gray: Regular nodes
 */

interface StoryNodeData {
  node: StoryNode;
  issues: NodeIssue[];
  isStartNode: boolean;
  onEdit: () => void;
  onClick: () => void;
}

export const StoryNodeComponent: React.FC<NodeProps<StoryNodeData>> = ({ data }) => {
  const { node, issues, isStartNode, onEdit, onClick } = data;
  
  // Determine node styling based on issues and type
  const getNodeStyle = () => {
    const hasIssues = issues.length > 0;
    const hasCriticalIssues = issues.some(issue => 
      issue.type === 'orphaned' || issue.type === 'broken_connection'
    );
    
    if (hasCriticalIssues) {
      return {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
        textColor: '#dc2626',
      };
    }
    
    if (hasIssues) {
      return {
        borderColor: '#f59e0b',
        backgroundColor: '#fffbeb',
        textColor: '#d97706',
      };
    }
    
    if (isStartNode) {
      return {
        borderColor: '#10b981',
        backgroundColor: '#f0fdf4',
        textColor: '#059669',
      };
    }
    
    return {
      borderColor: '#6b7280',
      backgroundColor: '#f9fafb',
      textColor: '#374151',
    };
  };

  const style = getNodeStyle();
  
  // Get appropriate icon based on node type and status
  const getNodeIcon = () => {
    if (isStartNode) return <Play className="h-4 w-4" />;
    if (node.isEnding) return <Square className="h-4 w-4" />;
    if (issues.length > 0) return <AlertTriangle className="h-4 w-4" />;
    return null;
  };

  return (
    <div 
      className="px-4 py-3 shadow-lg rounded-lg border-2 min-w-[200px] cursor-pointer hover:shadow-xl transition-shadow"
      style={{ 
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
      }}
      onClick={onClick}
    >
      {/* Input handle for incoming connections */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3"
        style={{ backgroundColor: style.borderColor }}
      />
      
      {/* Node header with title and controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div style={{ color: style.textColor }}>
            {getNodeIcon()}
          </div>
          <h3 
            className="font-semibold text-sm truncate max-w-[120px]"
            style={{ color: style.textColor }}
            title={node.title}
          >
            {node.title}
          </h3>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Edit node"
        >
          <Edit3 className="h-3 w-3 text-gray-600" />
        </button>
      </div>
      
      {/* Node metadata */}
      <div className="text-xs text-gray-600 mb-2">
        <div>Choices: {node.choices.length}</div>
        {isStartNode && <div className="text-green-600 font-medium">START</div>}
        {node.isEnding && <div className="text-blue-600 font-medium">ENDING</div>}
      </div>
      
      {/* Issue indicators */}
      {issues.length > 0 && (
        <div className="space-y-1">
          {issues.slice(0, 2).map((issue, index) => (
            <div 
              key={index}
              className="text-xs px-2 py-1 rounded"
              style={{ 
                backgroundColor: issue.type === 'orphaned' || issue.type === 'broken_connection' 
                  ? '#fee2e2' 
                  : '#fef3c7',
                color: issue.type === 'orphaned' || issue.type === 'broken_connection'
                  ? '#dc2626'
                  : '#d97706'
              }}
            >
              {issue.message}
            </div>
          ))}
          {issues.length > 2 && (
            <div className="text-xs text-gray-500">
              +{issues.length - 2} more issues
            </div>
          )}
        </div>
      )}
      
      {/* Output handle for outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3"
        style={{ backgroundColor: style.borderColor }}
      />
    </div>
  );
};