import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async (response) => {
    await sleep(1000);
    return response;
})

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T>(response: AxiosResponse<T>): T => response.data

const requests = {
    get: async <T>(url: string): Promise<T> => {
        const response = await axios.get<T>(url);
        return responseBody(response);
    },
    post: async <T, TParam extends object>(url: string, body: TParam): Promise<T> => {
        const response = await axios.post<T>(url, body);
        return responseBody(response);
    },
    put: async <T, TParam extends object>(url: string, body: TParam): Promise<T> => {
        const response = await axios.put<T>(url, body);
        return responseBody(response);
    },
    delete: async <T>(url: string): Promise<T> => {
        const response = await axios.delete<T>(url);
        return responseBody(response);
    },
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities').then(arr => arr.map(activity => ({ ...activity, date: activity.date.split("T")[0] }))),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void, Activity>('/activities', activity),
    edit: (activity: Activity) => requests.put<void, Activity>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<Activity>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent