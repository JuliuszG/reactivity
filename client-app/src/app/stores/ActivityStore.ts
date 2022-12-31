import { makeAutoObservable, runInAction } from "mobx";
import { mapActivitiesDateStringsToDates, mapActivityDateStringToDate } from "../../features/activities/utility/mapActivityDateStringtoDate";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuidv4 } from "uuid";

export class ActivityStore {
  activities: Activity[] = [];
  selectedActivity: Activity | undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoadingInitial = (state: boolean): void => {
    this.loadingInitial = state;
  };

  get activitiesByDate() {
    return this.activities.slice().sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  get groupedActivities(): Record<string, Activity[]> {
    return this.activitiesByDate.reduce((activities, activity) => {
      const date = activity.date;
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key: string]: Activity[]})
  }

  private fetchActivities = async (): Promise<void> => {
    const data = await agent.Activities.list();
    const dataWithMappedDates = mapActivitiesDateStringsToDates(data);
    runInAction(() => {
      this.activities = dataWithMappedDates;
    })
  }

  loadActivities = async (): Promise<void> => {
    this.setLoadingInitial(true);
    try {
      await this.fetchActivities();
      this.setLoadingInitial(false);
    } catch (err) {
      console.error(err);
      this.setLoadingInitial(false);
    }
  };

  loadActivity = async (id: string): Promise<Activity | undefined> => {
    this.setLoadingInitial(true);
    let data: Activity;
    try {
      data = await agent.Activities.details(id);
      runInAction(() => {
        const dataWithMappedDates = mapActivityDateStringToDate(data);
        this.selectedActivity = dataWithMappedDates;
      })
    } catch (error) {
      console.error(error);
    }
    runInAction(() => {
      this.setLoadingInitial(false);
    })
    return this.selectedActivity;
  }

  createActivity = async (activity: Activity): Promise<void> => {
    this.loading = true;
    activity.id = uuidv4();
    try {
      await agent.Activities.create(activity);
      runInAction(async () => await this.fetchActivities());
      runInAction(async () => {
        
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
      runInAction(() => this.loading = false)
    }
  }

  editActivity = async (activity: Activity): Promise<void> => {
    this.loading = true;
    try {
      await agent.Activities.edit(activity);
      runInAction(async () => await this.fetchActivities());
      runInAction(async () => {
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      })
    } catch (error) {
      console.error(error);
      runInAction(() => this.loading = false)
    }
  }

  deleteActivity = async (id: string): Promise<void> => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(async () => await this.fetchActivities());
      runInAction(async () => {
        this.loading = false;
        if(this.selectedActivity && this.selectedActivity.id === id) {
          this.selectedActivity = undefined;
        }
      })
    } catch (error) {
      console.error(error);
    }
  }
}
