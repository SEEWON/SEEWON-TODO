import React from 'react';
import { VscTriangleDown, VscTriangleUp, VscClose } from 'react-icons/vsc';

const TodoListItem = ({ todo, onRemove }) => {
  const { id, text, isDone } = todo;
  return (
    <div className="TodoListItem">
      <div>
        <li>{text}</li>
        {isDone ? <VscTriangleUp /> : <VscTriangleDown />}
      </div>
      <div onClick={() => onRemove(id)}>
        <VscClose />
      </div>
    </div>
  );
};

export default TodoListItem;
