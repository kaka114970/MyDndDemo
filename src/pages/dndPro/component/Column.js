import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import ItemList from './ItemList';

const Column = React.memo(function Column({ column, index }) {
  const [isPlanShow, setIsPlanShow] = useState(false)
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h3 className="column-title"
            {...provided.dragHandleProps}
            onClick={() => setIsPlanShow(!isPlanShow)}
          >
            <div style={{ padding: 16 }}>
              {column.title}
              <span style={{ float: 'right' }}>{isPlanShow ? <UpOutlined /> : <DownOutlined />}</span>
            </div>
          </h3>
          {isPlanShow && <ItemList column={column} index={index} />}
        </div>
      )}
    </Draggable>
  );
});

export default Column;
