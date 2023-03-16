/* eslint-disable no-loop-func */
import React, { useCallback } from "react";
import {
  addEdge,
  Background,
  Controls,
  Edge,
  MarkerType,
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

interface CollisionInfo {
  collided: boolean;
  overlapX: number;
  overlapY: number;
}

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

const getFourCornPos = (node: Node) => {
  const nodeCorners: any = {
    topLeft: { x: node.position.x, y: node.position.y },
    topRight: { x: node.position.x + node.width!, y: node.position.y },
    bottomLeft: { x: node.position.x, y: node.position.y + node.height! },
    bottomRight: {
      x: node.position.x + node.width!,
      y: node.position.y + node.height!,
    },
  };

  return nodeCorners;
};

// eslint-disable-next-line no-unused-vars
function detectRectanglesCollision(rectA: Node, rectB: Node): CollisionInfo {
  // Get the positions of the corners of the two rectangles
  const rectACorners: any = {
    topLeft: { x: rectA.position.x, y: rectA.position.y },
    topRight: { x: rectA.position.x + rectA.width!, y: rectA.position.y },
    bottomLeft: { x: rectA.position.x, y: rectA.position.y + rectA.height! },
    bottomRight: {
      x: rectA.position.x + rectA.width!,
      y: rectA.position.y + rectA.height!,
    },
  };
  const rectBCorners: any = {
    topLeft: { x: rectB.position.x, y: rectB.position.y },
    topRight: { x: rectB.position.x + rectB.width!, y: rectB.position.y },
    bottomLeft: { x: rectB.position.x, y: rectB.position.y + rectB.height! },
    bottomRight: {
      x: rectB.position.x + rectB.width!,
      y: rectB.position.y + rectB.height!,
    },
  };

  // Check if any of the corners of rectA are inside rectB
  // eslint-disable-next-line no-restricted-syntax
  for (const corner in rectACorners) {
    if (
      rectACorners[corner].x >= rectBCorners.topLeft.x &&
      rectACorners[corner].x <= rectBCorners.topRight.x &&
      rectACorners[corner].y >= rectBCorners.topLeft.y &&
      rectACorners[corner].y <= rectBCorners.bottomLeft.y
    ) {
      // Calculate the overlap rectangle
      const overlapX = Math.max(rectA.position.x, rectB.position.x);
      const overlapY = Math.max(rectA.position.y, rectB.position.y);
      const overlapWidth =
        Math.min(
          rectA.position.x + rectA.width!,
          rectB.position.x + rectB.width!
        ) - overlapX;
      const overlapHeight =
        Math.min(
          rectA.position.y + rectA.height!,
          rectB.position.y + rectB.height!
        ) - overlapY;
      // const overlapRect = { x: overlapX, y: overlapY, width: overlapWidth, height: overlapHeight };

      // Move rectB out of the collision area by adding the width and height of the overlap rectangle to its position
      return {
        overlapX: overlapWidth,
        overlapY: overlapHeight,
        collided: true,
      };
    }
  }

  return { overlapX: 0, overlapY: 0, collided: false };
}

function Codebase() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const createNewEdges = (selectedNode: Node, newNodes: Node[]) => {
    // console.log(selectedNode, newNodes);
    const fileNodes = newNodes.filter((n) => n.id.includes("."));
    const allPresentNods = [...nodes, ...newNodes].filter((n) =>
      n.id.includes(".")
    );

    const possibleConnections = data.edges.filter((ed: any) =>
      allPresentNods.find((fN) => ed.from.includes(fN.id))
    );
    console.log("fileNodes: ", fileNodes);
    console.log("Possible Conenctions: ", possibleConnections);
    console.log(edges);

    const currentSourceNodes = nodes.filter((n) => {
      if (n.id.includes(".")) {
        const haveEdge = edges.find(
          (eds) => eds.source === n.id && eds.target === selectedNode.id
        );
        if (haveEdge) {
          return n;
        }
      }
      return undefined;
    });
    const currentEdgesToSelectedNode = edges.filter(
      (eds) => eds.target === selectedNode.id
    );

    const possibleConnectionsToChildNode = currentSourceNodes
      .map((curSrcNode) =>
        data.edges.filter((ed: any) =>
          newNodes.find(
            (fN) =>
              ed.from === curSrcNode.id &&
              (fN.id.includes(".")
                ? ed.to.includes(fN.id)
                : ed.to.split("/").includes(fN.id))
          )
        )
      )
      .flat(1);
    console.log("current edge to folder", currentEdgesToSelectedNode);
    console.log(
      "Possible connect to childnode",
      possibleConnectionsToChildNode
    );

    fileNodes.forEach((fN) => {
      const exactConnections = possibleConnections.filter(
        (pC) => pC.from === fN.id
      );
      newNodes.forEach((nN: Node) => {
        const isFolder = !nN.id.includes(".");

        if (isFolder) {
          exactConnections.forEach((eC) => {
            if (eC.to.split("/").includes(nN.id)) {
              const newEdge = {
                id: `${fN.id}~${eC.to}`,
                source: fN.id,
                target: nN.id,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              };
              if (!edges.find((eds) => eds.id === newEdge.id)) {
                setEdges((prev) => [...prev, newEdge]);
              }
            }
          });
        } else {
          exactConnections.forEach((eC) => {
            if (eC.to === nN.id) {
              const newEdge = {
                id: `${fN.id}~${nN.id}`,
                source: fN.id,
                target: nN.id,
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              };
              if (!edges.find((eds) => eds.id === newEdge.id)) {
                setEdges((prev) => [...prev, newEdge]);
              }
            }
          });
        }
      });
    });

    // remove edges
    if (currentEdgesToSelectedNode && currentEdgesToSelectedNode.length > 0) {
      currentEdgesToSelectedNode.forEach((curEdToNds) => {
        const exactConnections = possibleConnectionsToChildNode.filter(
          (pC) => curEdToNds.id.split("~")[1] === pC.to
        );

        exactConnections.forEach((eC) => {
          const isHaving = edges.find((e) => e.id === `${eC.from}~${eC.to}`);
          console.log(isHaving);
          if (isHaving) {
            setEdges((prev) =>
              prev.map((e) => {
                if (e.id === isHaving.id) {
                  return {
                    ...isHaving,
                    target: isHaving.id.split("~")[1],
                  };
                }
                return e;
              })
            );
          } else {
            const newEdge = {
              id: `${curEdToNds.id}~${eC.to}`,
              source: curEdToNds.id,
              target: eC.to,
              markerEnd: {
                type: MarkerType.ArrowClosed,
              },
            };
            console.log(edges);
            console.log(newEdge);
            console.log(
              "Present edge:",
              edges.find(
                (e) =>
                  e.id === curEdToNds.source && e.target === selectedNode.id
              )
            );

            setEdges((prev) => [...prev, newEdge]);
          }
        });
      });
    }
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
    if (!parentNode.id.includes(".")) {
      createNewEdges(parentNode, newNodes);
    }
    setNodes((prev) => prev.concat(newNodes));
  };

  const rearangedNode = (
    selectedNode: Node,
    growingHeight: any,
    growingWidth: any
  ) => {
    const passingNode = {
      ...selectedNode,
      width: selectedNode.width + growingWidth,
      height: selectedNode.height + growingHeight,
    };

    if (selectedNode.data.depth === 0) {
      return;
    }

    const sameLevelNodes = nodes.filter(
      (n: Node) => n.data.depth === selectedNode.data.depth
    );

    setNodes((prev) =>
      prev.map((nds) => {
        const exactNode = sameLevelNodes.find(
          (n) => n.id === nds.id && n.id !== selectedNode.id
        );
        if (exactNode) {
          const isSameParent = selectedNode.parentNode === nds.parentNode;
          if (isSameParent) {
            const trarverseX = nds.position.x + growingWidth;
            const trarverseY = nds.position.y + growingHeight;

            if (
              nds.position.y > selectedNode.position.y &&
              nds.position.x >= selectedNode.position.x
            ) {
              return {
                ...nds,
                position: {
                  x: nds.position.x,
                  y: trarverseY,
                },
              };
            }
            if (
              nds.position.y === selectedNode.position.y &&
              nds.position.x > selectedNode.position.x
            ) {
              return {
                ...nds,
                position: {
                  x: trarverseX,
                  y: nds.position.y,
                },
              };
            }

            if (
              nds.position.y < selectedNode.position.y &&
              nds.position.x >= selectedNode.position.x
            ) {
              const nodeCorners = getFourCornPos(nds);
              if (nodeCorners.bottomLeft.y >= selectedNode.position.y) {
                return {
                  ...nds,
                  position: {
                    x: trarverseX,
                    y: nds.position.y,
                  },
                };
              }
            }

            if (
              nds.position.y > selectedNode.position.y &&
              nds.position.x < selectedNode.position.x
            ) {
              const nodeCorners = getFourCornPos(passingNode);
              if (
                nodeCorners.bottomLeft.y >= nds.position.y &&
                nodeCorners.bottomLeft.x < nds.position.x + nds.width!!
              ) {
                return {
                  ...nds,
                  position: {
                    x: nds.position.x,
                    y: trarverseY,
                  },
                };
              }
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
    expandWidth: any,
    expandHeight: any
  ) => {
    // const realWidth = expandWidth - (parentNode.width!! - node.position.x) + 10;

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
      expandWidth -
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
    if (grandParent) {
      resizeParentNode(
        parentNode,
        grandParent,
        realWidth + parentNode.width!!,
        expandHeight
      );
    }
  };

  const expandNode = async (node: Node) => {
    const { dummyWidth } = getChildrenBiggestSize(node);
    const numElOnRow = Math.ceil(Math.sqrt(node.data.children.length));
    const numElOnCol = Math.ceil(node.data.children.length / numElOnRow);

    const growthHeight = (node.height!! + gap) * (numElOnCol + 1) + padding;
    const growthWidth =
      (gap + dummyWidth) * numElOnRow + padding * 3 + iconSize;
    const parentNode = nodes.find((n: Node) => n.id === node.parentNode)!!;

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

    await rearangedNode(
      node,
      growthHeight - node.height!!,
      growthWidth - node.width!!
    );

    if (parentNode) {
      resizeParentNode(
        node,
        parentNode,
        growthWidth - node.width!!,
        growthHeight - node.height!!
      );
    }
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
