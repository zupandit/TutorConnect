import types from "@eslint/eslintrc/lib/shared/types";
import { Schema } from "mongoose";

const LessonSchema = new Schema(
    {
        tutor:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        student:{
            type: Schema.Types.ObjectId,
            ref : "User",
            required: true
        },
        scheduledTime:{
            type: Date,
            required: true
        },
        status:{
            type: String,
            enum: ["coming up", "attended", "missed", "cancelled"],
            default: "Coming up"
        },
        link:{
            type: String,
            required: true
        },
        // Optional fields for additional information
        notes: {
            type: String,
            trim: true,
        },
        feedback: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt fields
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

// Virtual for 'id'
LessonSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
