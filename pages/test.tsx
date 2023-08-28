import React from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import {arrayMoveImmutable} from "array-move";

export default function Test() {
  const [items, setItems] = React.useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I"
  ]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array) => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  return (
    <SortableList
      onSortEnd={onSortEnd}
      className="list"
      draggedItemClassName="dragged"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "10px",
        width: 300,
      }}
    >
      {items.map((item) => (
        <SortableItem key={item}>
          <div className="item" style={{
            width: 100,
            height: 100,
            backgroundColor: 'green',
          }}>{item}</div>
        </SortableItem>
      ))}
    </SortableList>
  );
}
