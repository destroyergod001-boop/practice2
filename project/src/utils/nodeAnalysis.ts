import { Story, StoryNode } from '../types/story';

/**
 * Node Analysis Utilities
 * 
 * This module provides comprehensive analysis of story node structures to identify
 * potential issues and provide health metrics. It helps story creators maintain
 * well-structured, playable narratives.
 * 
 * Analysis includes:
 * - Orphaned nodes (no incoming connections except start)
 * - Dead ends (non-ending nodes with no choices)
 * - Broken connections (choices pointing to non-existent nodes)
 * - Unreachable nodes (nodes that can't be reached from start)
 * - Overall story health metrics
 */

export interface NodeIssue {
  type: 'orphaned' | 'dead_end' | 'broken_connection' | 'no_choices' | 'unreachable';
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface StoryHealthSummary {
  totalNodes: number;
  healthyNodes: number;
  criticalIssues: number;
  warnings: number;
  suggestions: number;
}

/**
 * Analyzes all nodes in a story and returns a map of node IDs to their issues
 */
export const getNodeIssues = (story: Story): Record<string, NodeIssue[]> => {
  const issues: Record<string, NodeIssue[]> = {};
  const nodes = Object.values(story.nodes);
  const nodeIds = Object.keys(story.nodes);
  
  // Build connection map for analysis
  const incomingConnections = buildIncomingConnectionsMap(story);
  const reachableNodes = findReachableNodes(story);
  
  nodes.forEach(node => {
    const nodeIssues: NodeIssue[] = [];
    
    // Check for orphaned nodes (no incoming connections, not start node)
    if (node.id !== story.startNodeId && (incomingConnections[node.id] || 0) === 0) {
      nodeIssues.push({
        type: 'orphaned',
        message: 'This node has no incoming connections and is not the start node',
        severity: 'critical',
      });
    }
    
    // Check for dead ends (non-ending nodes with no choices)
    if (!node.isEnding && node.choices.length === 0) {
      nodeIssues.push({
        type: 'dead_end',
        message: 'Non-ending node has no choices - players will be stuck',
        severity: 'critical',
      });
    }
    
    // Check for broken connections
    node.choices.forEach(choice => {
      if (!nodeIds.includes(choice.targetNodeId)) {
        nodeIssues.push({
          type: 'broken_connection',
          message: `Choice "${choice.text}" points to non-existent node`,
          severity: 'critical',
        });
      }
    });
    
    // Check for unreachable nodes
    if (!reachableNodes.has(node.id)) {
      nodeIssues.push({
        type: 'unreachable',
        message: 'This node cannot be reached from the start node',
        severity: 'warning',
      });
    }
    
    // Check for nodes with only one choice (might want more branching)
    if (!node.isEnding && node.choices.length === 1) {
      nodeIssues.push({
        type: 'no_choices',
        message: 'Consider adding more choices for better branching narrative',
        severity: 'info',
      });
    }
    
    if (nodeIssues.length > 0) {
      issues[node.id] = nodeIssues;
    }
  });
  
  return issues;
};

/**
 * Builds a map of how many incoming connections each node has
 */
const buildIncomingConnectionsMap = (story: Story): Record<string, number> => {
  const connections: Record<string, number> = {};
  
  Object.values(story.nodes).forEach(node => {
    node.choices.forEach(choice => {
      connections[choice.targetNodeId] = (connections[choice.targetNodeId] || 0) + 1;
    });
  });
  
  return connections;
};

/**
 * Finds all nodes reachable from the start node using breadth-first search
 */
const findReachableNodes = (story: Story): Set<string> => {
  const reachable = new Set<string>();
  const queue = [story.startNodeId];
  
  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;
    
    if (reachable.has(currentNodeId)) {
      continue;
    }
    
    reachable.add(currentNodeId);
    const currentNode = story.nodes[currentNodeId];
    
    if (currentNode) {
      currentNode.choices.forEach(choice => {
        if (!reachable.has(choice.targetNodeId)) {
          queue.push(choice.targetNodeId);
        }
      });
    }
  }
  
  return reachable;
};

/**
 * Generates a comprehensive health summary for the story
 */
export const getStoryHealthSummary = (story: Story): StoryHealthSummary => {
  const nodeIssues = getNodeIssues(story);
  const totalNodes = Object.keys(story.nodes).length;
  
  let criticalIssues = 0;
  let warnings = 0;
  let suggestions = 0;
  
  Object.values(nodeIssues).forEach(issues => {
    issues.forEach(issue => {
      switch (issue.severity) {
        case 'critical':
          criticalIssues++;
          break;
        case 'warning':
          warnings++;
          break;
        case 'info':
          suggestions++;
          break;
      }
    });
  });
  
  const healthyNodes = totalNodes - Object.keys(nodeIssues).length;
  
  return {
    totalNodes,
    healthyNodes,
    criticalIssues,
    warnings,
    suggestions,
  };
};

/**
 * Validates if a story is playable (has no critical issues)
 */
export const isStoryPlayable = (story: Story): boolean => {
  const issues = getNodeIssues(story);
  
  return !Object.values(issues).some(nodeIssues =>
    nodeIssues.some(issue => issue.severity === 'critical')
  );
};

/**
 * Gets a list of recommended fixes for story issues
 */
export const getRecommendedFixes = (story: Story): string[] => {
  const issues = getNodeIssues(story);
  const fixes: string[] = [];
  
  Object.entries(issues).forEach(([nodeId, nodeIssues]) => {
    const node = story.nodes[nodeId];
    if (!node) return;
    
    nodeIssues.forEach(issue => {
      switch (issue.type) {
        case 'orphaned':
          fixes.push(`Connect "${node.title}" to other nodes or remove it`);
          break;
        case 'dead_end':
          fixes.push(`Add choices to "${node.title}" or mark it as an ending`);
          break;
        case 'broken_connection':
          fixes.push(`Fix broken connections in "${node.title}"`);
          break;
        case 'unreachable':
          fixes.push(`Create a path to reach "${node.title}" from the start`);
          break;
      }
    });
  });
  
  return fixes;
};