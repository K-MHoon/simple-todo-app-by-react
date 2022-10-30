import styles from '../css/Todo.module.css';
import { Todo } from '../App';
import React, { useState, useEffect } from 'react';

interface Props {
  readonly todo: Todo;
  readonly onRemove: (id: number) => void;
  readonly onToggle: (id: number) => void;
  readonly onEdit: (id: number, input: string) => void;
}

const TodoItem = ({ todo, onRemove, onToggle, onEdit }: Props) => {
  const { id, text, done } = todo;
  const [showInput, setShowInput] = useState(false);
  const [inputText, setInputText] = useState('');

  const onDoubleClick = () => {
    console.log('onDoubleClick');

    setInputText(text);
    setShowInput(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onChange ' + e.target.value);
    setInputText(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('handleKeyPress Enter inputText : ' + inputText);

      onEdit(id, inputText);

      setShowInput(false);
    }
  };

  // 입력 요소 포커스가 사라지면 실행된다.
  const handleBlur = () => {
    console.log('handleBlur inputText : ' + inputText);

    setShowInput(false);
  };

  const editInput: React.RefObject<HTMLInputElement> = React.createRef();

  // 마운트될 때 편집 입력 요소 설정
  useEffect(() => {
    console.log('useEffect todo = ' + todo);

    if (todo) {
      console.log('todo.text = ' + todo.text);

      setInputText(todo.text);
    }
  }, [todo]);

  // 마운트될 때 편집 입력 요소 포커스 처리
  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus();
    }
  }, [editInput]);

  return (
    <div className={styles.item}>
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      {showInput && (
        <input
          value={inputText}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          ref={editInput}
        />
      )}
      {!showInput && <span onDoubleClick={onDoubleClick}>{text}</span>}
      <button onClick={() => onRemove(id)}>삭제</button>
    </div>
  );
};

export default TodoItem;
