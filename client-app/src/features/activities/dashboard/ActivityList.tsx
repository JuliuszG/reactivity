import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Item, Label, Segment, Transition } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";


export const ActivityList = observer(() => {
  const [target, setTarget] = useState("");
  const {activityStore} = useStore();

  function handleActivityDelete(id: string) {
    setTarget(id);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment>
      <Transition.Group as={Item.Group} divided duration={500}>
        {activityStore.activitiesByDate.map((activity) => (
          <Item key={activity.id + activity.title}>
            <Item.Content>
              <Item.Header as={"a"}>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => activityStore.selectActivity(activity.id)}
                />
                <Button
                  floated="right"
                  loading={activityStore.loading && target === activity.id}
                  content="Delete"
                  color="red"
                  onClick={() => handleActivityDelete(activity.id)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Transition.Group>
    </Segment>
  );
});
