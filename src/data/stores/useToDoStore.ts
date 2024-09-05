import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { generateId } from '../helpers';

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

const localStorageUpdate = <T extends ToDoStore>(
  config: StateCreator<T>): StateCreator<T> => (set, get, api) =>
  config((nextState, ...args) => {
    if ('tasks' in nextState) {
      window.localStorage.setItem('tasks', JSON.stringify((nextState as ToDoStore).tasks));
    }
    set(nextState, ...args);
  }, get, api);

const getCurrentState = () => {
    try {
    const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]'))
        return currentState
    } catch (e) {
      window.localStorage.setItem('tasks', '[]');
    }
    return []
}

export const useToDoStore = create<ToDoStore>()(
  devtools(
    localStorageUpdate((set, get) => ({
      tasks: getCurrentState(),
      createTask: (title: string) => {
        const { tasks } = get();
        const newTask: Task = {
          id: generateId(),
          title,
          createdAt: Date.now(),
        };
        set({
          tasks: [newTask, ...tasks],
        });
      },
      updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.map((task) =>
            task.id === id ? { ...task, title } : task
          ),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task) => task.id !== id),
        });
      },
    }))
  )
);
