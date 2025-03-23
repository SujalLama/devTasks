import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { Checkbox } from "@progress/kendo-react-inputs";
import {
  Task,
  useTaskAndProjectContext,
} from "../../Providers/TaskAndProjectProjectProvider";
import { useToast } from "../../Providers/ToastProvider";
import { TaskAddEdit } from "../TaskAddEdit";
import { Typography } from "@progress/kendo-react-common";
import { ProgressBar } from "@progress/kendo-react-progressbars";

export function RightSidebar() {
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);
  const { tasks, projects, addTask, selectedProject } =
    useTaskAndProjectContext();

  const { showToast } = useToast();

  const addTaskItem = (name: string) => {
    if (!selectedProject) {
      showToast({
        autoHide: true,
        title: "Task Error:",
        message: "Please select project using checkbox for your task",
        type: "error",
      });
      return;
    }

    if (!name) {
      showToast({
        autoHide: true,
        title: "Task Error:",
        message: "Please provide the task name",
        type: "error",
      });
      return;
    }

    addTask({
      id: Date.now(),
      name: name,
      completed: false,
      project: selectedProject,
    });

    showToast({
      autoHide: true,
      title: "Task:",
      message: "Task Added successfully.",
      type: "success",
    });

    setVisibleDialog(false);
  };

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  const selectedTasks = tasks.filter(
    (task) => task.project === selectedProject,
  );

  const totalTasks = selectedTasks.length;
  const completedTasks = selectedTasks.filter((item) => item.completed).length;

  return (
    <aside>
      <div className="page notifications-page">
        <Button
          style={{
            width: "100%",
            position: "sticky",
            top: 10,
            zIndex: 99,
          }}
          onClick={toggleDialog}
        >
          Add Task
        </Button>

        {selectedTasks.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <Typography.p>
              {completedTasks} / {totalTasks} tasks completed
            </Typography.p>
            <ProgressBar
              value={Math.round((completedTasks / totalTasks) * 100)}
            />
          </div>
        )}

        <ul>
          {selectedTasks.map((filteredTask) => {
            return <TaskItem key={filteredTask.id} {...filteredTask} />;
          })}
        </ul>
      </div>

      {visibleDialog && (
        <TaskAddEdit onSave={addTaskItem} onClose={toggleDialog} />
      )}
    </aside>
  );
}

function TaskItem({ name, id, completed }: Task) {
  const { updateTask } = useTaskAndProjectContext();
  return (
    <li style={{ color: completed ? "red" : "" }}>
      <Checkbox
        value={completed}
        onChange={(e) => {
          if (e.target.value) {
            updateTask(id, { completed: true });
          } else {
            updateTask(id, { completed: false });
          }
        }}
      />
      {name}
    </li>
  );
}
