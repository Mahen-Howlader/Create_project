import { model, Schema, Types } from "mongoose";
import { IBorrow } from "./borrow.service";


const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book reference is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Borrow quantity is required"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: (value: number) => Number.isInteger(value),
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: String,
        required: [true, "Due date is required"],
    },


}, {
    timestamps : true,
    versionKey : false
});

const Borrow = model<IBorrow>("Borrow", borrowSchema);
export default Borrow;