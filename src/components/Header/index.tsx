import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";

import "./header.css";
import { Typography } from "@progress/kendo-react-common";

export function Header() {
  return (
    <AppBar themeColor="primary">
      <AppBarSpacer />
      <AppBarSection>
        <Typography.h4>Dev Tasks</Typography.h4>
      </AppBarSection>
      <AppBarSpacer />
    </AppBar>
  );
}
