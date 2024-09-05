import React from 'react';

import {useToDoStore} from "./data/stores/useToDoStore";
import {InputPlusComponent} from "./views/components/inputPlus/InputPlusComponent";
import {InputTaskComponent} from "./views/components/inputTask/InputTaskComponent";

import styles from './App.module.scss';

const App:React.FC = () => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ])

  return (
      <article className={styles.article}>
        <h1 className={styles.articleTitle}>To Do App</h1>
        <section className={styles.articleSection}>
            <InputPlusComponent
                onAdd = {(title) => {
                    if (title) {
                        createTask(title)
                }}}
            />
        </section>
        <section className={styles.articleSection}>
            {!tasks.length && (
                <p className={styles.articleText}>There is no one task</p>
            )}
            {tasks.map((task) => (
                <InputTaskComponent
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    onDone={removeTask}
                    onEdited={updateTask}
                    onRemoved={removeTask}
                />
            ))}
        </section>
      </article>
  );
}

export {App};
