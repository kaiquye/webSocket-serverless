export const CONSTANTS = {
  AWS_API_URL: process.env.AWS_ENDPOINT_URL,
};

export const ACTIONS = {
  CONNECT: "$connect",
  DISCONNECT: "$disconnect",
  SEND_PRIVATE: "sendPrivate",
  SEND_PUBLIC: "sendPublic",
  SET_NAME: "setName",
  DEFAULT: "$default",
};
