import React, { useEffect, useState } from 'react';
import { Flex, hubspot } from '@hubspot/ui-extensions';

//Custom components
import { AddNewFrame } from './components/addNewComponents';
import {
  AssignedProjectTable,
  ProjectDetailsRow,
} from './components/assignedProjectTable';

// The ID of the custom object, Construction Project, used for record links
// dev sandbox = 2-16990860
// uie demo = 2-17042629
const customObjectId = '2-17042629';

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, runServerlessFunction, actions }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    sendAlert={actions.addAlert}
    fetchProperties={actions.fetchCrmObjectProperties}
  />
));
// Define the Extension component, taking in runServerless, context, & sendAlert as props
const Extension = ({ context, runServerless, sendAlert, fetchProperties }) => {
  // Holds the record ID of the custom object being viewed, used to fetch associations and associate new projects
  const [objectId, setObjectId] = useState(null);
  // Holds the Hub ID for record links
  const portalId = context.portal.id;

  // Collections for data displayed in tables:
  // Projects currently associated with the viewed record
  const [projectDetails, setProjectDetails] = useState(null);

  // Options for the select component used for the status field in the forms
  // We don't include "assigned" since that's only used when removing a project and handled separately
  const statusOptions = [
    { label: 'Assigned', value: "assigned" },
    { label: 'Planning Initiated', value: "planning" },
    { label: 'In Progress', value: "In Progress" },
    { label: 'Completed', value: "Completed" },
  ];

  // Calls the serverless function to get associated construction project record for the currently viewed project
  const getAssociatedProjects = (hs_object_id) =>{
    runServerless({
      name: 'getAssociatedProjects',
      parameters: {
        hs_object_id: hs_object_id,
      },
    }).then((resp) => {
      console.log('graphql resp:', resp.response);
      let tempProjectDetails =
        resp.response.data.CRM.company.associations
          .p_construction_projects_collection__construction_project_to_company
          .items;
      tempProjectDetails.sort( (a,b) => a.project_name.localeCompare(b.project_name));
      console.log(tempProjectDetails);
      setProjectDetails(tempProjectDetails);
    });
  };

  // Calls the serverless function to create a new project record and associate it with the company
  const createNewProject = (formDetails) => {
    let formFields = formDetails.targetValue;

    // Make sure the asana Id is a number, skip the serverless call if it's not
    if (!Number(formFields.asana_id)) {
      sendAlert({ message: "Asana Id must be a number" });
      return;
    }
    // Send the form details to the serverless function that creates the new project record
    runServerless({
      name: 'createNewProject',
      parameters: {
        companyId: objectId,
        project_name: formFields.project_name,
        asana_id: formFields.asana_id,
        budget: formFields.budget,
        project_status: formFields.project_status
      }
    }).then((resp) => {
      console.log(resp.response);
      if(
        resp.response &&
        resp.response.status &&
        resp.response.status >= 400
      ) {
        sendAlert({ message: "Something went wrong. Please try again." });
      } else {
        sendAlert({ message: "Construction Project added!" });
      }
      // Rebuild the table to include the new project
      getAssociatedProjects(objectId);
    });
  };

  // Calls the serverless function to update the status property of a project, after choosing a new status in the table row
  const updateProjectStatus = (recordId, newStatus, callback) => {
    // call the serverless function to update the status of the record
    runServerless({
      name: 'updateProjectStatus',
      parameters: {
        project_status: newStatus,
        projectRecordId: recordId,
      },
    }).then((resp) => {
      console.log('update response:', resp);
      sendAlert({ message: "Project status updated" });
      getAssociatedProjects(objectId);
      callback();
    });
  };

  const removeProjectfromCompany = (recordId, callback) => {
    // Call the serverless function to make the 2 API requests
    runServerless({
      name: 'removeProjectFromCompany',
      parameters: {
        projectRecordId: recordId,
        companyId: objectId,
      },
    }).then((resp) => {
      console.log('remove response', resp);
      sendAlert({ message: "Construction project removed from company." });
      getAssociatedAssets(objectId);
      callback();
    });
  };
  // Calls the serverless function to assign an existing project to the company
  // Associates the project record to the company and sets the project's status to "planning"
  const assignAndUpdateStatus = (projectId, setStatus) => {
    console.log(projectId, setStatus, objectId);

    runServerless({
      name: 'assignAndUpdateStatus',
      parameters: {
        projectRecordId: projectId,
        project_status: setStatus,
        companyId: objectId,
      },
    }).then((resp) => {
      console.log('assign and update response', resp);
      sendAlert({ message: "Construction project assigned to company!" });
      getAssociatedProjects(objectId);
    });
  };
  // Runs at start to get the hs_object_id and sets it for objectId
  // Runs after objectId is set to call getAssociatedProjects (if it's not already set form the first run)
  useEffect(() => {
    console.log("main useeffect ran");
    if (!objectId) {
      fetchProperties(["hs_object_id"]).then((properties) => {
        console.log('received objectId');
        getAssociatedProjects(properties.hs_object_id);
        setObjectId(properties.hs_object_id);
      });
    }
  }, [fetchProperties]);

  const addNewStateProps = {
    customObjectId,
    portalId,
    statusOptions,
    createNewProject,
    assignAndUpdateStatus,
    runServerless,
  };

  const assignedRowProps = {
    projectDetails,
    portalId,
    customObjectId,
    statusOptions,
    updateProjectStatus,
    removeProjectfromCompany,
  };

  return (
    <Flex gap="medium" direction="column">
      <AssignedProjectTable projectDetails={projectDetails}>
        {projectDetails &&
          projectDetails.map((item) => (
            <ProjectDetailsRow item={item} props={assignedRowProps} />
          ))}
      </AssignedProjectTable>
      <AddNewFrame {...addNewStateProps} />
    </Flex>
  );
};
