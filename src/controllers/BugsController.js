import { Auth0Provider } from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService.js";
import BaseController from "../utils/BaseController.js";
import { notesService } from "../services/NotesService.js";



export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .get('', this.getBugs)
      .get('/:bugId', this.getBugById)
      .get('/:bugId/notes', this.getNotesByBugId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createBug)
      .put('/:bugId', this.updateBug)
      .delete('/:bugId', this.deleteBug)
  }

  async getBugs(request, response, next) {
    try {
      const bugs = await bugsService.getBugs()
      response.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBugById(request, response, next) {
    try {
      const bugId = request.params.bugId
      const getById = await bugsService.GetBugById(bugId)
      response.send(getById)
    } catch (error) {
      next(error)
    }
  }

  //call to notes
  async getNotesByBugId(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugNotes = await notesService.getNotesByBugId(bugId)
      response.send(bugNotes)
    } catch (error) {
      next(error)
    }
  }

  async createBug(request, response, next) {
    try {
      const bugData = request.body
      bugData.creatorId = request.userInfo.id
      const bug = await bugsService.createBug(bugData)
      response.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async updateBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const bugData = request.body
      const userInfo = request.userInfo
      bugData.creatorId = userInfo.id

      const updatedBug = await bugsService.updateBug(bugId, bugData)
      response.send(updatedBug)
    } catch (error) {
      next(error)
    }
  }

  async deleteBug(request, response, next) {
    try {
      const bugId = request.params.bugId
      const userId = request.userInfo.id
      const deletedBug = await bugsService.deleteBug(bugId, userId)
      response.send(deletedBug)
    } catch (error) {
      next(error)
    }
  }
}