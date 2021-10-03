import React from 'react';
import styled from 'styled-components';
import { VscTriangleDown, VscTriangleUp, VscClose } from 'react-icons/vsc';

const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  height: 30px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  margin: 2px;
  &:hover {
    cursor: pointer;
    transform: scale(1.7);
  }
`;

const TodoListItem = ({ todo, onToggle, onRemove }) => {
  const { id, text, isDone } = todo;
  return (
    <TodoItem>
      {text}
      <Buttons>
        <Button onClick={() => onToggle(id)}>
          {isDone ? <VscTriangleUp /> : <VscTriangleDown />}
        </Button>
        <Button onClick={() => onRemove(id)}>
          <VscClose />
        </Button>
      </Buttons>
    </TodoItem>
  );
};

export default TodoListItem;
