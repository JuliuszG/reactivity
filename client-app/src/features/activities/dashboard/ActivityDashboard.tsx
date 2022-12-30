import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { Grid, Ref, Sticky } from "semantic-ui-react";
import { useWindowSize } from "../../../app/hooks/UseWindowSize";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/Store";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface ActivityDashboardProps {
  activities: Activity[];
}

export const ActivityDashboard = observer(({
  activities,
}: ActivityDashboardProps) => {
  const gridRef = useRef<HTMLElement>(null);
  const { width } = useWindowSize();
  const {activityStore} = useStore();
  const { editMode } = activityStore;

  function checkIfCanAttach() {
    if(width) {
      return width > 756
    }
    return false
  }
  
  if (activities.length > 0) {
    return (
      
        <Grid doubling stackable reversed="mobile vertically">
          <Grid.Column width="10">
            <ActivityList />
          </Grid.Column>
          <Ref innerRef={gridRef}>
          <Grid.Column width="6">
            <Sticky active={checkIfCanAttach()} context={gridRef} offset={75}>
              {!editMode && (
                <ActivityDetails />
              )}
              {editMode && (
                <ActivityForm />
              )}
            </Sticky>
          </Grid.Column>
          </Ref>
        </Grid>
   
    );
  }

  return null;
});
