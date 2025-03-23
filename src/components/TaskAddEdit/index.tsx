import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import { Dialog } from "@progress/kendo-react-dialogs";
import { useState } from "react";
import { Task } from "../../Providers/TaskAndProjectProjectProvider";
import { useToast } from "../../Providers/ToastProvider";

export function TaskAddEdit({
  name,
  onClose,
  onSave,
}: {
  name?: string;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const [newTask, setNewTask] = useState<Task>();
  const buttonName = name ? "Update" : "Add";
  const { showToast } = useToast();

  return (
    <Dialog title={"Create tasks"} onClose={onClose} closeIcon={true}>
      <Input
        placeholder="Task name"
        value={newTask?.name ?? ""}
        onChange={(e) => setNewTask({ name: e.target.value ?? "" })}
        style={{ marginBottom: 10, width: "100%" }}
      />
      <Button
        themeColor="primary"
        onClick={() => {
          if (!newTask?.name) {
            showToast({
              autoHide: true,
              title: "Task Error:",
              message: `Failed to ${buttonName} Task`,
              type: "error",
            });
            return;
          }
          onSave(newTask.name);
        }}
        style={{ marginBottom: 20 }}
      >
        {buttonName} Task
      </Button>
    </Dialog>
  );
}
