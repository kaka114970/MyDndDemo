import React, { useLayoutEffect, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import Row from './Row'

const ItemList = React.memo(function ItemList({ column, index }) {
  const listRef = useRef();
  useLayoutEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTo(0);
    }
  }, [index]);

  return (
    <Droppable
      droppableId={column.id}
      mode="virtual"
      renderClone={(provided, snapshot, rubric) => (
        <Item
          provided={provided}
          isDragging={snapshot.isDragging}
          item={column.items[rubric.source.index]}
        />
      )}
    >
      {(provided, snapshot) => {
        const itemCount = snapshot.isUsingPlaceholder
          ? column.items.length + 1
          : column.items.length;

        return (
          <FixedSizeList
            height={itemCount * 80}
            itemCount={itemCount}
            itemSize={80}
            width={216}
            outerRef={provided.innerRef}
            itemData={column.items}
            className="task-list"
            ref={listRef}
          >
            {Row}
          </FixedSizeList>
        );
      }}
    </Droppable>
  );
});

export default ItemList;
