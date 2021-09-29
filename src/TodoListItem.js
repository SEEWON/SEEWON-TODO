import React from 'react';

const TodoListItem = ({ todo }) => {
  return (
    <div>
      <input type="checkbox" />
      <li>{todo.text}</li>
    </div>
  );
};

export default TodoListItem;
