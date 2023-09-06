const fetch = require('node-fetch'); // Used to make API Requests
const asanaTeam = 1205155495859154; //ID of the team.  might need to be workspace in your account
const asanaApiKey = process.env.asana; // Replace 'YOUR_ASANA_API_KEY' with your actual Asana API key
const hubspotBearerToken = process.env.INBOUNDAPP; // The private app token used to authenticate with HubSpot APIs
const customObjectId = '2-16990860';  //The Custom Object ID for the Construction Projects

// Function to get the deal data from HubSpot API
async function getDealData(dealId) {
  const url = `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`;

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${hubspotBearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch deal data: ${data.message}`);
  }

  return data;
}

// Function to create an Asana project
async function createAsanaProject(projectData) {
  const url = 'https://app.asana.com/api/1.0/projects';

  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${asanaApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(projectData)
  };

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) {
    const errorMessage = responseData.errors ? responseData.errors[0].message : response.statusText;
    throw new Error(`Failed to create Asana project: ${errorMessage}`);
  }

  return responseData;
}

// Function to update the custom object record with the Asana project ID
async function updateCustomObjectWithAsanaId(customObjectRecordId, asanaProjectId) {
  const url = `https://api.hubapi.com/crm/v3/objects/${customObjectId}/${customObjectRecordId}`;

  const properties = {
    asana_id: asanaProjectId
  };
  console.log("Properties object:", properties); // Added for debugging
  const options = {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${hubspotBearerToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ properties })
  };
  console.log("Request body:", JSON.stringify({ properties })); // Added for debugging
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to update custom object record with Asana ID: ${data.message}`);
  }

  return data;
}
// Function to get the ID of the associated custom object record using the associations API
async function getCustomObjectRecordId(dealId) {
  const url = `https://api.hubapi.com/crm/v4/objects/deals/${dealId}/associations/${customObjectId}`;


  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${hubspotBearerToken}`,
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data.results[0].toObjectId)
  if (!response.ok) {
    throw new Error(`Failed to fetch custom object associations: ${data.message}`);
  }

  if (data.results != null) {
    return data.results[0].toObjectId;
  } else {
    throw new Error(`No associated custom object record found for deal ${dealId}`);
  }
}
// Main function to create Asana project and update custom object record
exports.main = async (event) => {
  const dealId = event.inputFields['hs_object_id'];

  try {
    // Get deal data from HubSpot
    const dealData = await getDealData(dealId);
    console.log(dealData)
    // Get the ID of the associated custom object record
    // Convert the date to 'YYYY-MM-DD' format for Asana
    //const dueDate = new Date(dealData.properties.estimated_completion_date).toISOString().split('T')[0];

    // Create Asana project
    const asanaProjectData = {
      "data": {
        "default_view": "calendar",
        "name": dealData.properties.dealname,
        "notes": `Project Manager: ${dealData.properties.project_manager_name}`,
        "team": `${asanaTeam}`
      }
    };

    const asanaResponse = await createAsanaProject(asanaProjectData);
    const asanaProjectId = asanaResponse.data.gid; // Access the project ID directly from the response

    // Update custom object record with Asana project ID
    // Get the ID of the associated custom object record
    const customObjectRecordId = await getCustomObjectRecordId(dealId);
    console.log("Asana Project ID:", asanaProjectId); // Added for debugging
    console.log("Custom Object Record ID:", customObjectRecordId); // Added for debugging
    await updateCustomObjectWithAsanaId(customObjectRecordId, asanaProjectId);

    console.log("Asana project created successfully with ID:", asanaProjectId);
  } catch (error) {
    console.error("Error:", error.message);
  }
};