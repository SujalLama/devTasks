import { Fragment, useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import {
  Project,
  useTaskAndProjectContext,
} from "../../Providers/TaskAndProjectProjectProvider";
import { Input } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { Dialog } from "@progress/kendo-react-dialogs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { useToast } from "../../Providers/ToastProvider";

export function ProjectAddEdit({
  id,
  name,
  category,
  onSave,
  onClose,
}: {
  id?: number;
  name?: string;
  category?: string;
  onSave: (name: string, project: string) => void;
  onClose: () => void;
}) {
  const [newProject, setNewProject] = useState<Project>({
    id: id ?? 0,
    category: category ?? "",
    name: name ?? "",
  });

  const { projectCategories, addProjectCategory } = useTaskAndProjectContext();

  const [newCategory, setNewCategory] = useState("");
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  const buttonName = name && category ? "Update" : "Add";
  const { showToast } = useToast();

  return (
    <Fragment>
      {visibleDialog && (
        <Dialog
          title={"Create Project Category"}
          onClose={toggleDialog}
          closeIcon={true}
        >
          <Input
            placeholder="Category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value ?? "")}
            style={{ marginBottom: 10, width: "100%" }}
          />
          <Button
            themeColor="primary"
            onClick={() => {
              if (!newCategory) {
                showToast({
                  autoHide: true,
                  title: "Category Error:",
                  message: `Failed to Add Category`,
                  type: "error",
                });
                return;
              }

              addProjectCategory(newCategory);
              toggleDialog();
            }}
            style={{ marginBottom: 20 }}
          >
            Add Category
          </Button>
        </Dialog>
      )}

      {/* Project create dailog box */}
      <Dialog title={"Create a Project"} onClose={onClose} closeIcon={true}>
        <div>
          <Label>Project Name</Label>
          <Input
            value={newProject?.name ?? ""}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            style={{ marginBottom: 10, width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "30px", marginTop: "10px" }}>
          <Label>Add / Select Project Category</Label>
          <DropDownList
            data={projectCategories}
            value={newProject?.category ?? ""}
            onChange={(e) => {
              setNewProject({ ...newProject, category: e.target.value });
            }}
          />

          <Button
            style={{ width: "100%", marginTop: "10px" }}
            onClick={toggleDialog}
          >
            Add New Category
          </Button>
        </div>

        <Button
          themeColor="primary"
          onClick={() => {
            if (!newProject?.name || !newProject?.category) {
              showToast({
                autoHide: true,
                title: "Project Error:",
                message: `Failed to ${buttonName} Project`,
                type: "error",
              });
              return;
            }
            onSave(newProject.name, newProject.category);
          }}
          style={{ marginBottom: 20 }}
        >
          {buttonName} Project
        </Button>
      </Dialog>
    </Fragment>
  );
}
