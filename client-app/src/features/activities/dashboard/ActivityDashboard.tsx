import { useRef } from "react";
import { Grid, Ref, Sticky } from "semantic-ui-react";
import { useWindowSize } from "../../../app/hooks/UseWindowSize";
import { Activity } from "../../../app/models/activity";
import { ActivityDetails } from "../details/ActivityDetails";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

interface ActivityDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  editMode: boolean;
  openEditMode: (id?: string) => void;
  closeEditMode: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean
}

export const ActivityDashboard = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectedActivity,
  editMode,
  openEditMode,
  closeEditMode,
  createOrEdit,
  deleteActivity,
  submitting
}: ActivityDashboardProps) => {
  const gridRef = useRef<HTMLElement>(null);
  const { width } = useWindowSize()

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
            <ActivityList
              activities={activities}
              selectActivity={selectActivity}
              deleteActivity={deleteActivity}
              submitting={submitting}
            />
          </Grid.Column>
          <Ref innerRef={gridRef}>
          <Grid.Column width="6">
            <Sticky active={checkIfCanAttach()} context={gridRef} offset={75}>
              {selectedActivity && !editMode && (
                <ActivityDetails
                  activity={selectedActivity}
                  cancelSelectedActivity={cancelSelectedActivity}
                  openEditForm={openEditMode}
                />
              )}
              {editMode && (
                <ActivityForm
                  closeEditForm={closeEditMode}
                  selectedActivity={selectedActivity}
                  createOrEdit={createOrEdit}
                  submitting={submitting}
                />
              )}
            </Sticky>
          </Grid.Column>
          </Ref>
        </Grid>
   
    );
  }

  return null;
};
