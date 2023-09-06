const fetch = require('node-fetch');

// Set your HubSpot API bearer token to authenticate API requests
const bearerToken = process.env.INBOUNDAPP; // Replace with your bearer token

// Define the base URL for the HubSpot API
const hubspotApiBaseUrl = 'https://api.hubapi.com';

// ID of your custom object in HubSpot
const customObjectId = '2-16990860';

// Function to get the deal ID associated with the custom object record
async function getDealId(customObjectRecordId) {
  try {
    // Construct the URL for getting the deal associations of the custom object record
    const url = `${hubspotApiBaseUrl}/crm/v4/associations/${customObjectId}/deals/batch/read`;
    // Set the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };
    const requestBody = {
      "inputs": [
        {
          "id": `${customObjectRecordId}`
        }
      ]
    }
    // Set the options for the API request
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    };

    // Send the API request to get the deal associations of the custom object record
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.results[0].to[0].toObjectId)
    // Check if the response contains the expected data structure
    if (data && data.results && data.results.length > 0) {
      // Return the first deal ID associated with the custom object record
      return data.results[0].to[0].toObjectId;
    } else {
      // Handle the case where the response does not contain the expected data
      console.error('Error getting deal ID: No associated deals found', data);
      return null;
    }
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error getting deal ID:', error);
    return null;
  }
}

// Function to get the associations between a deal and its associated companies
async function getDealCompanyAssociations(dealId) {
  try {
    // Construct the URL for getting the associations between the deal and companies
    const url = `${hubspotApiBaseUrl}/crm/v4/associations/Deals/Companies/batch/read`;
    // Set the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };
    // Prepare the request body for getting the associations
    const requestBody = {
      "inputs": [
        {
          "id": `${dealId}`
        }
      ]
    };
    // Set the options for the API request
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };

    // Send the API request to get the associations
    const response = await fetch(url, options);
    const data = await response.json();

    console.log("this is the response" + JSON.stringify(data.results))
    // Check if the response contains the expected data structure
    if (data && data.results && data.results.length > 0) {
      // Return the company associations
      return data.results;
    } else {
      // Handle the case where the response does not contain the expected data
      console.error('Error getting company associations: No associated companies found', data);
      return null;
    }
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error getting company associations:', error);
    return null;
  }
}

// Function to associate the custom object record with multiple companies
async function associateCustomObjectWithCompanies(customObjectRecordId, companyAssociations) {
  try {
    // Define the association map based on the provided parameters
    const associationMap = {
      88: 95,
      87: 96,
      85: 93,
      86: 93,
      89: 91,
      90: 91
      // Add more mapping as needed
    };

    // Prepare an array to hold all the association inputs
    const associationInputs = [];

    // Loop through the company associations and add them to the associationInputs array
    for (const association of companyAssociations) {
      for (const company of association.to) {
        const associationType = company.associationTypes.find(type => type.category === "USER_DEFINED");
        if (!associationType) {
          console.error('Error: No USER_DEFINED association type found for a company');
          continue;
        }

        const companyId = company.toObjectId;
        const associationTypeId = associationMap[associationType.typeId];

        associationInputs.push({
          types: [
            {
              associationCategory: "USER_DEFINED",
              associationTypeId: associationTypeId
            }
          ],
          from: { id: customObjectRecordId },
          to: { id: companyId }
        });
      }
    }

    // Construct the URL for associating the custom object with the companies
    const url = `${hubspotApiBaseUrl}/crm/v4/associations/${customObjectId}/companies/batch/create`;

    // Set the headers for the API request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    };

    // Prepare the request body with the association inputs
    const requestBody = {
      inputs: associationInputs
    };

    // Set the options for the API request
    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    };

    // Send the API request to associate the custom object with the companies
    const response = await fetch(url, options);

    if (response.ok) {
      console.log('Custom object associations with companies created successfully.');
      return true;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to create custom object associations with companies:', errorMessage);
      return false;
    }
  } catch (error) {
    // Handle any errors that may occur during the API request
    console.error('Error associating custom object with companies:', error);
    return false;
  }
}

// Main function to retrieve the deal ID of the deal associated with the custom object record
exports.main = async (event) => {
  // Extract the custom object record ID and other necessary details from the event input fields
  const customObjectRecordId = event.inputFields['hs_object_id']; // Assuming this is the field name for the custom object record ID in the event input fields

  // Fetch the deal ID associated with the custom object record
  const dealId = await getDealId(customObjectRecordId);

  // Check if getting the deal ID was successful
  if (dealId !== null) {
    console.log('Deal ID associated with the custom object record:', dealId);

    // Get associations between the deal and its associated companies
    const companyAssociations = await getDealCompanyAssociations(dealId);

    if (companyAssociations !== null && companyAssociations.length > 0) {
      console.log('Associated company IDs:', companyAssociations);

      // Associate the custom object record with the companies using the association map
      await associateCustomObjectWithCompanies(customObjectRecordId, companyAssociations);

      // Indicate success to the workflow
      return { success: true };
    } else {
      // No associated companies found for the deal
      console.error('Error: No associated companies found for the deal');
      return { success: false };
    }
  } else {
    console.log('Failed to get deal ID.');

    // Indicate failure to the workflow
    return { success: false };
  }
};