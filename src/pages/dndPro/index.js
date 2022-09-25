import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './style.css';
import Column from './component/Column';
import { message } from 'antd';

function reorderList(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const DndPro = () => {
  const [state, setState] = useState({
    "columns": {
      "module1": {
        "id": "module1",
        "title": "模块1",
        "items": [
          {
            "id": "id:1",
            "text": "方案1"
          },
          {
            "id": "id:0",
            "text": "方案2"
          }
        ]
      },
      "module2": {
        "id": "module2",
        "title": "模块2",
        "items": [
          {
            "id": "id:2",
            "text": "方案1"
          },
          {
            "id": "id:3",
            "text": "方案2"
          }
        ]
      },
      "module3": {
        "id": "module3",
        "title": "模块3",
        "items": []
      }
    },
    // 模块数组
    "moduleList": [
      "module1",
      "module2",
      // "module3",
    ]
  });
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.type === 'module') {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const moduleList = reorderList(
        state.moduleList,
        result.source.index,
        result.destination.index,
      );
      setState({
        ...state,
        moduleList,
      });
      return;
    }

    // 模块内切换优先级
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index,
      );

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      setState(newState);
      return;
    }
    message.error('不支持模块间调整方案!')
  }

  return (
    <div className="fatherE">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="dnd-pro">
          <Droppable
            droppableId="all-droppables"
            direction="vertical"
            type="module"
          >
            {(provided) => (
              <div
                // 包裹容器 包裹的是模块元素
                // className="columns"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.moduleList.map((columnId, index) => (
                  <Column
                    key={columnId}
                    column={state.columns[columnId]}
                    index={index}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default DndPro;
