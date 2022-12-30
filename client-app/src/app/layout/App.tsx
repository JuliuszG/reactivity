import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import "./styles.css";
import { useStore } from "../stores/Store";
import { observer } from "mobx-react-lite";

function App() {
  const {activityStore} = useStore()

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
        />
      </Container>
    </>
  );
}

export default observer(App);
