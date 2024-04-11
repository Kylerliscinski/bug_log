import { Auth0Provider } from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService.js";
import BaseController from "../utils/BaseController.js";



export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.postNote)
      .delete('/:noteId', this.deleteNote)
  }


  async postNote(request, response, next) {
    try {
      const noteData = request.body
      noteData.creatorId = request.userInfo.id
      const note = await notesService.postNote(noteData)
      response.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(request, response, next) {
    try {
      const noteId = request.params.noteId
      const userId = request.userInfo.id
      const noteToDelete = await notesService.deleteNote(noteId, userId)
      response.send(noteToDelete)
    } catch (error) {
      next(error)
    }
  }


}