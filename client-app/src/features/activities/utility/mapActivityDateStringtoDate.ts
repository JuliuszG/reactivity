import { Activity } from "../../../app/models/activity";

export const mapActivityDateStringToDate = (data: Activity): Activity => {
  data.date = data.date.split("T")[0];
  return data;
};

export const mapActivitiesDateStringsToDates = (
  data: Activity[]
): Activity[] => {
  return data.map((activity) => ({
    ...activity,
    date: activity.date.split("T")[0],
  }));
};
