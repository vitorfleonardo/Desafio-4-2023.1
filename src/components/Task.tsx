import styles from "./styles.module.css";

function Task({ handleDelete })
{
  return (
    <div className={styles.boxTodo}>
      <div className={styles.titleTodo}>
        <input placeholder="Titulo da tarefa"></input>
      </div>

      <div className={styles.infoTodo}>
        <div className={styles.deadlineAndSignedTodo}>
          <input placeholder="Responsavel" maxLength={20}></input>
          <input placeholder="Data" maxLength={10}></input>
        </div>

        <div>
          <input placeholder="Descricao" maxLength={80}></input>
        </div>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Task;
