import { Schema } from "mongoose";



export const TrackedBugsSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' }
}, { timestamps: true, toJSON: { virtuals: true } })

TrackedBugsSchema.virtual('tracker', {
  localField: 'accountId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

TrackedBugsSchema.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})