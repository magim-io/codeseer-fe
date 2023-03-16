import React, { useCallback } from "react";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "reactflow";

import {
  CustomNode,
  FloatingConnectionLine,
  FloatingEdge,
} from "../../components";
import { ChevronRight, ClipboardText } from "../../Icons";

import ActionBar from "./ActionBar/ActionBar";
import FloatingActionBar from "./FloatingActionBar/FloatingActionBar";
import { initialEdges, initialNodes } from "./initial_setup";
import data from "./output.json";

import "./style.scss";

const padding = 10;
const gap = 10;
const iconSize = 24;

const nodeTypes = {
  selectorNode: CustomNode,
};
const edgeTypes = {
  floating: FloatingEdge,
};

function getChildrenBiggestSize(node: Node) {
  let longestString = "";
  let shortestString = "";
  node.data.children.forEach((child: any) => {
    let string = `${child.name}/`;
    if (child.name.includes(".")) {
      string = child.name.split("/")[child.name.split("/").length - 1];
    }
    if (longestString.length <= string.length) {
      longestString = string;
    } else {
      shortestString = string;
    }
  });

  // Get the biggest Size
  const long = document.createElement("span");
  long.style.visibility = "hidden";
  long.style.fontSize = "16px";
  long.style.padding = "10px";
  long.innerHTML = longestString;
  document.body.appendChild(long);

  // Get the width of the long element and set it as the width of the div
  const longWidth = long.offsetWidth;
  const longHeight = long.offsetHeight;
  // Remove the long element
  document.body.removeChild(long);

  // Get the biggest Size
  const short = document.createElement("span");
  short.style.visibility = "hidden";
  short.style.fontSize = "16px";
  short.style.padding = "10px";
  short.innerHTML = shortestString;
  document.body.appendChild(short);

  // Get the width of the short element and set it as the width of the div
  const shortWidth = short.offsetWidth;
  const shortHeight = short.offsetHeight;
  // Remove the short element
  document.body.removeChild(short);

  const dummyWidth = (longWidth + shortWidth) / 2 + iconSize;
  const dummyHeight = (longHeight + shortHeight) / 2;
  return { dummyWidth, dummyHeight };
}

