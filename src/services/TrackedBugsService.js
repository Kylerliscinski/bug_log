import { dbContext } from "../db/DbContext.js"



class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    const newTrackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await newTrackedBug.populate('bug')
    await newTrackedBug.populate('tracker')
    return newTrackedBug
  }

}

export const trackedBugsService = new TrackedBugsService