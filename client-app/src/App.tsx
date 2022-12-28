import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Header } from "semantic-ui-react";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import List from "semantic-ui-react/dist/commonjs/elements/List";

function App() {
  const [activities, setActivities] = useState<any[]>([]);

  const fetchActivities = useCallback(async (): Promise<any> => {
    try {
      const response = await axios.get("http://localhost:5000/api/activities");
      setActivities(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <div className="App">
      <Grid centered columns={1}>
        <Grid.Column>
          <Header as="h2" icon="users" content="Reactivities" />
          <List>
            {activities &&
              activities.map((activity) => (
                <List.Item key={activity.id}>{activity.title}</List.Item>
              ))}
          </List>
          <Button content="test" />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