function Codebase() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewEdges = (selectedNode: Node, newNodes: Node[]) => {
    console.log(selectedNode, newNodes);

    // const returnEdges: any[] = childrenNodes
    //   .filter((item: any) => {
    //     const connects = data.edges.filter((connect) =>
    //       connect.from.includes(item.id)
    //     );

    //     return item.id.includes(".") && connects.length > 0;
    //   })
    //   .map((item: any) => {
    //     const connects = data.edges.filter((connect) =>
    //       connect.from.includes(item.id)
    //     );

    //     return connects.map((connect) => ({
    //       id: `${item.id}-${connect.to}`,
    //       source: item.id,
    //       target: childrenNodes.find((c: any) => connect.to.includes(c.id)),
    //       markerEnd: {
    //         type: MarkerType.ArrowClosed,
    //       },
    //     }));
    //   });

    // setEdges(returnEdges);
  };

  const createNewNodes = (parentNode: Node) => {
    const { dummyWidth } = getChildrenBiggestSize(parentNode);
    const numOfRow = Math.ceil(Math.sqrt(parentNode.data.children.length));
    const numOfCol = Math.ceil(Math.sqrt(parentNode.data.children.length));
    const newNodes = parentNode.data.children.map((cN: any, index: number) => {
      const nodeData = {
        id: cN.name,
        position: {
          x: (index % numOfRow) * (dummyWidth + gap) + padding,
          y:
            parentNode.height!! +
            gap +
            Math.floor(index / numOfCol) * (parentNode.height!! + gap),
        },
        type: "selectorNode",
        data: !cN.name.includes(".")
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
          border: "1px solid black",
          borderRadius: "8px",
        },
        parentNode: parentNode.id,

        extent: "parent",
      };

      return nodeData;
    });
    createNewEdges(parentNode, newNodes);
    setNodes((prev) => prev.concat(newNodes));
  };

  const rearangedNode = (
    selectedNode: Node,
    growingHeight: any,
    growingWidth: any
  ) => {
    // const isSameYNodeExpand: Node[] = nodes.filter(
    //   (nds: Node) =>
    //     nds.position.y === selectedNode.position.y &&
    //     nds.data.isExpand !== undefined &&
    //     nds.data.isExpand === true
    // );

    // const isSameXNodeExpand: Node[] = nodes.filter(
    //   (nds: Node) =>
    //     nds.position.x === selectedNode.position.x &&
    //     nds.data.isExpand !== undefined &&
    //     nds.data.isExpand === true
    // );

    // console.log(isSameYNodeExpand, isSameXNodeExpand);

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
          if (isSameParent) {
            if (nds.position.y > selectedNode.position.y) {
              return {
                ...nds,
                position: {
                  x: nds.position.x,
                  y: nds.position.y + growingHeight,
                },
              };
            }
            if (nds.position.y === selectedNode.position.y) {
              if (nds.position.x > selectedNode.position.x) {
                return {
                  ...nds,
                  position: {
                    x: nds.position.x + growingWidth,
                    y: nds.position.y,
                  },
                };
              }
              return nds;
            }
            return nds;
          }
          return nds;
        }
        return nds;
      })
    );

    rearangedNode(
      nodes.find((n) => n.id === selectedNode.parentNode)!!,
      growingHeight,
      growingWidth
    );
  };

  const resizeParentNode = (
    node: Node,
    parentNode: Node,
    expandSize: any,
    expandHeight: any
  ) => {
    // const realWidth = expandSize - (parentNode.width!! - node.position.x) + 10;

    let rightMost = node;

    const sameLevelNodes = nodes.filter(
      (n: Node) => n.data.depth === node.data.depth
    );

    sameLevelNodes.forEach((item) => {
      if (item.position.y === node.position.y) {
        if (item.position.x > rightMost.position.x) {
          rightMost = item;
        }
      }
    });
    const realWidth = -(
      parentNode.width!! -
      rightMost.position.x -
      expandSize -
      rightMost.width!! -
      10
    );

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
        }
        return nds;
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

  const expandNode = (node: Node) => {
    const { dummyWidth } = getChildrenBiggestSize(node);
    const numElOnRow = Math.ceil(Math.sqrt(node.data.children.length));
    const numElOnCol = Math.ceil(Math.sqrt(node.data.children.length));
    console.log(numElOnRow, numElOnCol);
    // const growthHeight =
    //   (node.data.children.length + 1) * node.height!! +
    //   node.data.children.length * gap +
    //   padding;
    const growthHeight =
      node.height!! + (node.height!! + gap) * numElOnCol + padding;
    const growthWidth =
      (gap + dummyWidth) * numElOnRow + padding * 3 + iconSize;
    const parentNode = nodes.find((n: Node) => n.id === node.parentNode)!!;

    if (parentNode) {
      resizeParentNode(
        node,
        parentNode,
        growthWidth - node.width!!,
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
        }
        return nds;
      })
    );

    rearangedNode(
      node,
      growthHeight - node.height!!,
      growthWidth - node.width!!
    );
  };

  const onNodeClick = (event: any, node: Node) => {
    if (node.data.label.includes(".")) {
      return;
    }

    if (!node.data.isExpand) {
      expandNode(node);
      createNewNodes(node);
    }
  };

  return (
    <div className="w-full min-h-screen flex ">
      <ActionBar />
      <div className="flex-grow w-full h-full flex flex-col relative">
        <div className="px-7 py-6 flex justify-between bg-[#F7F8FA] border-b-2 border-[#E3E3E3] drop-shadow-md">
          <div className="flex gap-3 text-lg font-semibold">
            <span className="text-md_blue">FPLMS</span>
            <ChevronRight className="text-md_blue" />
            <span className="text-primary_gray">Battle Maids&apos; Domain</span>
            <ChevronRight className="text-md_blue" />
            <span className="text-primary_blue">
              Kennguyen2000/facebook-instagram-mobile
            </span>
          </div>
          <ClipboardText className="text-dark_blue_2 cursor-pointer" />
        </div>
        <div className="flex grow w-full h-screen relative">
          <FloatingActionBar />
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
    </div>
  );
}

export default Codebase;
