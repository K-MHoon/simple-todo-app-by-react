import styles from '../css/Todo.module.css';

interface Props {
  readonly onClearAll: () => void;
}

const TodoFooter = ({ onClearAll }: Props) => {
  return (
    <div className={styles.footer}>
      <button onClick={onClearAll}>전체 삭제</button>
    </div>
  );
};

export default TodoFooter;
