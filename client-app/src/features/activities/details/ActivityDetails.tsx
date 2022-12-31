import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react"
import { Loading } from "../../../app/layout/Loading";
import { useStore } from "../../../app/stores/Store"
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export const ActivityDetails = observer(() => {
  const {id} = useParams();
  const navigateTo = useNavigate()
  const {activityStore} = useStore();
  const {selectedActivity, loadActivity, loadingInitial} = activityStore;

  useEffect(() => {
    if(id) {
      loadActivity(id);
    } else {
      navigateTo('/activities')
    }
  }, [loadActivity, id, navigateTo])
  
  if(!selectedActivity || loadingInitial) {
    return <Loading />
  }

  if(selectedActivity) {
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailsHeader activity={selectedActivity} />
          <ActivityDetailsInfo activity={selectedActivity} />
          <ActivityDetailsChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailsSidebar />
        </Grid.Column>
      </Grid>
    )
  }
  return null;
});
