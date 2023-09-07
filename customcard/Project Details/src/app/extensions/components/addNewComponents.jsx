import React, {useState} from 'react';
import {
  Form,
  Flex,
  ButtonRow,
  Button,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Text,
  Link,
  Select,
  Input,
} from '@hubspot/ui-extensions';

// Creates a new react component for the add new form, and the add new button
export const AddProjectForm = (props) => {
  return (
    <Form onSubmit={props.createNewProject} preventDefault={true}>
      <Flex direction={'column'} gap={'extra-small'}>
        <Flex direction={'row'} gap={'extra-small'}>
          <Input
            label="Project Name"
            name="project_name"
            placeholder="Name of construction project"
            required={true}
          />
          <Input
            label="Asana Id"
            name="asana_id"
            placeholder="ex: 0123456789"
            required={true}
          />
          <Input
            label="Budget"
            name="budget"
            placeholder="ex: $20,000"
            required={true}
          />
          <Select
            label="Project Status"
            name="status"
            options={props.statusOptions}
            value="assigned"
            required={true}
          />
        </Flex>
        <Flex direction={'row'} gap={'extra-small'}>
          <Button variant="primary" type="submit">
            Add project
          </Button>
          <Button
            variant="destructive"
            type="button"
            onClick={props.hideAddProjectForm}
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};

// Component for the form and table for searching and assigning an existing construction project
export const AssignmentForm = (props) => {
  // Handle the component search submission
  const searchForProjects = (formDetails) => {
    console.log(formDetails.targetValue.searchString);

    props
      .runServerless({
        name: "searchForProjects",
        parameters: {
          searchString: formDetails.targetValue.searchString,
        },
      })
      .then((resp) => {
        console.log("search response", resp);
        let tempResults = resp.response.results;
        tempResults.sort((a, b) =>
          a.properties.project_name.localeCompare(b.properties.project_name)
        );
        console.log(tempResults);
        props.setProjectSearchResults(tempResults);
      });
  };
  // Subcomponent used for each project in the results table
  const ProjectSearchResultsRow = ({ item }) => {
    // Build the link to the record details page
    let recordUrl = `https://app.hubspot.com/contacts/${props.portalId}/record/${props.customObjectId}/${item.id}/view/1`;

    // handle the assign button click for the row and call the function that makes the serverless request
    const makeAssignRequest = () => {
      props.assignAndUpdateStatus(item.id, "assigned");
    };

    return (
      <TableRow>
        <TableCell>
          <Link href={recordUrl}>{item.properties.project_name}</Link>
        </TableCell>
        <TableCell>{item.properties.asana_id}</TableCell>
        <TableCell>
          <Button variant="primary" onClick={makeAssignRequest}>
            Assign
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  // Subcomponent for the results table
  const ProjectSearchResultTable = (props) => {
    // shows default text to start, "no results" text if there are no results, or the table of search results
    if (props.projectSearchResults === null) {
      // still loading, show loading display
      return <Text>Enter a construction project name to start</Text>;
    } else if (props.projectSearchResults.length === 0) {
      // no projects, show default state
      return <Text>No results found, try again.</Text>;
    } else {
      return (
        <Table bordered={true}>
          <TableHead>
            <TableRow>
              <TableHeader>Project Record</TableHeader>
              <TableHeader>Asana Id</TableHeader>
              <TableHeader>Assign</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.projectSearchResults &&
              props.projectSearchResults.map((item) => (
                <ProjectSearchResultsRow item={item} />
              ))}
          </TableBody>
        </Table>
      );
    }
  };
  return (
    <>
      <Form onSubmit={searchForProjects} preventDefault={true}>
        <Flex direction={'row'} gap={'extra-small'}>
          <Input
            name="searchString"
            placeholder="Enter your search"
            required={true}
          />
          <Button type="submit" variant="primary">
            Search
          </Button>
          <Button variant="secondary" onClick={props.hideAssignForm}>
            Cancel
          </Button>
        </Flex>
      </Form>
      <ProjectSearchResultTable {...props} />
    </>
  );
};

export const AddAssignButtons = (props) => {
  return (
    <ButtonRow>
      <Button
        type="submit"
        onClick={props.showAddProjectForm}
        variant="primary"
      >
        Add new construction project
      </Button>
      <Button
        type="button"
        onClick={props.showAssignmentForm}
        variant="primary"
      >
        Assign existing construction project
      </Button>
    </ButtonRow>
  );
};

export const AddNewFrame = (props) => {
  const [addFrameState, setAddFrameState] = useState(0);

  const [projectSearchResults, setProjectSearchResults] = useState(null);

  const showAddProjectForm = () => setAddFrameState(1);

  const hideAddProjectForm = () => setAddFrameState(0);

  const showAssignmentForm = () => setAddFrameState(2);

  const hideAssignForm = () => setAddFrameState(0);

  props.showAddProjectForm = showAddProjectForm;
  props.hideAddProjectForm = hideAddProjectForm;
  props.showAssignmentForm = showAssignmentForm;
  props.hideAssignForm = hideAssignForm;
  props.projectSearchResults = projectSearchResults;
  props.setProjectSearchResults = setProjectSearchResults;

  switch (addFrameState) {
    case 0:
      return <AddAssignButtons {...props} />;
    case 1:
      return <AddProjectForm {...props} />;
    case 2:
      return <AssignmentForm {...props} />;
  }
};
