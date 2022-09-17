/* CSS */
import styles from "./App.module.css"

/* React */
import { useState } from "react";

/* Interfaces */
import { ITask } from "./interfaces/Task";

/* Scripts */
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Modal from "./components/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskUpdate, setTaskUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => {
      return task.id !== id;
    }));
  };

  const hideShow = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    hideShow(true);
    setTaskUpdate(task)
  }

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updatedTask: ITask = { id, title, difficulty };

    const updatedItens = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task;
    })

    setTaskList(updatedItens);
    hideShow(false);
  }

  return (
    <div>
      <Modal
        children={<TaskForm
          btnText="Editar Tarefa"
          taskList={taskList}
          task={taskUpdate}
          handleUpdate={updateTask}
        />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
          <TaskForm
            btnText="Criar Tarefa"
            taskList={taskList}
            setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Suas Tarefas</h2>
          <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
