import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList = observer(() => {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;
  return (
    <>
      <>
        {Object.entries(groupedActivities).map(([group, activities]) => (
          <Fragment key={group}>
            <Header sub color="teal">
              {group}
            </Header>
                {activities.map((activity) => (
                  <ActivityListItem activity={activity} key={activity.id} />
                ))}
          </Fragment>
        ))}
      </>
    </>
  );
});
