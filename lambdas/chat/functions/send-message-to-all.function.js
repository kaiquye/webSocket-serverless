import { SendMessageToOne } from "./send-message-to-one.function.js";

export async function SendMessageToAll(membersList, message) {
  try {
    const list = membersList.map((id) => SendMessageToOne(id, message));
    await Promise.all(list);
  } catch (err) {
    console.error(err);
  }
}
