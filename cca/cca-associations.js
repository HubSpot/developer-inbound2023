const fetch = require('node-fetch');

// Set your HubSpot API bearer token to authenticate API requests
const bearerToken = process.env.INBOUNDAPP; // Replace with your bearer token

// Define the base URL for the HubSpot API
const hubspotApiBaseUrl = 'https://api.hubapi.com';

// ID of your custom object in HubSpot
const customObjectId = '2-16990860';

// Function to create a new custom object record
async function createCustomObjectRecord(customObjectData, dealId) {
  try {
    // Construct the URL for creating a new custom object record
    const url = `${hubspotApiBaseUrl}/crm/v3/objects/${customObjectId}`;

    // Set the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };

    // Prepare the request body with the custom object data
    const requestBody = {
      properties: customObjectData
    };

    // Set the options for the API request
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    };

    // Send the API request to create the new custom object record
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.properties.hs_object_id)
    // Check if the response contains the expected data structure
    if (data) {
      const newCustomObjectRecordId = data.properties.hs_object_id
      console.log('Custom object record created successfully with ID:', newCustomObjectRecordId);

      // Associate the custom object record with the deal
      await associateCustomObjectWithDeal(newCustomObjectRecordId, dealId);

      // Indicate success
      return { success: true, newCustomObjectId: newCustomObjectRecordId };
    } else {
      // Handle the case where the response does not contain the expected data
      console.error('Error creating custom object record: Invalid response data', data);
      return { success: false };
    }
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error creating custom object record:', error);
    return { success: false };
  }
}

// Function to associate the custom object record with the deal using v4 associations endpoint
async function associateCustomObjectWithDeal(customObjectRecordId, dealId) {
  try {
    // Construct the URL for associating the custom object with the deal
    const url = `${hubspotApiBaseUrl}/crm/v4/associations/${customObjectId}/deals/batch/associate/default`;

    // Set the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };

    // Prepare the request body for associating the custom object with the deal
    const requestBody = {
      "inputs": [
        {
          "from": { "id": customObjectRecordId },
          "to": { "id": dealId }
        }
      ]
    };

    // Set the options for the API request
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };

    // Send the API request to associate the custom object with the deal
    const response = await fetch(url, options);

    if (response.ok) {
      console.log('Deal association created successfully.');
      return true;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to create deal association:', errorMessage);
      return false;
    }
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error associating custom object with deal:', error);
    return false;
  }
}

// Main function to create custom object record and associate it with the deal
exports.main = async (event) => {
  // Extract the deal ID and target_due_date from the input fields provided by the workflow
  const dealId = event.inputFields['hs_object_id'];
  const targetDueDate = event.inputFields['target_due_date'];
  const title = event.inputFields['dealname'];

  // Prepare custom object data with deal properties and the 'project_name' property set to 'target_due_date'
  const customObjectData = {
    "project_name": title,
    "end_date": targetDueDate
    // Add other deal properties you want to include in the custom object record
  };

  // Create the custom object record using the customObjectData
  const result = await createCustomObjectRecord(customObjectData, dealId);

  return result;
};
