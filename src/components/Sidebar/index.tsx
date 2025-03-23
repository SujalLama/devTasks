import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@progress/kendo-react-buttons";
import { Drawer, DrawerSelectEvent } from "@progress/kendo-react-layout";
import { codeSnippetIcon, folderIcon } from "@progress/kendo-svg-icons";
import "./sidebar.css";
import { useTaskAndProjectContext } from "../../Providers/TaskAndProjectProjectProvider";
import { ProjectAddEdit } from "../ProjectAddEdit";

const items = [
  { text: "Tasks", selected: true, route: "/", svgIcon: codeSnippetIcon },
  { separator: true },
  {
    text: "Project Insights",
    selected: false,
    route: "/insights",
    svgIcon: folderIcon,
  },
  { separator: true },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onSelect = (e: DrawerSelectEvent) => {
    navigate(e.itemTarget.props.route);
  };

  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

  const { addProject } = useTaskAndProjectContext();

  const addProjectItem = (name: string, category: string) => {
    if (!name || !category) return;
    addProject({ name, category, id: Date.now() });
    setVisibleDialog(false);
  };

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  return (
    <aside style={{ marginTop: "20px" }}>
      <div
        style={{
          padding: "20px",
          paddingTop: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Button style={{ width: "100%" }} onClick={toggleDialog}>
          Add Project
        </Button>
      </div>
      <Drawer
        expanded
        position={"start"}
        mode={"push"}
        mini={true}
        items={items.map((item) => ({
          ...item,
          selected: item.route === pathname,
        }))}
        onSelect={onSelect}
      />

      {visibleDialog && (
        <ProjectAddEdit onSave={addProjectItem} onClose={toggleDialog} />
      )}
    </aside>
  );
}
