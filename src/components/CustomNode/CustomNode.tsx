import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

function CustomNode(props: NodeProps) {
  const { data, isConnectable } = props;
  return (
    <div className='w-fit  relative  text-black px-[10px] '>
      {/* <NodeResizer minWidth={160} minHeight={30} /> */}
      <Handle
        type='target'
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params: any) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className='flex flex-col w-fit h-fit'>
        <div className='label flex items-center justify-center text-black'>
          {data.label.includes('.')
            ? data.label.split('/')[data.label.split('/').length - 1]
            : `${data.label}/`}
        </div>
      </div>
      <Handle
        type='source'
        position={Position.Right}
        style={{ background: '#555' }}
        onConnect={(params: any) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default CustomNode;
