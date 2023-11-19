import AWS from "aws-sdk";
import dotenv from "dotenv";
import { ACTIONS, CONSTANTS } from "./@config/constant.config.js";
import { SendMessageToOne } from "./functions/send-message-to-one.function.js";
import { SendMessageToAll } from "./functions/send-message-to-all.function.js";
dotenv.config();

const members = new Map()
const messages =  {}

export const client = new AWS.ApiGatewayManagementApi({
  region: "us-east-2",
  endpoint: CONSTANTS.AWS_API_URL,
});

export const handler = async (event) => {
  let body = {};
  if (event?.body) {
    body = JSON.parse(event.body);
  }

  const action = event?.requestContext?.routeKey;
  const connectionId = event?.requestContext?.connectionId;
  console.log(event);

  switch (action) {
    case ACTIONS.CONNECT:
      await console.info("new connect");
      break;
    case ACTIONS.DISCONNECT:
      members.delete(body?.name);
      await SendMessageToAll(members, {
        message: `${body.name} member left the cha.`,
      });
      break;
    case ACTIONS.SEND_PRIVATE:
      console.log('-> input message',body.message,)
      const idList = members.get(body.name)
      await SendMessageToOne(idList, {
        message: body.message,
      });
      break;
    case ACTIONS.SEND_PUBLIC:
      await SendMessageToAll([...members.values()], {
        message: body.message,
      });
      break;
    case ACTIONS.SET_NAME:
      const roomName = body?.name 
      console.log('room', roomName);

      if(!members.has(roomName)) {
        members.set(roomName, []);
      }

      members.get(roomName).push(connectionId);

      console.log(`members`, members)

      await SendMessageToAll(members.get(roomName), {
        message: `${body.name} joined the chat.`,
      });
      break;
    case ACTIONS.DEFAULT:
      return null;
  }

  const response = {
    statusCode: 200,
  };
  return response;
};
