import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { trackedBugsService } from "../services/TrackedBugsService.js";



export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:bugId', this.deleteTrackedBug)
  }

  async createTrackedBug(request, response, next) {
    try {
      const trackedBugData = request.body
      trackedBugData.trackerId = request.userInfo.id
      const newTrackedBug = await trackedBugsService.createTrackedBug(trackedBugData)
      response.send(newTrackedBug)

    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userId = request.userInfo.id
      const deleteTrackedBug = await trackedBugsService.deleteTrackedBug(bugId, userId)
      response.send(deleteTrackedBug)
    } catch (error) {
      next(error)
    }
  }
}