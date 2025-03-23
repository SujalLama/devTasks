import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type Task = {
  id: number;
  name: string;
  completed: boolean;
  project: number;
};

export type Project = {
  name: string;
  id: number;
  category: string;
};

export type ProjectCategories = string[];
type TaskAndProjectContextType = {
  tasks: Task[];
  projects: Project[];
  selectedProject: number;
  projectCategories: ProjectCategories;
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  updateTask: (taskId: number, newTask: Partial<Task>) => void;
  addProject: (task: Project) => void;
  deleteProject: (projectId: number) => void;
  updateProject: (projectId: number, newProject: Partial<Project>) => void;
  addProjectCategory: (category: string) => void;
  deleteProjectCategory: (category: string) => void;
  updateProjectCategory: (oldCategory: string, category: string) => void;
  selectProject: (projectId: number) => void;
};

const initialTaskAndProject: TaskAndProjectContextType = {
  tasks: [],
  projects: [],
  projectCategories: [],
  selectedProject: 0,
  addTask: () => {},
  deleteTask: () => {},
  updateTask: () => {},
  addProject: () => {},
  deleteProject: () => {},
  updateProject: () => {},
  addProjectCategory: () => {},
  deleteProjectCategory: () => {},
  updateProjectCategory: () => {},
  selectProject: () => {},
};

const TaskAndProjectContext = createContext(initialTaskAndProject);

export function TaskAndProjectProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(() =>
    JSON.parse(localStorage.getItem("tasks") ?? "[]"),
  );
  const [projects, setProjects] = useState<Project[]>(() =>
    JSON.parse(localStorage.getItem("projects") ?? "[]"),
  );
  const [projectCategories, setProjectCategories] = useState<string[]>(() =>
    JSON.parse(
      localStorage.getItem("projectCategories") ??
        `[
        "uncategorized",
        "favorites",
        ]`,
    ),
  );
  const [selectedProject, setSelectedProject] = useState(0);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("projects", JSON.stringify(projects));
    localStorage.setItem(
      "projectCategories",
      JSON.stringify(projectCategories),
    );
  }, [tasks, projects, projectCategories]);

  const addTask = (task: Task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((item) => item.id !== taskId));
  };

  const updateTask = (taskId: number, newTask: Partial<Task>) => {
    setTasks((prev) => {
      const newData = prev.map((item) => {
        if (item.id === taskId) {
          return { ...item, ...newTask };
        }
        return item;
      });
      return newData;
    });
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const deleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((item) => item.id !== projectId));
  };

  const updateProject = (projectId: number, newProject: Partial<Project>) => {
    setProjects((prev) => {
      const newData = prev.map((item) => {
        if (item.id === projectId) {
          return { ...item, ...newProject };
        }
        return item;
      });
      return newData;
    });
  };

  const addProjectCategory = (category: string) => {
    setProjectCategories((prev) => {
      if (prev.includes(category)) {
        return prev;
      } else {
        return [...prev, category];
      }
    });
  };

  const deleteProjectCategory = (category: string) => {
    setProjectCategories((prev) => {
      if (prev.includes(category)) {
        return prev;
      } else {
        return [...prev, category];
      }
    });
  };

  const updateProjectCategory = (oldCategory: string, category: string) => {
    setProjectCategories((prev) => {
      const categoryIndex = prev.findIndex((item) => item === oldCategory);
      if (categoryIndex > -1) {
        prev[categoryIndex] = category;
        return prev;
      }

      return prev;
    });
  };

  const selectProject = (projectId: number) => {
    setSelectedProject(projectId);
  };

  return (
    <TaskAndProjectContext.Provider
      value={{
        projectCategories,
        projects,
        selectedProject,
        tasks,
        addTask,
        deleteTask,
        updateProjectCategory,
        deleteProjectCategory,
        addProjectCategory,
        updateProject,
        deleteProject,
        addProject,
        updateTask,
        selectProject,
      }}
    >
      {children}
    </TaskAndProjectContext.Provider>
  );
}

export const useTaskAndProjectContext = () => useContext(TaskAndProjectContext);
