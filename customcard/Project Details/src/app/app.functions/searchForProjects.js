const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  // The internal ID of the custom object
  const customObjectId = "p_construction_projects";

  // get the property data from the parameters
  const {searchString} = context.parameters;
  
  // get the private app access token from the function context
  const PRIVATE_APP_TOKEN = context.secrets.PRIVATE_APP_ACCESS_TOKEN;

  //build the JSON body for the API request
  const requestBody = buildSearchJson(searchString)

  try {
    // Create a new object associated with the contact being viewed in the card
    const { data } = await makeSearchRequest(
      requestBody,
      customObjectId,
      PRIVATE_APP_TOKEN
      );
    // send the request body
    sendResponse(data);
  } catch (e) {
    sendResponse(e);
  }
};

const makeSearchRequest = (requestBody, customObjectId, token) => {
  
  return axios.post(
    `https://api.hubapi.com/crm/v3/objects/${customObjectId}/search`,
    JSON.stringify(requestBody),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Builds the JSON for the API call
const buildSearchJson = (searchString) => {
  return {
    "properties": [ "project_name", "asana_id","budget","project_status" ],
    "filterGroups":[
      {
        "filters":[
          {
            "propertyName":"status",
            "operator":"EQ",
            "value": "Initiate Planning"
          },
          {
            "propertyName":"project_name",
            "operator":"CONTAINS_TOKEN",
            "value": searchString
          }
        ]
      },
      {
        "filters":[
          {
            "propertyName":"project_status",
            "operator":"NOT_HAS_PROPERTY"
          },
          {
            "propertyName":"project_name",
            "operator":"CONTAINS_TOKEN",
            "value": searchString
          }
        ]
      }
    ]
  }
}
