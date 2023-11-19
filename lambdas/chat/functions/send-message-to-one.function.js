import { client } from "../index.js";

export async function SendMessageToOne(idList, message) {
  try {
    for (const id of idList) {
      await client
      .postToConnection({
        ConnectionId: id,
        Data: message.message
      })
      .promise();
    }
  } catch (err) {
    console.error(err);
  }
}
