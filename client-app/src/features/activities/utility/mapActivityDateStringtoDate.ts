import { Activity } from "../../../app/models/activity";

export const mapActivityDateStringToDate = (data: Activity[]): Activity[] => {
  return data.map((activity) => ({
    ...activity,
    date: activity.date.split("T")[0],
  }));
};
