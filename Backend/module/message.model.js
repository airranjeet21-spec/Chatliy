import mongoose from "mongoose"; 
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String, default: ""
    },
    // --- YE ADD KARO ---
    replyTo: {
      text: { type: String, default: "" },
      img: { type: String, default: "" },
      userName: { type: String, default: "" }
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);