import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class BugsService {
  async getBugs() {
    const bugs = await dbContext.Bugs.find()
    return bugs
  }

  async GetBugById(bugId) {
    const bug = await dbContext.Bugs.findById(bugId)
    if (!bug) throw new Error(`No bug with the ID ${bugId}`)
    await bug.populate('creator')
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bugs.create(bugData)
    await bug.populate('creator')
    return bug

  }
  async updateBug(bugId, bugData) {
    const bugToUpdate = await this.GetBugById(bugId)

    if (bugToUpdate.creatorId != bugData.creatorId) throw new Forbidden(`Cannot update unowned bug`)

    bugToUpdate.title = bugData.title ?? bugToUpdate.title
    bugToUpdate.description = bugData.description ?? bugToUpdate.description
    //bugToUpdate.priority = bugData.priority ?? bugToUpdate.priority
    //bugToUpdate.closed = bugData.closed ?? bugToUpdate.closed

    await bugToUpdate.save()
    return bugToUpdate
  }

  async deleteBug(bugId, userId) {
    const bugToDelete = await this.GetBugById(bugId)

    if (bugToDelete.creatorId != userId) throw new Forbidden(`Cannot delete unowned bug`)

    await bugToDelete.deleteOne()

    return bugToDelete
  }
}
export const bugsService = new BugsService()