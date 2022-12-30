import { makeObservable, observable } from "mobx"

export class ActivityStore {
    title = 'Hello'

    constructor() {
        makeObservable(this, {
            title: observable
        })
    }
}