import data from './output.json';
import { Node } from 'reactflow';

interface IObject {
  name?: any;
  children?: any;
  data?: any;
}

const temp = data.nodes.map((n) => {
  return n.source.split('/');
});
const result: any[] = [];
const final = { result };

temp.forEach((a: any) => {
  a.reduce((r: any, name: any, i: any, arr: any) => {
    if (!r[name]) {
      const obj: IObject = { name: name };
      r[name] = { result: [] };
      if (arr[i + 1] && name != null) {
        obj.children = r[name].result;
      }

      if (name.includes('.')) {
        const otherChild = data.edges.filter((e) => e.from === arr.join('/'));

        obj.children = otherChild.map((oC) => ({
          name: oC.to,
          data: data.nodes.find((n) => n.source === oC.to),
        }));
      }

      if (obj.name.includes('.')) {
        obj.name = arr.join('/');
        obj.data = data.nodes.find(
          (item) =>
            item.source.split('/')[item.source.split('/').length - 1] ===
            obj.name
        );
      }

      r.result.push(obj);
    }

    return r[name];
  }, final);
});
let arr = new Map();
const convertToReactFlowFormat = (treeNode: any) => {
  if (treeNode.name.includes('.')) {
    if (treeNode.children && treeNode.children.length > 0) {
      arr.set(treeNode.name, {
        id: treeNode.name,
        data: {
          label: treeNode.name,
          ...data.nodes.find((item) => item.source === treeNode.name),
        },
        children: treeNode.children,
        position: {
          x: 0,
          y: 0,
        },
        type: 'selectorNode',
      });
    } else {
      arr.set(treeNode.name, {
        id: treeNode.name,
        data: {
          label: treeNode.name,
          ...data.nodes.find((item) => item.source === treeNode.name),
        },
        position: {
          x: 0,
          y: 0,
        },
        type: 'selectorNode',
      });
    }
  } else {
    arr.set(treeNode.name, {
      id: treeNode.name,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        label: treeNode.name,
      },
      type: 'selectorNode',
      children: treeNode.children,
      className: `reactflow_node_${treeNode.name}`,
    });
    treeNode.children.forEach((node: any) => {
      convertToReactFlowFormat(node);
    });
  }
};
convertToReactFlowFormat(result[0]);

export const initialNodes: Node[] = result.map((item, index) => ({
  id: item.name,
  position: {
    x: 0,
    y: index * 20,
  },
  type: 'selectorNode',
  data: !item.name.includes('.')
    ? {
        label: item.name,
        children: item.children ? item.children : undefined,
        depth: 0,
      }
    : {
        label: item.name,
        children: item.children ? item.children : undefined,
        ...data.nodes.find((n: any) => n.id === item.name),
        depth: 0,
      },
  style: {
    border: '1px solid black',
    borderRadius: '8px',
  },
}));

export const initialEdges = result
  .filter(
    (item, index) => data.edges.find((e) => e.from === item.name) !== undefined
  )
  .map((item) => ({
    id: `${item.from}-${item.to}`,
    source: item.from,
    target: item.to,
  }));
