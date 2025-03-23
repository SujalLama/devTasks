import { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridItemChangeEvent,
} from "@progress/kendo-react-grid";
import "./insights.css";
import { useTaskAndProjectContext } from "../../Providers/TaskAndProjectProjectProvider";

interface ProjectTable {
  ProjectID: number;
  ProjectName: string;
  Category: string;
  TotalTasks: number;
  CompletedTasks: number;
  InCompleteTasks: number;
}

export function Insights() {
  const { projects, tasks } = useTaskAndProjectContext();
  const [data, setData] = useState<Array<ProjectTable>>(
    projects.map((item, index) => {
      return {
        ProjectID: index + 1,
        ProjectName: item.name,
        Category: item.category,
        TotalTasks: tasks.filter((task) => task.project === item.id).length,
        CompletedTasks: tasks
          .filter((task) => task.project === item.id)
          .filter((item) => item.completed).length,
        InCompleteTasks: tasks
          .filter((task) => task.project === item.id)
          .filter((item) => !item.completed).length,
      };
    }),
  );

  const handleItemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.ProjectID === event.dataItem.ProjectID
        ? { ...item, [event.field!]: event.value }
        : item,
    );
    setData(newData);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Grid
        style={{ height: "90%" }}
        data={data}
        dataItemKey="ProjectID"
        autoProcessData={true}
        sortable
        pageable={true}
        defaultSkip={0}
        defaultTake={10}
        onItemChange={handleItemChange}
      >
        <Column
          field="ProjectID"
          title="ID"
          editable={false}
          filterable={false}
          width="75px"
        />
        <Column field="ProjectName" title="Project Name" editor="text" />
        <Column
          field="Category"
          title="Category"
          editable={false}
          width="200px"
        ></Column>
        <Column
          field="TotalTasks"
          title="Total Tasks"
          editor="numeric"
          width="150px"
        />
        <Column
          field="CompletedTasks"
          title="Completed Tasks"
          editor="numeric"
          width="200px"
        />
        <Column
          field="InCompleteTasks"
          title="InComplete Tasks"
          editor="numeric"
          width="200px"
        />
      </Grid>
    </div>
  );
}
