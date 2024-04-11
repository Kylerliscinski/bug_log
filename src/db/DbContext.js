import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BugsSchema } from "../models/Bug.js";
import { NotesSchema } from "../models/Note.js";
import { TrackedBugsSchema } from "../models/TrackedBug.js";

class DbContext {
  // Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bugs = mongoose.model('Bug', BugsSchema)

  Notes = mongoose.model('Note', NotesSchema)

  TrackedBugs = mongoose.model('TrackedBug', TrackedBugsSchema)
}

export const dbContext = new DbContext()
