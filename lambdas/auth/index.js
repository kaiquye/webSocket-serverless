export const handler = async (event, context, callback) => {
  var headers = event.headers;

  // tenhoq ue criar uma function para validar o token com uma chave publica
  if (headers.authorization === "secret-token") {
    callback(null, generateAllow("me", event.methodArn));
  } else {
    callback("Unauthorized");
  }
};

var generatePolicy = (principalId, effect, resource) => {
  var authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

var generateAllow = (principalId, resource) => {
  return generatePolicy(principalId, "Allow", resource);
};
