import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"


class NotesService {
  async postNote(noteData) {
    const newNote = await dbContext.Notes.create(noteData)
    await newNote.populate('creator')
    return newNote
  }
  async getNotesByBugId(bugId) {
    const notes = await dbContext.Notes.find({ bugId: bugId })
    return notes
  }

  async deleteNote(noteId, userId) {
    const noteToDelete = await dbContext.Notes.findById(noteId)

    if (noteToDelete.creatorId != userId) throw new Forbidden(`Do not own the note ${noteId}`)

    await noteToDelete.deleteOne()
    return noteToDelete
  }
}

export const notesService = new NotesService