import React, { useRef, useState, useCallback } from 'react';
import './style.scss';
import {
  CustomNode,
  FloatingConnectionLine,
  FloatingEdge,
  Navbar,
} from '../../components';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  addEdge,
  MarkerType,
} from 'reactflow';
import { initialEdges, initialNodes } from './initial_setup';
import data from './output.json';

const nodeTypes = {
  selectorNode: CustomNode,
};
const edgeTypes = {
  floating: FloatingEdge,
};

const Codebase = (): JSX.Element => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewNodes = (parentNode: Node) => {
    const padding = 10;
    const gap = 10;
    const newNodes = parentNode.data.children.map((cN: any, index: number) => {
      const nodeData = {
        id: cN.name,
        position: {
          x: parentNode.width!! + 20,
          y: parentNode.height!! * (index + 1) + (index + 1) * gap,
        },
        type: 'selectorNode',
        data: !cN.name.includes('.')
          ? {
              label: cN.name,
              children: cN.children ? cN.children : undefined,
              depth: parentNode.data.depth + 1,
              isExpand: false,
            }
          : {
              label: cN.name,
              ...data.nodes.find((n) => n.source.includes(cN.name)),
              depth: parentNode.data.depth + 1,
            },
        style: {
          border: '1px solid black',
          borderRadius: '8px',
        },
        parentNode: parentNode.id,

        extent: 'parent',
      };

      return nodeData;
    });
    setNodes((prev) => prev.concat(newNodes));
  };

  const createNewEdges = (selectedNode: Node) => {
    // if (edges.length > 0) {
    //   selectedNode.children.forEach((child) => {
    //     const incomingNodes = getIncomers(selectedNode, nodes, edges);
    //     let connectedEdges = getConnectedEdges(
    //       [...incomingNodes, selectedNode],
    //       edges
    //     );
    //     console.log(incomingNodes);
    //     if (child.name.includes('.')) {
    //     } else {
    //     }
    //   });
    // } else {
    const newEdges = new Map();
    selectedNode.data.children.forEach((child: any) => {
      const connections = data.edges.filter((e) => e.from.includes(child.name));
      connections.forEach((e) => {
        newEdges.set(
          `${child.name}-${
            selectedNode.data.children.find((item: any) =>
              e.to.includes(item.name)
            ).name
          }`,
          {
            id: `${child.name}-${e.to}`,
            source: child.name,
            target: selectedNode.data.children.find((item: any) =>
              e.to.includes(item.name)
            ).name,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          }
        );
      });
    });

    setEdges((prev) => prev.concat([...newEdges.values()]));
    // }
  };

  const expandNode = (node: Node) => {
    const padding = 10;
    const gap = 10;
    const { dummyWidth } = getChildrenBiggestSize(node);
    const growthHeight =
      (node.data.children.length + 1) * node.height!! +
      node.data.children.length * gap +
      padding;
    const growthWidth = node.width!! + gap + dummyWidth + padding;
    const parentNode = nodes.find((n: Node) => n.id === node.parentNode)!!;

    if (parentNode) {
      resizeParentNode(
        node,
        parentNode,
        growthWidth,
        growthHeight - node.height!!
      );
    }

    setNodes((prev) =>
      prev.map((nds) => {
        if (nds.id === node.id) {
          return {
            ...nds,
            width: growthWidth,
            height: growthHeight,
            style: {
              ...nds.style,

              width: growthWidth,
              height: growthHeight,
            },

            data: {
              ...nds.data,
              isExpand: true,
            },
          };
        } else {
          return nds;
        }
      })
    );
    rearangedNode(node, growthHeight - node.height!!);
  };

  const rearangedNode = (selectedNode: Node, growingHeight: any) => {
    // setNodes((prev) =>
    //   prev.map((node) => {
    //     if (node.depth === 0) {
    //       return node;
    //     } else {
    //     }
    //   })
    // );

    if (selectedNode.data.depth === 0) {
      return;
    }

    const sameLevelNodes = nodes.filter(
      (n: Node) => n.data.depth === selectedNode.data.depth
    );

    setNodes((prev) =>
      prev.map((nds) => {
        const exactNode = sameLevelNodes.find((n) => n.id === nds.id);
        if (exactNode) {
          const isSameParent = selectedNode.parentNode === nds.parentNode;
          if (isSameParent && nds.position.y > selectedNode.position.y) {
            return {
              ...nds,
              position: {
                x: nds.position.x,
                y: nds.position.y + growingHeight,
              },
            };
          } else {
            return nds;
          }
        } else {
          return nds;
        }
      })
    );

    rearangedNode(
      nodes.find((n) => n.id === selectedNode.parentNode)!!,
      growingHeight
    );
  };

  const resizeParentNode = (
    node: Node,
    parentNode: Node,
    expandSize: any,
    expandHeight: any
  ) => {
    const realWidth = expandSize - (parentNode.width!! - node.position.x) + 10;
    console.log(realWidth);
    setNodes((prev) =>
      prev.map((nds: Node) => {
        if (nds.id === parentNode.id) {
          return {
            ...nds,
            width: realWidth > 0 ? nds.width!! + realWidth : nds.width,
            height: nds.height!! + expandHeight,
            style: {
              ...nds.style,
              width: realWidth > 0 ? nds.width!! + realWidth : nds.width!!,
              height: nds.height!! + expandHeight,
            },
          };
        } else {
          return nds;
        }
      })
    );

    if (parentNode.data.depth === 0) {
      return;
    }
    const grandParent = nodes.find(
      (n: Node) => n.id === parentNode.parentNode
    )!!;

    resizeParentNode(
      parentNode,
      grandParent,
      realWidth + parentNode.width!!,
      expandHeight
    );
  };

  const onNodeClick = (event: any, node: Node) => {
    if (node.data.label.includes('.')) {
      return;
    }

    if (!node.data.isExpand) {
      expandNode(node);
      createNewNodes(node);
      createNewEdges(node);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* **********************************BODY******************************************* */}
      <div className="flex-grow w-full h-screen relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          connectionLineComponent={FloatingConnectionLine}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          onNodeClick={onNodeClick}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </div>
  );
};

function getChildrenBiggestSize(node: Node) {
  let longestString = '';
  node.data.children.forEach((child: any) => {
    let string = child.name + '/';
    if (child.name.includes('.')) {
      string = child.name.split('/')[child.name.split('/').length - 1];
    }
    if (longestString.length <= string.length) {
      longestString = string;
    }
  });

  // Get the biggest Size
  let dummy = document.createElement('span');
  dummy.style.visibility = 'hidden';
  dummy.style.fontSize = '16px';
  dummy.style.padding = '10px';
  dummy.innerHTML = longestString;
  document.body.appendChild(dummy);

  // Get the width of the dummy element and set it as the width of the div
  let dummyWidth = dummy.offsetWidth;
  let dummyHeight = dummy.offsetHeight;
  // Remove the dummy element
  document.body.removeChild(dummy);
  return { dummyWidth, dummyHeight };
}

export default Codebase;
