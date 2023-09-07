const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  // The internal ID of the custom object
  const customObjectId = "p_construction_projects";

  // get the property data from the parameters
  const {project_status} = context.parameters;
  const {projectRecordId} = context.parameters;

  // get the private app access token from the function context
  const PRIVATE_APP_TOKEN = context.secrets.PRIVATE_APP_ACCESS_TOKEN;

  //build the JSON body for the API request
  const requestBody = buildCustomObjectJson(project_status);

  try {
    // Create a new object associated with the company being viewed in the card
    const { data } = await updateCustomObject(
      requestBody,
      customObjectId,
      projectRecordId,
      PRIVATE_APP_TOKEN
      );
    
    // send the request body
    sendResponse(data)
  } catch (e) {
    sendResponse(e);
  }
};

const updateCustomObject = (requestBody, customObjectId, recordId, token) => {
  return axios.patch(
    `https://api.hubapi.com/crm/v3/objects/${customObjectId}/${recordId}`,
    JSON.stringify(requestBody),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// Builds the JSON for the API call
const buildCustomObjectJson = (project_status) => {
  return {
    "properties": {
      "status": project_status
    }
  }
}
