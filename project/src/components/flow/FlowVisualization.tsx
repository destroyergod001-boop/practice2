import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Story } from '../../types/story';
import { StoryNodeComponent } from './StoryNodeComponent';
import { getNodeIssues, NodeIssue } from '../../utils/nodeAnalysis';

/**
 * FlowVisualization Component
 * 
 * This component renders an interactive flowchart visualization of a story's structure
 * using React Flow. It displays story nodes as custom components and shows connections
 * between them based on player choices.
 * 
 * Features:
 * - Visual representation of story flow
 * - Issue detection and highlighting (orphaned nodes, dead ends, etc.)
 * - Interactive node positioning
 * - Minimap for navigation
 * - Zoom and pan controls
 */

interface FlowVisualizationProps {
  story: Story;
  onNodeClick: (nodeId: string) => void;
  onNodeEdit: (nodeId: string) => void;
}

export const FlowVisualization: React.FC<FlowVisualizationProps> = ({
  story,
  onNodeClick,
  onNodeEdit,
}) => {
  // Custom node types for React Flow
  const nodeTypes: NodeTypes = useMemo(
    () => ({
      storyNode: StoryNodeComponent,
    }),
    []
  );

  // Convert story nodes to React Flow nodes with issue detection
  const initialNodes: Node[] = useMemo(() => {
    const storyNodes = Object.values(story.nodes);
    const nodeIssues = getNodeIssues(story);
    
    return storyNodes.map((node, index) => {
      const issues = nodeIssues[node.id] || [];
      
      return {
        id: node.id,
        type: 'storyNode',
        position: { 
          x: (index % 3) * 300, 
          y: Math.floor(index / 3) * 200 
        },
        data: {
          node,
          issues,
          isStartNode: story.startNodeId === node.id,
          onEdit: () => onNodeEdit(node.id),
          onClick: () => onNodeClick(node.id),
        },
      };
    });
  }, [story, onNodeClick, onNodeEdit]);

  // Convert story choices to React Flow edges
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    Object.values(story.nodes).forEach((node) => {
      node.choices.forEach((choice, index) => {
        // Check if target node exists
        const targetExists = story.nodes[choice.targetNodeId];
        
        edges.push({
          id: `${node.id}-${choice.targetNodeId}-${index}`,
          source: node.id,
          target: choice.targetNodeId,
          label: choice.text.length > 30 
            ? `${choice.text.substring(0, 30)}...` 
            : choice.text,
          type: 'smoothstep',
          style: {
            stroke: targetExists ? '#10b981' : '#ef4444',
            strokeWidth: 2,
          },
          labelStyle: {
            fontSize: 12,
            fontWeight: 500,
          },
          labelBgStyle: {
            fill: '#374151',
            fillOpacity: 0.9,
          },
        });
      });
    });
    
    return edges;
  }, [story]);

  // React Flow state management
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle new connections (not used in story context but required by React Flow)
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-96 bg-gray-900 rounded-lg border border-gray-700">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        {/* Controls for zoom, fit view, etc. */}
        <Controls className="bg-gray-800 border-gray-600" />
        
        {/* Minimap for navigation */}
        <MiniMap 
          className="bg-gray-800 border-gray-600"
          nodeColor={(node) => {
            const issues = node.data?.issues || [];
            if (issues.length > 0) return '#ef4444';
            if (node.data?.isStartNode) return '#10b981';
            return '#6b7280';
          }}
        />
        
        {/* Background pattern */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#374151"
        />
      </ReactFlow>
    </div>
  );
};