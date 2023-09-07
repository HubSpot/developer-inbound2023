import React, { useState } from "react";
import {
  Form,
  Flex,
  ButtonRow,
  Button,
  Tag,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  LoadingSpinner,
  Link,
  Select,
  EmptyState,
} from "@hubspot/ui-extensions";

// Component for the table of currently assigned construction projects
export const AssignedProjectTable = ({ projectDetails, children }) => {
  if (projectDetails === null) {
    return <LoadingSpinner label="Loading Construction Projects..." showLabel={true} />;
  } else if (projectDetails.length === 0) {
    return (
      <EmptyState
        title="No assigned construction projects"
        layout='vertical'
        reverseOrder={true}
      />
    );
  } else {
    return (
      <Table bordered={true}>
        <TableHead>
          <TableRow>
            <TableHeader width={150}>Project Name</TableHeader>
            <TableHeader width={150}>See More</TableHeader>
            <TableHeader width={250}>Asana ID</TableHeader>
            <TableHeader width={150}>Budget</TableHeader>
            <TableHeader>Project Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    );
  }
};
// Create a new component for a row of project details, used for the projects already associated to the company
export const ProjectDetailsRow = ({ item, props }) => {
  // Show/hide form to update status for this specific project
  const [isStatusFormVisible, setIsStatusFormVisible] = useState(false);

  const showStatusForm = () => {
    setChangeStatusValue(item.status ? item.status.value : "assigned");
    setIsStatusFormVisible(true);
  };
  // Hide the form
  const hideStatusForm = () => {
    setIsStatusFormVisible(false);
  };
  // Disable the form while it's processing
  const [disabledWhileWorking, setDisabledWhileWorking] = useState(false);
  // Track the value of the status form field for updating status
  const [changeStatusValue, setChangeStatusValue] = useState(
    item.status ? item.status.value : "assigned"
  );
  // Build the link to the record page for the project
  let recordUrl = `https://app.hubspot.com/contacts/${props.portalId}/record/${props.customObjectId}/${item.hs_object_id}/view/1`;

  // Subcomponent for the status tag to handle the variant used based on status label
  // When the Tag is clicked, it switches to showing the form and save/cancel/remove buttons to change the status
  const ProjectStatus = ({ statusLabel }) => {
    let tagVariant = "default";

    if (statusLabel === "Planning Initiated" || statusLabel === "Assigned") {
      tagVariant = "error";
    } else if (statusLabel === "In Progress") {
      tagVariant = "warning";
    } else if (statusLabel === "Completed") {
      tagVariant = "success";
    }

    return (
      <Tag variant={tagVariant} onClick={showStatusForm}>
        {statusLabel}
      </Tag>
    );
  };

  // Handles the Save button click for updating status from its own component
  // This lets us get the project recordId without using an input field for it
  const handleSubmitClick = () => {
    console.log("clicked save, status is:", changeStatusValue);
    setDisabledWhileWorking(true);
    props.updateProjectStatus(
      item.hs_object_id,
      changeStatusValue,
      resetRowState
    );
  };

  // Handles the remove button click, deletes the association and resets status to available
  // This lets us get the project recordId without using an input field for it
  const sendProjectRemove = () => {
    setDisabledWhileWorking(true);
    props.removeProjectfromCompany(item.hs_object_id, resetRowState);
  };

  const resetRowState = () => {
    setDisabledWhileWorking(false);
    hideStatusForm();
  };
  // Renders the row in the main table
  // The status cell shows a tag component by default
  // onclick it switches to a form that lets you update the status for the record
  return (
    <TableRow key={item.hs_object_id}>
      <TableCell>{item.project_name}</TableCell>
      <TableCell>
        <Link href={recordUrl}>View Project Record</Link>
      </TableCell>
      <TableCell>
        <Link href="https://app.asana.com/0/profile/1205160638562954"></Link>
        {item.asana_id}
      </TableCell>
      <TableCell>{item.budget}</TableCell>
      <TableCell>
        {!isStatusFormVisible ? (
          item.status ? (
            <ProjectStatus statusLabel={item.status.label} />
          ) : (
            <ProjectStatus statusLabel="None" />
          )
        ) : (
          <>
            <Form preventDefault={true}>
              <Flex direction={"row"} distance={"extra-small"}>
                <Select
                  name="newStatus"
                  disabled={disabledWhileWorking}
                  options={props.statusOptions}
                  value={changeStatusValue}
                  required={true}
                  onChange={(e) => {
                    setChangeStatusValue(e);
                  }}
                />
                <ButtonRow>
                  <Button
                    variant="primary"
                    onClick={handleSubmitClick}
                    disabled={disabledWhileWorking}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={hideStatusForm}
                    disabled={disabledWhileWorking}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={sendProjectRemove}
                    disabled={disabledWhileWorking}
                  >
                    Remove
                  </Button>
                </ButtonRow>
              </Flex>
            </Form>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
