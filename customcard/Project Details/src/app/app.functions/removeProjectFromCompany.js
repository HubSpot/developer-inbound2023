const axios = require('axios');

exports.main = async (context = {}, sendResponse) => {
  // The internal ID of the custom object
  const customObjectId = "p_construction_projects";

  // get the property data from the parameters
  const {companyId} = context.parameters;
  const {projectRecordId} = context.parameters;

  // get the private app access token from the function context
  const PRIVATE_APP_TOKEN = context.secrets.PRIVATE_APP_ACCESS_TOKEN;

  //build the JSON body for the API request
  const requestBody = buildCustomObjectJson();

  Promise.all([
    updateCustomObject(requestBody, customObjectId, projectRecordId, PRIVATE_APP_TOKEN),
    removeProjectAssociations(customObjectId, projectRecordId, companyId, PRIVATE_APP_TOKEN)
  ]).then( (responseArray) => {
    sendResponse(responseArray.map((item)=>{return item.data;}));
  });
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

// Builds the JSON for the API call, since we're removing it
// it's always going to be "needs assigned" after this
const buildCustomObjectJson = () => {
  return {
    "properties": {
      "status": "initiate"
    }
  }
}

// Removes associations between the company and construction project record
const removeProjectAssociations = (customObjectId, projectRecordId, companyId, token) => {
  return axios.delete(
    `https://api.hubapi.com/crm/v4/objects/${customObjectId}/${projectRecordId}/associations/company/${companyId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    }
  ); 
}
