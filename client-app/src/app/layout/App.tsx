import { useCallback, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { ActivityDashboard } from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleFormOpen(id?: string): void {
    id ? handleSelectedActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handleFormClose(): void {
    setEditMode(false);
  }

  function handleSelectedActivity(id: string): void {
    const foundActivity = activities.find((activity) => activity.id === id);
    setSelectedActivity(foundActivity);
  }

  function handleCancelSelectedActivity(): void {
    setSelectedActivity(undefined);
  }

  async function handleCreateOrEditActivity(activity: Activity): Promise<void> {

    const activityDTO = { ...activity }
    if(!activity.id.length) {
      activityDTO.id = uuidv4();
    }
    const request = activity.id.length ? agent.Activities.edit(activityDTO) : agent.Activities.create(activityDTO);

    setSubmitting(true);

    request
    .then(fetchActivities)
    .then(() => {
      setEditMode(false);
      setSubmitting(false);
      setSelectedActivity(activityDTO);
    })
    .catch(err => {
      console.error(err);
      setSubmitting(false);
    })
  }

  function handleDeleteActivity(id: string): void {
    setSubmitting(true)
    agent.Activities.delete(id)
    .then(fetchActivities)
    .then(() => {
      setSubmitting(false);
      if(selectedActivity && selectedActivity.id === id) {
        setSelectedActivity(undefined)
      }
    })
  }

  const fetchActivities = useCallback(async (): Promise<void> => {
    try {
      const data = await agent.Activities.list();
      setActivities(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar openEditForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectedActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          editMode={editMode}
          openEditMode={handleFormOpen}
          closeEditMode={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
