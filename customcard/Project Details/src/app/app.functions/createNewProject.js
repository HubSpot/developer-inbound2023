const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  // The internal ID of the custom object
  const customObjectId = "p_construction_projects";

  // The ID of the association from the custom object to company
  // Dev sandbox = 99
  // UIE DEMO sandbox = 71
  const objectToCompanyAssociationId = "71"

  // get the property data from the parameters
  const {project_name} = context.parameters;
  const {asana_id} = context.parameters;
  const {budget} = context.parameters;
  const {project_status} = context.parameters;
  const {companyId} = context.parameters;

  // get the private app access token from the function context
  const PRIVATE_APP_TOKEN = context.secrets.PRIVATE_APP_ACCESS_TOKEN;

  //build the JSON body for the API request
  const requestBody = buildCustomObjectJson(project_name, asana_id, budget, project_status, companyId, objectToCompanyAssociationId)

  try {
    // Create a new object associated with the company being viewed in the card
    const { data } = await createCustomObject(
      requestBody,
      customObjectId,
      PRIVATE_APP_TOKEN
      );
    
    // send the request body
    sendResponse(data)
  } catch (e) {
    sendResponse(e);
  }
};

const createCustomObject = (requestBody, customObjectIdobjectId, token) => {
  return axios.post(
    `https://api.hubapi.com/crm/v3/objects/${customObjectIdobjectId}`,
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
const buildCustomObjectJson = (project_name, asana_id, budget, project_status, companyId, associationId) => {
  return {
    "properties": {
      "project_name": project_name,
      "asana_id": asana_id,
      "budget": budget,
      "status": project_status
    },
    "associations": [
      {
        "to": {
          "id": companyId
        },
        "types": [
          {
            "associationCategory": "USER_DEFINED",
            "associationTypeId": associationId
          }
        ]
      }
    ]
  }
}
