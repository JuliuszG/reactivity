import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { Loading } from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/Store";
import { ActivityFilters } from "./ActivityFilters";
import { ActivityList } from "./ActivityList";

export const ActivityDashboard = observer(() => {
  const {activityStore} = useStore();
  const { activities } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading />;
  }
  
  if (activities.length > 0) {
    return (
        <Grid doubling stackable reversed="mobile vertically">
          <Grid.Column width={10}>
            <ActivityList />
          </Grid.Column>
          <Grid.Column width={6}>
            <ActivityFilters />
          </Grid.Column>
        </Grid>
   
    );
  }

  return null;
});
