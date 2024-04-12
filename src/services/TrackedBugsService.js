import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    const newTrackedBug = await dbContext.TrackedBugs.create(trackedBugData)
    await newTrackedBug.populate('bug')
    await newTrackedBug.populate('tracker')
    return newTrackedBug
  }

  async getUsersTrackingBugs(bugId) {
    const trackingUsers = await dbContext.TrackedBugs.find({ bugId: bugId }).populate('tracker')
    return trackingUsers
  }
  async getUserBugs(accountId) {
    const ourBugs = await dbContext.TrackedBugs.find({ accountId: accountId }).populate('bug')
    return ourBugs
  }
  async deleteTrackedBug(bugId, userId) {
    const bugToDelete = await dbContext.TrackedBugs.findById(bugId)

    if (bugToDelete.accountId != userId) throw new Forbidden("You don't have access to delete this bug")

    await bugToDelete.deleteOne()
    return bugToDelete
  }
}

export const trackedBugsService = new TrackedBugsService