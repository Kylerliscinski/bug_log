import { Schema } from "mongoose";


export const NotesSchema = new Schema({
  body: { type: String, minLength: 5, maxLength: 500, required: true },
  bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' },
  creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
}, { timestamps: true, toJSON: { virtuals: true } })

NotesSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

NotesSchema.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})