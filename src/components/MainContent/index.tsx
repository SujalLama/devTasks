import "./main.css";

import { heartIcon } from "@progress/kendo-svg-icons";
import { Button } from "@progress/kendo-react-buttons";
import {
  Card,
  CardActions,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  TabStrip,
  TabStripSelectEventArguments,
  TabStripTab,
} from "@progress/kendo-react-layout";
import { RightSidebar } from "../Sidebar/RightSidebar";
import { Fragment, useState } from "react";
import {
  Project,
  useTaskAndProjectContext,
} from "../../Providers/TaskAndProjectProjectProvider";
import { ProjectAddEdit } from "../ProjectAddEdit";
import { Checkbox } from "@progress/kendo-react-inputs";

export function MainContent() {
  return (
    <section className="home-container">
      <div className="home-container__left">
        <Tabs />
      </div>
      <div className="home-container__right">
        <RightSidebar />
      </div>
    </section>
  );
}

const TabTitle = (props: { title: string }) => {
  return (
    <>
      <span>{props.title}</span>
    </>
  );
};

function Tabs() {
  const [selected, setSelected] = useState<number>(0);
  const { projectCategories, projects } = useTaskAndProjectContext();
  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  return (
    <div className="tab-wrapper">
      <TabStrip
        selected={selected}
        onSelect={handleSelect}
        scrollable={true}
        style={{ maxWidth: "900px", userSelect: "none" }}
      >
        {projectCategories.map((tab, index) => {
          return (
            <TabStripTab title={<TabTitle title={tab} />} key={index}>
              <div className="cards-container">
                {projects
                  .filter((project) => project.category === tab)
                  .map((filteredProject) => {
                    return (
                      <ProjectComponent
                        key={filteredProject.id}
                        {...filteredProject}
                      />
                    );
                  })}
              </div>
            </TabStripTab>
          );
        })}
      </TabStrip>
    </div>
  );
}

function ProjectComponent({ id, category, name }: Project) {
  const [visibleDialog, setVisibleDialog] = useState<boolean>(false);

  const { updateProject, deleteProject, selectedProject, selectProject } =
    useTaskAndProjectContext();

  const editProjectItem = (name: string, category: string) => {
    if (!name || !category) return;
    updateProject(id, { name, category });
    setVisibleDialog(false);
  };

  const toggleDialog = () => {
    setVisibleDialog(!visibleDialog);
  };

  return (
    <Fragment>
      {visibleDialog && (
        <ProjectAddEdit
          id={id}
          name={name}
          category={category}
          onSave={editProjectItem}
          onClose={toggleDialog}
        />
      )}

      <Card
        style={{
          borderColor: `${selectedProject === id ? "green" : ""}`,
          borderWidth: "1px",
        }}
      >
        <CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Checkbox
              value={selectedProject === id}
              onChange={(e) => {
                if (e.target.value) {
                  selectProject(id);
                } else {
                  selectProject(0);
                }
              }}
            />
            <Button
              svgIcon={heartIcon}
              type="button"
              fillMode={"outline"}
              themeColor={category === "favorites" ? "warning" : "base"}
              onClick={() => {
                if (category === "favorites") {
                  updateProject(id, { category: "uncategorized" });
                } else {
                  updateProject(id, { category: "favorites" });
                }
              }}
            />
          </div>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardBody>
          <CardSubtitle>{category}</CardSubtitle>
        </CardBody>
        <CardActions>
          <Button themeColor="primary" onClick={toggleDialog} fillMode="flat">
            Edit
          </Button>

          <Button
            themeColor="secondary"
            onClick={() => deleteProject(id)}
            fillMode="flat"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Fragment>
  );
}
