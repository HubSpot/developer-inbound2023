(function(React2, react) {
  "use strict";
  const hubspot = {
    extend: render
  };
  const extend = (...args) => self.extend(...args);
  function render(renderCallback) {
    return extend((root, api) => {
      const renderCallbackResult = renderCallback(api);
      if (!React2.isValidElement(renderCallbackResult)) {
        throw new Error(`[hubspot.extend]: Expected callback function to return a valid element, got: ${renderCallbackResult}`);
      }
      react.createRoot(root).render(renderCallbackResult);
      root.mount();
    });
  }
  react.createRemoteReactComponent("Alert");
  const Button = react.createRemoteReactComponent("Button");
  const ButtonRow = react.createRemoteReactComponent("ButtonRow");
  react.createRemoteReactComponent("Card");
  react.createRemoteReactComponent("DescriptionList");
  react.createRemoteReactComponent("DescriptionListItem");
  react.createRemoteReactComponent("Divider");
  const EmptyState = react.createRemoteReactComponent("EmptyState");
  react.createRemoteReactComponent("ErrorState");
  const Form = react.createRemoteReactComponent("Form");
  react.createRemoteReactComponent("Heading");
  react.createRemoteReactComponent("Image");
  const Input = react.createRemoteReactComponent("Input");
  const Link = react.createRemoteReactComponent("Link");
  react.createRemoteReactComponent("TextArea");
  react.createRemoteReactComponent("Textarea");
  const LoadingSpinner = react.createRemoteReactComponent("LoadingSpinner");
  react.createRemoteReactComponent("ProgressBar");
  const Select = react.createRemoteReactComponent("Select");
  const Tag = react.createRemoteReactComponent("Tag");
  const Text = react.createRemoteReactComponent("Text");
  react.createRemoteReactComponent("Tile");
  react.createRemoteReactComponent("Stack");
  react.createRemoteReactComponent("ToggleGroup");
  react.createRemoteReactComponent("StatisticsItem");
  react.createRemoteReactComponent("Statistics");
  react.createRemoteReactComponent("StatisticsTrend");
  const Table = react.createRemoteReactComponent("Table");
  react.createRemoteReactComponent("TableFooter");
  const TableCell = react.createRemoteReactComponent("TableCell");
  const TableRow = react.createRemoteReactComponent("TableRow");
  const TableBody = react.createRemoteReactComponent("TableBody");
  const TableHeader = react.createRemoteReactComponent("TableHeader");
  const TableHead = react.createRemoteReactComponent("TableHead");
  react.createRemoteReactComponent("NumberInput");
  react.createRemoteReactComponent("Box");
  react.createRemoteReactComponent("StepIndicator");
  react.createRemoteReactComponent("Accordion");
  react.createRemoteReactComponent("MultiSelect");
  const Flex = react.createRemoteReactComponent("Flex");
  react.createRemoteReactComponent("DateInput");
  var ServerlessExecutionStatus;
  (function(ServerlessExecutionStatus2) {
    ServerlessExecutionStatus2["Success"] = "SUCCESS";
    ServerlessExecutionStatus2["Error"] = "ERROR";
  })(ServerlessExecutionStatus || (ServerlessExecutionStatus = {}));
  const AddProjectForm = (props) => {
    return /* @__PURE__ */ React2.createElement(Form, { onSubmit: props.createNewProject, preventDefault: true }, /* @__PURE__ */ React2.createElement(Flex, { direction: "column", gap: "extra-small" }, /* @__PURE__ */ React2.createElement(Flex, { direction: "row", gap: "extra-small" }, /* @__PURE__ */ React2.createElement(
      Input,
      {
        label: "Project Name",
        name: "project_name",
        placeholder: "Name of construction project",
        required: true
      }
    ), /* @__PURE__ */ React2.createElement(
      Input,
      {
        label: "Asana Id",
        name: "asana_id",
        placeholder: "ex: 0123456789",
        required: true
      }
    ), /* @__PURE__ */ React2.createElement(
      Input,
      {
        label: "Budget",
        name: "budget",
        placeholder: "ex: $20,000",
        required: true
      }
    ), /* @__PURE__ */ React2.createElement(
      Select,
      {
        label: "Project Status",
        name: "status",
        options: props.statusOptions,
        value: "assigned",
        required: true
      }
    )), /* @__PURE__ */ React2.createElement(Flex, { direction: "row", gap: "extra-small" }, /* @__PURE__ */ React2.createElement(Button, { variant: "primary", type: "submit" }, "Add project"), /* @__PURE__ */ React2.createElement(
      Button,
      {
        variant: "destructive",
        type: "button",
        onClick: props.hideAddProjectForm
      },
      "Cancel"
    ))));
  };
  const AssignmentForm = (props) => {
    const searchForProjects = (formDetails) => {
      console.log(formDetails.targetValue.searchString);
      props.runServerless({
        name: "searchForProjects",
        parameters: {
          searchString: formDetails.targetValue.searchString
        }
      }).then((resp) => {
        console.log("search response", resp);
        let tempResults = resp.response.results;
        tempResults.sort(
          (a, b) => a.properties.project_name.localeCompare(b.properties.project_name)
        );
        console.log(tempResults);
        props.setProjectSearchResults(tempResults);
      });
    };
    const ProjectSearchResultsRow = ({ item }) => {
      let recordUrl = `https://app.hubspot.com/contacts/${props.portalId}/record/${props.customObjectId}/${item.id}/view/1`;
      const makeAssignRequest = () => {
        props.assignAndUpdateStatus(item.id, "assigned");
      };
      return /* @__PURE__ */ React2.createElement(TableRow, null, /* @__PURE__ */ React2.createElement(TableCell, null, /* @__PURE__ */ React2.createElement(Link, { href: recordUrl }, item.properties.project_name)), /* @__PURE__ */ React2.createElement(TableCell, null, item.properties.asana_id), /* @__PURE__ */ React2.createElement(TableCell, null, /* @__PURE__ */ React2.createElement(Button, { variant: "primary", onClick: makeAssignRequest }, "Assign")));
    };
    const ProjectSearchResultTable = (props2) => {
      if (props2.projectSearchResults === null) {
        return /* @__PURE__ */ React2.createElement(Text, null, "Enter a construction project name to start");
      } else if (props2.projectSearchResults.length === 0) {
        return /* @__PURE__ */ React2.createElement(Text, null, "No results found, try again.");
      } else {
        return /* @__PURE__ */ React2.createElement(Table, { bordered: true }, /* @__PURE__ */ React2.createElement(TableHead, null, /* @__PURE__ */ React2.createElement(TableRow, null, /* @__PURE__ */ React2.createElement(TableHeader, null, "Project Record"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Asana Id"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Assign"))), /* @__PURE__ */ React2.createElement(TableBody, null, props2.projectSearchResults && props2.projectSearchResults.map((item) => /* @__PURE__ */ React2.createElement(ProjectSearchResultsRow, { item }))));
      }
    };
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Form, { onSubmit: searchForProjects, preventDefault: true }, /* @__PURE__ */ React2.createElement(Flex, { direction: "row", gap: "extra-small" }, /* @__PURE__ */ React2.createElement(
      Input,
      {
        name: "searchString",
        placeholder: "Enter your search",
        required: true
      }
    ), /* @__PURE__ */ React2.createElement(Button, { type: "submit", variant: "primary" }, "Search"), /* @__PURE__ */ React2.createElement(Button, { variant: "secondary", onClick: props.hideAssignForm }, "Cancel"))), /* @__PURE__ */ React2.createElement(ProjectSearchResultTable, { ...props }));
  };
  const AddAssignButtons = (props) => {
    return /* @__PURE__ */ React2.createElement(ButtonRow, null, /* @__PURE__ */ React2.createElement(
      Button,
      {
        type: "submit",
        onClick: props.showAddProjectForm,
        variant: "primary"
      },
      "Add new construction project"
    ), /* @__PURE__ */ React2.createElement(
      Button,
      {
        type: "button",
        onClick: props.showAssignmentForm,
        variant: "primary"
      },
      "Assign existing construction project"
    ));
  };
  const AddNewFrame = (props) => {
    const [addFrameState, setAddFrameState] = React2.useState(0);
    const [projectSearchResults, setProjectSearchResults] = React2.useState(null);
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
        return /* @__PURE__ */ React2.createElement(AddAssignButtons, { ...props });
      case 1:
        return /* @__PURE__ */ React2.createElement(AddProjectForm, { ...props });
      case 2:
        return /* @__PURE__ */ React2.createElement(AssignmentForm, { ...props });
    }
  };
  const AssignedProjectTable = ({ projectDetails, children }) => {
    if (projectDetails === null) {
      return /* @__PURE__ */ React2.createElement(LoadingSpinner, { label: "Loading Construction Projects...", showLabel: true });
    } else if (projectDetails.length === 0) {
      return /* @__PURE__ */ React2.createElement(
        EmptyState,
        {
          title: "No assigned construction projects",
          layout: "vertical",
          reverseOrder: true
        }
      );
    } else {
      return /* @__PURE__ */ React2.createElement(Table, { bordered: true }, /* @__PURE__ */ React2.createElement(TableHead, null, /* @__PURE__ */ React2.createElement(TableRow, null, /* @__PURE__ */ React2.createElement(TableHeader, { width: 150 }, "Project Name"), /* @__PURE__ */ React2.createElement(TableHeader, { width: 150 }, "See More"), /* @__PURE__ */ React2.createElement(TableHeader, { width: 250 }, "Asana ID"), /* @__PURE__ */ React2.createElement(TableHeader, { width: 150 }, "Budget"), /* @__PURE__ */ React2.createElement(TableHeader, null, "Project Status"))), /* @__PURE__ */ React2.createElement(TableBody, null, children));
    }
  };
  const ProjectDetailsRow = ({ item, props }) => {
    const [isStatusFormVisible, setIsStatusFormVisible] = React2.useState(false);
    const showStatusForm = () => {
      setChangeStatusValue(item.status ? item.status.value : "assigned");
      setIsStatusFormVisible(true);
    };
    const hideStatusForm = () => {
      setIsStatusFormVisible(false);
    };
    const [disabledWhileWorking, setDisabledWhileWorking] = React2.useState(false);
    const [changeStatusValue, setChangeStatusValue] = React2.useState(
      item.status ? item.status.value : "assigned"
    );
    let recordUrl = `https://app.hubspot.com/contacts/${props.portalId}/record/${props.customObjectId}/${item.hs_object_id}/view/1`;
    const ProjectStatus = ({ statusLabel }) => {
      let tagVariant = "default";
      if (statusLabel === "Planning Initiated" || statusLabel === "Assigned") {
        tagVariant = "error";
      } else if (statusLabel === "In Progress") {
        tagVariant = "warning";
      } else if (statusLabel === "Completed") {
        tagVariant = "success";
      }
      return /* @__PURE__ */ React2.createElement(Tag, { variant: tagVariant, onClick: showStatusForm }, statusLabel);
    };
    const handleSubmitClick = () => {
      console.log("clicked save, status is:", changeStatusValue);
      setDisabledWhileWorking(true);
      props.updateProjectStatus(
        item.hs_object_id,
        changeStatusValue,
        resetRowState
      );
    };
    const sendProjectRemove = () => {
      setDisabledWhileWorking(true);
      props.removeProjectfromCompany(item.hs_object_id, resetRowState);
    };
    const resetRowState = () => {
      setDisabledWhileWorking(false);
      hideStatusForm();
    };
    return /* @__PURE__ */ React2.createElement(TableRow, { key: item.hs_object_id }, /* @__PURE__ */ React2.createElement(TableCell, null, item.project_name), /* @__PURE__ */ React2.createElement(TableCell, null, /* @__PURE__ */ React2.createElement(Link, { href: recordUrl }, "View Project Record")), /* @__PURE__ */ React2.createElement(TableCell, null, /* @__PURE__ */ React2.createElement(Link, { href: "https://app.asana.com/0/profile/1205160638562954" }), item.asana_id), /* @__PURE__ */ React2.createElement(TableCell, null, item.budget), /* @__PURE__ */ React2.createElement(TableCell, null, !isStatusFormVisible ? item.status ? /* @__PURE__ */ React2.createElement(ProjectStatus, { statusLabel: item.status.label }) : /* @__PURE__ */ React2.createElement(ProjectStatus, { statusLabel: "None" }) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Form, { preventDefault: true }, /* @__PURE__ */ React2.createElement(Flex, { direction: "row", distance: "extra-small" }, /* @__PURE__ */ React2.createElement(
      Select,
      {
        name: "newStatus",
        disabled: disabledWhileWorking,
        options: props.statusOptions,
        value: changeStatusValue,
        required: true,
        onChange: (e) => {
          setChangeStatusValue(e);
        }
      }
    ), /* @__PURE__ */ React2.createElement(ButtonRow, null, /* @__PURE__ */ React2.createElement(
      Button,
      {
        variant: "primary",
        onClick: handleSubmitClick,
        disabled: disabledWhileWorking
      },
      "Save"
    ), /* @__PURE__ */ React2.createElement(
      Button,
      {
        onClick: hideStatusForm,
        disabled: disabledWhileWorking
      },
      "Cancel"
    ), /* @__PURE__ */ React2.createElement(
      Button,
      {
        variant: "destructive",
        onClick: sendProjectRemove,
        disabled: disabledWhileWorking
      },
      "Remove"
    )))))));
  };
  const customObjectId = "2-17042629";
  hubspot.extend(({ context, runServerlessFunction, actions }) => /* @__PURE__ */ React2.createElement(
    Extension,
    {
      context,
      runServerless: runServerlessFunction,
      sendAlert: actions.addAlert,
      fetchProperties: actions.fetchCrmObjectProperties
    }
  ));
  const Extension = ({ context, runServerless, sendAlert, fetchProperties }) => {
    const [objectId, setObjectId] = React2.useState(null);
    const portalId = context.portal.id;
    const [projectDetails, setProjectDetails] = React2.useState(null);
    const statusOptions = [
      { label: "Assigned", value: "assigned" },
      { label: "Planning Initiated", value: "planning" },
      { label: "In Progress", value: "In Progress" },
      { label: "Completed", value: "Completed" }
    ];
    const getAssociatedProjects = (hs_object_id) => {
      runServerless({
        name: "getAssociatedProjects",
        parameters: {
          hs_object_id
        }
      }).then((resp) => {
        console.log("graphql resp:", resp.response);
        let tempProjectDetails = resp.response.data.CRM.company.associations.p_construction_projects_collection__construction_project_to_company.items;
        tempProjectDetails.sort((a, b) => a.project_name.localeCompare(b.project_name));
        console.log(tempProjectDetails);
        setProjectDetails(tempProjectDetails);
      });
    };
    const createNewProject = (formDetails) => {
      let formFields = formDetails.targetValue;
      if (!Number(formFields.asana_id)) {
        sendAlert({ message: "Asana Id must be a number" });
        return;
      }
      runServerless({
        name: "createNewProject",
        parameters: {
          companyId: objectId,
          project_name: formFields.project_name,
          asana_id: formFields.asana_id,
          budget: formFields.budget,
          project_status: formFields.project_status
        }
      }).then((resp) => {
        console.log(resp.response);
        if (resp.response && resp.response.status && resp.response.status >= 400) {
          sendAlert({ message: "Something went wrong. Please try again." });
        } else {
          sendAlert({ message: "Construction Project added!" });
        }
        getAssociatedProjects(objectId);
      });
    };
    const updateProjectStatus = (recordId, newStatus, callback) => {
      runServerless({
        name: "updateProjectStatus",
        parameters: {
          project_status: newStatus,
          projectRecordId: recordId
        }
      }).then((resp) => {
        console.log("update response:", resp);
        sendAlert({ message: "Project status updated" });
        getAssociatedProjects(objectId);
        callback();
      });
    };
    const removeProjectfromCompany = (recordId, callback) => {
      runServerless({
        name: "removeProjectFromCompany",
        parameters: {
          projectRecordId: recordId,
          companyId: objectId
        }
      }).then((resp) => {
        console.log("remove response", resp);
        sendAlert({ message: "Construction project removed from company." });
        getAssociatedAssets(objectId);
        callback();
      });
    };
    const assignAndUpdateStatus = (projectId, setStatus) => {
      console.log(projectId, setStatus, objectId);
      runServerless({
        name: "assignAndUpdateStatus",
        parameters: {
          projectRecordId: projectId,
          project_status: setStatus,
          companyId: objectId
        }
      }).then((resp) => {
        console.log("assign and update response", resp);
        sendAlert({ message: "Construction project assigned to company!" });
        getAssociatedProjects(objectId);
      });
    };
    React2.useEffect(() => {
      console.log("main useeffect ran");
      if (!objectId) {
        fetchProperties(["hs_object_id"]).then((properties) => {
          console.log("received objectId");
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
      runServerless
    };
    const assignedRowProps = {
      projectDetails,
      portalId,
      customObjectId,
      statusOptions,
      updateProjectStatus,
      removeProjectfromCompany
    };
    return /* @__PURE__ */ React2.createElement(Flex, { gap: "medium", direction: "column" }, /* @__PURE__ */ React2.createElement(AssignedProjectTable, { projectDetails }, projectDetails && projectDetails.map((item) => /* @__PURE__ */ React2.createElement(ProjectDetailsRow, { item, props: assignedRowProps }))), /* @__PURE__ */ React2.createElement(AddNewFrame, { ...addNewStateProps }));
  };
})(React, RemoteUI);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1jYXJkLWZyb250ZW5kLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvQGh1YnNwb3QvdWktZXh0ZW5zaW9ucy9kaXN0L2h1YnNwb3QuanMiLCIuLi9ub2RlX21vZHVsZXMvQGh1YnNwb3QvdWktZXh0ZW5zaW9ucy9kaXN0L2NvcmVDb21wb25lbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BodWJzcG90L3VpLWV4dGVuc2lvbnMvZGlzdC90eXBlcy5qcyIsIi4uL2NvbXBvbmVudHMvYWRkTmV3Q29tcG9uZW50cy5qc3giLCIuLi9jb21wb25lbnRzL2Fzc2lnbmVkUHJvamVjdFRhYmxlLmpzeCIsIi4uL3Byb2plY3QtY2FyZC1mcm9udGVuZC5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgaHVic3BvdC1kZXYvbm8tY29uZnVzaW5nLWJyb3dzZXItZ2xvYmFscyAqL1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuaW1wb3J0IHsgaXNWYWxpZEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5leHBvcnQgY29uc3QgaHVic3BvdCA9IHtcbiAgICBleHRlbmQ6IHJlbmRlcixcbn07XG5jb25zdCBleHRlbmQgPSAoLi4uYXJncykgPT4gc2VsZi5leHRlbmQoLi4uYXJncyk7XG5mdW5jdGlvbiByZW5kZXIocmVuZGVyQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gZXh0ZW5kKChyb290LCBhcGkpID0+IHtcbiAgICAgICAgY29uc3QgcmVuZGVyQ2FsbGJhY2tSZXN1bHQgPSByZW5kZXJDYWxsYmFjayhhcGkpO1xuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHJlbmRlckNhbGxiYWNrUmVzdWx0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbaHVic3BvdC5leHRlbmRdOiBFeHBlY3RlZCBjYWxsYmFjayBmdW5jdGlvbiB0byByZXR1cm4gYSB2YWxpZCBlbGVtZW50LCBnb3Q6ICR7cmVuZGVyQ2FsbGJhY2tSZXN1bHR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlUm9vdChyb290KS5yZW5kZXIocmVuZGVyQ2FsbGJhY2tSZXN1bHQpO1xuICAgICAgICByb290Lm1vdW50KCk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCB9IGZyb20gJ0ByZW1vdGUtdWkvcmVhY3QnO1xuZXhwb3J0IGNvbnN0IEFsZXJ0ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0FsZXJ0Jyk7XG5leHBvcnQgY29uc3QgQnV0dG9uID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0J1dHRvbicpO1xuZXhwb3J0IGNvbnN0IEJ1dHRvblJvdyA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdCdXR0b25Sb3cnKTtcbmV4cG9ydCBjb25zdCBDYXJkID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0NhcmQnKTtcbmV4cG9ydCBjb25zdCBEZXNjcmlwdGlvbkxpc3QgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnRGVzY3JpcHRpb25MaXN0Jyk7XG5leHBvcnQgY29uc3QgRGVzY3JpcHRpb25MaXN0SXRlbSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdEZXNjcmlwdGlvbkxpc3RJdGVtJyk7XG5leHBvcnQgY29uc3QgRGl2aWRlciA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdEaXZpZGVyJyk7XG5leHBvcnQgY29uc3QgRW1wdHlTdGF0ZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdFbXB0eVN0YXRlJyk7XG5leHBvcnQgY29uc3QgRXJyb3JTdGF0ZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdFcnJvclN0YXRlJyk7XG5leHBvcnQgY29uc3QgRm9ybSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdGb3JtJyk7XG5leHBvcnQgY29uc3QgSGVhZGluZyA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdIZWFkaW5nJyk7XG5leHBvcnQgY29uc3QgSW1hZ2UgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnSW1hZ2UnKTtcbmV4cG9ydCBjb25zdCBJbnB1dCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdJbnB1dCcpO1xuZXhwb3J0IGNvbnN0IExpbmsgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnTGluaycpO1xuZXhwb3J0IGNvbnN0IFRleHRBcmVhID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RleHRBcmVhJyk7XG4vLyBUZXh0YXJlYSB3YXMgY2hhbmdlZCB0byBUZXh0QXJlYVxuLy8gRXhwb3J0aW5nIGJvdGggZm9yIGJhY2t3YXJkcyBjb21wYXRcbi8qKiBAZGVwcmVjYXRlZCB1c2UgVGV4dEFyZWEgaW5zdGVhZC4gV2l0aCBhIGNhcGl0YWwgQS4qL1xuZXhwb3J0IGNvbnN0IFRleHRhcmVhID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RleHRhcmVhJyk7XG5leHBvcnQgY29uc3QgTG9hZGluZ1NwaW5uZXIgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnTG9hZGluZ1NwaW5uZXInKTtcbmV4cG9ydCBjb25zdCBQcm9ncmVzc0JhciA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdQcm9ncmVzc0JhcicpO1xuZXhwb3J0IGNvbnN0IFNlbGVjdCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdTZWxlY3QnKTtcbmV4cG9ydCBjb25zdCBUYWcgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFnJyk7XG5leHBvcnQgY29uc3QgVGV4dCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdUZXh0Jyk7XG5leHBvcnQgY29uc3QgVGlsZSA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdUaWxlJyk7XG4vKiogQGRlcHJlY2F0ZWQgdXNlIEZsZXggaW5zdGVhZC4gSXQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IHJlbGVhc2UuICovXG5leHBvcnQgY29uc3QgU3RhY2sgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnU3RhY2snKTtcbmV4cG9ydCBjb25zdCBUb2dnbGVHcm91cCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdUb2dnbGVHcm91cCcpO1xuZXhwb3J0IGNvbnN0IFN0YXRpc3RpY3NJdGVtID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YXRpc3RpY3NJdGVtJyk7XG5leHBvcnQgY29uc3QgU3RhdGlzdGljcyA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGF0aXN0aWNzJyk7XG5leHBvcnQgY29uc3QgU3RhdGlzdGljc1RyZW5kID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1N0YXRpc3RpY3NUcmVuZCcpO1xuZXhwb3J0IGNvbnN0IFRhYmxlID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ1RhYmxlJyk7XG5leHBvcnQgY29uc3QgVGFibGVGb290ZXIgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVGb290ZXInKTtcbmV4cG9ydCBjb25zdCBUYWJsZUNlbGwgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVDZWxsJyk7XG5leHBvcnQgY29uc3QgVGFibGVSb3cgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVSb3cnKTtcbmV4cG9ydCBjb25zdCBUYWJsZUJvZHkgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVCb2R5Jyk7XG5leHBvcnQgY29uc3QgVGFibGVIZWFkZXIgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVIZWFkZXInKTtcbmV4cG9ydCBjb25zdCBUYWJsZUhlYWQgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnVGFibGVIZWFkJyk7XG5leHBvcnQgY29uc3QgTnVtYmVySW5wdXQgPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnTnVtYmVySW5wdXQnKTtcbmV4cG9ydCBjb25zdCBCb3ggPSBjcmVhdGVSZW1vdGVSZWFjdENvbXBvbmVudCgnQm94Jyk7XG5leHBvcnQgY29uc3QgU3RlcEluZGljYXRvciA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdTdGVwSW5kaWNhdG9yJyk7XG5leHBvcnQgY29uc3QgQWNjb3JkaW9uID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0FjY29yZGlvbicpO1xuZXhwb3J0IGNvbnN0IE11bHRpU2VsZWN0ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ011bHRpU2VsZWN0Jyk7XG5leHBvcnQgY29uc3QgRmxleCA9IGNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50KCdGbGV4Jyk7XG5leHBvcnQgY29uc3QgRGF0ZUlucHV0ID0gY3JlYXRlUmVtb3RlUmVhY3RDb21wb25lbnQoJ0RhdGVJbnB1dCcpO1xuIiwiZXhwb3J0IHZhciBTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzO1xuKGZ1bmN0aW9uIChTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzKSB7XG4gICAgU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1c1tcIlN1Y2Nlc3NcIl0gPSBcIlNVQ0NFU1NcIjtcbiAgICBTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzW1wiRXJyb3JcIl0gPSBcIkVSUk9SXCI7XG59KShTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzIHx8IChTZXJ2ZXJsZXNzRXhlY3V0aW9uU3RhdHVzID0ge30pKTtcbmV4cG9ydCBjbGFzcyBSZW1vdGVFdmVudCB7XG4gICAgdHlwZTtcbiAgICBidWJibGVzO1xuICAgIHRpbWVTdGFtcDtcbiAgICB0YXJnZXRWYWx1ZTtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy5idWJibGVzID0gZXZlbnQuYnViYmxlcztcbiAgICAgICAgdGhpcy50eXBlID0gZXZlbnQudHlwZTtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBldmVudC50aW1lU3RhbXA7XG4gICAgICAgIHRoaXMudGFyZ2V0VmFsdWUgPSB2YWx1ZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgRm9ybSxcbiAgRmxleCxcbiAgQnV0dG9uUm93LFxuICBCdXR0b24sXG4gIFRhYmxlLFxuICBUYWJsZUhlYWQsXG4gIFRhYmxlSGVhZGVyLFxuICBUYWJsZUJvZHksXG4gIFRhYmxlUm93LFxuICBUYWJsZUNlbGwsXG4gIFRleHQsXG4gIExpbmssXG4gIFNlbGVjdCxcbiAgSW5wdXQsXG59IGZyb20gJ0BodWJzcG90L3VpLWV4dGVuc2lvbnMnO1xuXG4vLyBDcmVhdGVzIGEgbmV3IHJlYWN0IGNvbXBvbmVudCBmb3IgdGhlIGFkZCBuZXcgZm9ybSwgYW5kIHRoZSBhZGQgbmV3IGJ1dHRvblxuZXhwb3J0IGNvbnN0IEFkZFByb2plY3RGb3JtID0gKHByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZvcm0gb25TdWJtaXQ9e3Byb3BzLmNyZWF0ZU5ld1Byb2plY3R9IHByZXZlbnREZWZhdWx0PXt0cnVlfT5cbiAgICAgIDxGbGV4IGRpcmVjdGlvbj17J2NvbHVtbid9IGdhcD17J2V4dHJhLXNtYWxsJ30+XG4gICAgICAgIDxGbGV4IGRpcmVjdGlvbj17J3Jvdyd9IGdhcD17J2V4dHJhLXNtYWxsJ30+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICBsYWJlbD1cIlByb2plY3QgTmFtZVwiXG4gICAgICAgICAgICBuYW1lPVwicHJvamVjdF9uYW1lXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTmFtZSBvZiBjb25zdHJ1Y3Rpb24gcHJvamVjdFwiXG4gICAgICAgICAgICByZXF1aXJlZD17dHJ1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgbGFiZWw9XCJBc2FuYSBJZFwiXG4gICAgICAgICAgICBuYW1lPVwiYXNhbmFfaWRcIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJleDogMDEyMzQ1Njc4OVwiXG4gICAgICAgICAgICByZXF1aXJlZD17dHJ1ZX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbnB1dFxuICAgICAgICAgICAgbGFiZWw9XCJCdWRnZXRcIlxuICAgICAgICAgICAgbmFtZT1cImJ1ZGdldFwiXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cImV4OiAkMjAsMDAwXCJcbiAgICAgICAgICAgIHJlcXVpcmVkPXt0cnVlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgbGFiZWw9XCJQcm9qZWN0IFN0YXR1c1wiXG4gICAgICAgICAgICBuYW1lPVwic3RhdHVzXCJcbiAgICAgICAgICAgIG9wdGlvbnM9e3Byb3BzLnN0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT1cImFzc2lnbmVkXCJcbiAgICAgICAgICAgIHJlcXVpcmVkPXt0cnVlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvRmxleD5cbiAgICAgICAgPEZsZXggZGlyZWN0aW9uPXsncm93J30gZ2FwPXsnZXh0cmEtc21hbGwnfT5cbiAgICAgICAgICA8QnV0dG9uIHZhcmlhbnQ9XCJwcmltYXJ5XCIgdHlwZT1cInN1Ym1pdFwiPlxuICAgICAgICAgICAgQWRkIHByb2plY3RcbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICB2YXJpYW50PVwiZGVzdHJ1Y3RpdmVcIlxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5oaWRlQWRkUHJvamVjdEZvcm19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvRmxleD5cbiAgICAgIDwvRmxleD5cbiAgICA8L0Zvcm0+XG4gICk7XG59O1xuXG4vLyBDb21wb25lbnQgZm9yIHRoZSBmb3JtIGFuZCB0YWJsZSBmb3Igc2VhcmNoaW5nIGFuZCBhc3NpZ25pbmcgYW4gZXhpc3RpbmcgY29uc3RydWN0aW9uIHByb2plY3RcbmV4cG9ydCBjb25zdCBBc3NpZ25tZW50Rm9ybSA9IChwcm9wcykgPT4ge1xuICAvLyBIYW5kbGUgdGhlIGNvbXBvbmVudCBzZWFyY2ggc3VibWlzc2lvblxuICBjb25zdCBzZWFyY2hGb3JQcm9qZWN0cyA9IChmb3JtRGV0YWlscykgPT4ge1xuICAgIGNvbnNvbGUubG9nKGZvcm1EZXRhaWxzLnRhcmdldFZhbHVlLnNlYXJjaFN0cmluZyk7XG5cbiAgICBwcm9wc1xuICAgICAgLnJ1blNlcnZlcmxlc3Moe1xuICAgICAgICBuYW1lOiBcInNlYXJjaEZvclByb2plY3RzXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICBzZWFyY2hTdHJpbmc6IGZvcm1EZXRhaWxzLnRhcmdldFZhbHVlLnNlYXJjaFN0cmluZyxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzcCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNlYXJjaCByZXNwb25zZVwiLCByZXNwKTtcbiAgICAgICAgbGV0IHRlbXBSZXN1bHRzID0gcmVzcC5yZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICB0ZW1wUmVzdWx0cy5zb3J0KChhLCBiKSA9PlxuICAgICAgICAgIGEucHJvcGVydGllcy5wcm9qZWN0X25hbWUubG9jYWxlQ29tcGFyZShiLnByb3BlcnRpZXMucHJvamVjdF9uYW1lKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyh0ZW1wUmVzdWx0cyk7XG4gICAgICAgIHByb3BzLnNldFByb2plY3RTZWFyY2hSZXN1bHRzKHRlbXBSZXN1bHRzKTtcbiAgICAgIH0pO1xuICB9O1xuICAvLyBTdWJjb21wb25lbnQgdXNlZCBmb3IgZWFjaCBwcm9qZWN0IGluIHRoZSByZXN1bHRzIHRhYmxlXG4gIGNvbnN0IFByb2plY3RTZWFyY2hSZXN1bHRzUm93ID0gKHsgaXRlbSB9KSA9PiB7XG4gICAgLy8gQnVpbGQgdGhlIGxpbmsgdG8gdGhlIHJlY29yZCBkZXRhaWxzIHBhZ2VcbiAgICBsZXQgcmVjb3JkVXJsID0gYGh0dHBzOi8vYXBwLmh1YnNwb3QuY29tL2NvbnRhY3RzLyR7cHJvcHMucG9ydGFsSWR9L3JlY29yZC8ke3Byb3BzLmN1c3RvbU9iamVjdElkfS8ke2l0ZW0uaWR9L3ZpZXcvMWA7XG5cbiAgICAvLyBoYW5kbGUgdGhlIGFzc2lnbiBidXR0b24gY2xpY2sgZm9yIHRoZSByb3cgYW5kIGNhbGwgdGhlIGZ1bmN0aW9uIHRoYXQgbWFrZXMgdGhlIHNlcnZlcmxlc3MgcmVxdWVzdFxuICAgIGNvbnN0IG1ha2VBc3NpZ25SZXF1ZXN0ID0gKCkgPT4ge1xuICAgICAgcHJvcHMuYXNzaWduQW5kVXBkYXRlU3RhdHVzKGl0ZW0uaWQsIFwiYXNzaWduZWRcIik7XG4gICAgfTtcblxuICAgIHJldHVybiAoXG4gICAgICA8VGFibGVSb3c+XG4gICAgICAgIDxUYWJsZUNlbGw+XG4gICAgICAgICAgPExpbmsgaHJlZj17cmVjb3JkVXJsfT57aXRlbS5wcm9wZXJ0aWVzLnByb2plY3RfbmFtZX08L0xpbms+XG4gICAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgICA8VGFibGVDZWxsPntpdGVtLnByb3BlcnRpZXMuYXNhbmFfaWR9PC9UYWJsZUNlbGw+XG4gICAgICAgIDxUYWJsZUNlbGw+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwicHJpbWFyeVwiIG9uQ2xpY2s9e21ha2VBc3NpZ25SZXF1ZXN0fT5cbiAgICAgICAgICAgIEFzc2lnblxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L1RhYmxlQ2VsbD5cbiAgICAgIDwvVGFibGVSb3c+XG4gICAgKTtcbiAgfTtcblxuICAvLyBTdWJjb21wb25lbnQgZm9yIHRoZSByZXN1bHRzIHRhYmxlXG4gIGNvbnN0IFByb2plY3RTZWFyY2hSZXN1bHRUYWJsZSA9IChwcm9wcykgPT4ge1xuICAgIC8vIHNob3dzIGRlZmF1bHQgdGV4dCB0byBzdGFydCwgXCJubyByZXN1bHRzXCIgdGV4dCBpZiB0aGVyZSBhcmUgbm8gcmVzdWx0cywgb3IgdGhlIHRhYmxlIG9mIHNlYXJjaCByZXN1bHRzXG4gICAgaWYgKHByb3BzLnByb2plY3RTZWFyY2hSZXN1bHRzID09PSBudWxsKSB7XG4gICAgICAvLyBzdGlsbCBsb2FkaW5nLCBzaG93IGxvYWRpbmcgZGlzcGxheVxuICAgICAgcmV0dXJuIDxUZXh0PkVudGVyIGEgY29uc3RydWN0aW9uIHByb2plY3QgbmFtZSB0byBzdGFydDwvVGV4dD47XG4gICAgfSBlbHNlIGlmIChwcm9wcy5wcm9qZWN0U2VhcmNoUmVzdWx0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIC8vIG5vIHByb2plY3RzLCBzaG93IGRlZmF1bHQgc3RhdGVcbiAgICAgIHJldHVybiA8VGV4dD5ObyByZXN1bHRzIGZvdW5kLCB0cnkgYWdhaW4uPC9UZXh0PjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRhYmxlIGJvcmRlcmVkPXt0cnVlfT5cbiAgICAgICAgICA8VGFibGVIZWFkPlxuICAgICAgICAgICAgPFRhYmxlUm93PlxuICAgICAgICAgICAgICA8VGFibGVIZWFkZXI+UHJvamVjdCBSZWNvcmQ8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICA8VGFibGVIZWFkZXI+QXNhbmEgSWQ8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgICA8VGFibGVIZWFkZXI+QXNzaWduPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgICAgPC9UYWJsZUhlYWQ+XG4gICAgICAgICAgPFRhYmxlQm9keT5cbiAgICAgICAgICAgIHtwcm9wcy5wcm9qZWN0U2VhcmNoUmVzdWx0cyAmJlxuICAgICAgICAgICAgICBwcm9wcy5wcm9qZWN0U2VhcmNoUmVzdWx0cy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8UHJvamVjdFNlYXJjaFJlc3VsdHNSb3cgaXRlbT17aXRlbX0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9UYWJsZUJvZHk+XG4gICAgICAgIDwvVGFibGU+XG4gICAgICApO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPEZvcm0gb25TdWJtaXQ9e3NlYXJjaEZvclByb2plY3RzfSBwcmV2ZW50RGVmYXVsdD17dHJ1ZX0+XG4gICAgICAgIDxGbGV4IGRpcmVjdGlvbj17J3Jvdyd9IGdhcD17J2V4dHJhLXNtYWxsJ30+XG4gICAgICAgICAgPElucHV0XG4gICAgICAgICAgICBuYW1lPVwic2VhcmNoU3RyaW5nXCJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciBzZWFyY2hcIlxuICAgICAgICAgICAgcmVxdWlyZWQ9e3RydWV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8QnV0dG9uIHR5cGU9XCJzdWJtaXRcIiB2YXJpYW50PVwicHJpbWFyeVwiPlxuICAgICAgICAgICAgU2VhcmNoXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiB2YXJpYW50PVwic2Vjb25kYXJ5XCIgb25DbGljaz17cHJvcHMuaGlkZUFzc2lnbkZvcm19PlxuICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgIDwvRmxleD5cbiAgICAgIDwvRm9ybT5cbiAgICAgIDxQcm9qZWN0U2VhcmNoUmVzdWx0VGFibGUgey4uLnByb3BzfSAvPlxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IEFkZEFzc2lnbkJ1dHRvbnMgPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8QnV0dG9uUm93PlxuICAgICAgPEJ1dHRvblxuICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgb25DbGljaz17cHJvcHMuc2hvd0FkZFByb2plY3RGb3JtfVxuICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICA+XG4gICAgICAgIEFkZCBuZXcgY29uc3RydWN0aW9uIHByb2plY3RcbiAgICAgIDwvQnV0dG9uPlxuICAgICAgPEJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17cHJvcHMuc2hvd0Fzc2lnbm1lbnRGb3JtfVxuICAgICAgICB2YXJpYW50PVwicHJpbWFyeVwiXG4gICAgICA+XG4gICAgICAgIEFzc2lnbiBleGlzdGluZyBjb25zdHJ1Y3Rpb24gcHJvamVjdFxuICAgICAgPC9CdXR0b24+XG4gICAgPC9CdXR0b25Sb3c+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgQWRkTmV3RnJhbWUgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgW2FkZEZyYW1lU3RhdGUsIHNldEFkZEZyYW1lU3RhdGVdID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3QgW3Byb2plY3RTZWFyY2hSZXN1bHRzLCBzZXRQcm9qZWN0U2VhcmNoUmVzdWx0c10gPSB1c2VTdGF0ZShudWxsKTtcblxuICBjb25zdCBzaG93QWRkUHJvamVjdEZvcm0gPSAoKSA9PiBzZXRBZGRGcmFtZVN0YXRlKDEpO1xuXG4gIGNvbnN0IGhpZGVBZGRQcm9qZWN0Rm9ybSA9ICgpID0+IHNldEFkZEZyYW1lU3RhdGUoMCk7XG5cbiAgY29uc3Qgc2hvd0Fzc2lnbm1lbnRGb3JtID0gKCkgPT4gc2V0QWRkRnJhbWVTdGF0ZSgyKTtcblxuICBjb25zdCBoaWRlQXNzaWduRm9ybSA9ICgpID0+IHNldEFkZEZyYW1lU3RhdGUoMCk7XG5cbiAgcHJvcHMuc2hvd0FkZFByb2plY3RGb3JtID0gc2hvd0FkZFByb2plY3RGb3JtO1xuICBwcm9wcy5oaWRlQWRkUHJvamVjdEZvcm0gPSBoaWRlQWRkUHJvamVjdEZvcm07XG4gIHByb3BzLnNob3dBc3NpZ25tZW50Rm9ybSA9IHNob3dBc3NpZ25tZW50Rm9ybTtcbiAgcHJvcHMuaGlkZUFzc2lnbkZvcm0gPSBoaWRlQXNzaWduRm9ybTtcbiAgcHJvcHMucHJvamVjdFNlYXJjaFJlc3VsdHMgPSBwcm9qZWN0U2VhcmNoUmVzdWx0cztcbiAgcHJvcHMuc2V0UHJvamVjdFNlYXJjaFJlc3VsdHMgPSBzZXRQcm9qZWN0U2VhcmNoUmVzdWx0cztcblxuICBzd2l0Y2ggKGFkZEZyYW1lU3RhdGUpIHtcbiAgICBjYXNlIDA6XG4gICAgICByZXR1cm4gPEFkZEFzc2lnbkJ1dHRvbnMgey4uLnByb3BzfSAvPjtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gPEFkZFByb2plY3RGb3JtIHsuLi5wcm9wc30gLz47XG4gICAgY2FzZSAyOlxuICAgICAgcmV0dXJuIDxBc3NpZ25tZW50Rm9ybSB7Li4ucHJvcHN9IC8+O1xuICB9XG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICBGb3JtLFxuICBGbGV4LFxuICBCdXR0b25Sb3csXG4gIEJ1dHRvbixcbiAgVGFnLFxuICBUYWJsZSxcbiAgVGFibGVIZWFkLFxuICBUYWJsZUhlYWRlcixcbiAgVGFibGVCb2R5LFxuICBUYWJsZVJvdyxcbiAgVGFibGVDZWxsLFxuICBMb2FkaW5nU3Bpbm5lcixcbiAgTGluayxcbiAgU2VsZWN0LFxuICBFbXB0eVN0YXRlLFxufSBmcm9tIFwiQGh1YnNwb3QvdWktZXh0ZW5zaW9uc1wiO1xuXG4vLyBDb21wb25lbnQgZm9yIHRoZSB0YWJsZSBvZiBjdXJyZW50bHkgYXNzaWduZWQgY29uc3RydWN0aW9uIHByb2plY3RzXG5leHBvcnQgY29uc3QgQXNzaWduZWRQcm9qZWN0VGFibGUgPSAoeyBwcm9qZWN0RGV0YWlscywgY2hpbGRyZW4gfSkgPT4ge1xuICBpZiAocHJvamVjdERldGFpbHMgPT09IG51bGwpIHtcbiAgICByZXR1cm4gPExvYWRpbmdTcGlubmVyIGxhYmVsPVwiTG9hZGluZyBDb25zdHJ1Y3Rpb24gUHJvamVjdHMuLi5cIiBzaG93TGFiZWw9e3RydWV9IC8+O1xuICB9IGVsc2UgaWYgKHByb2plY3REZXRhaWxzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAoXG4gICAgICA8RW1wdHlTdGF0ZVxuICAgICAgICB0aXRsZT1cIk5vIGFzc2lnbmVkIGNvbnN0cnVjdGlvbiBwcm9qZWN0c1wiXG4gICAgICAgIGxheW91dD0ndmVydGljYWwnXG4gICAgICAgIHJldmVyc2VPcmRlcj17dHJ1ZX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFRhYmxlIGJvcmRlcmVkPXt0cnVlfT5cbiAgICAgICAgPFRhYmxlSGVhZD5cbiAgICAgICAgICA8VGFibGVSb3c+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXIgd2lkdGg9ezE1MH0+UHJvamVjdCBOYW1lPC9UYWJsZUhlYWRlcj5cbiAgICAgICAgICAgIDxUYWJsZUhlYWRlciB3aWR0aD17MTUwfT5TZWUgTW9yZTwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXIgd2lkdGg9ezI1MH0+QXNhbmEgSUQ8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgICAgPFRhYmxlSGVhZGVyIHdpZHRoPXsxNTB9PkJ1ZGdldDwvVGFibGVIZWFkZXI+XG4gICAgICAgICAgICA8VGFibGVIZWFkZXI+UHJvamVjdCBTdGF0dXM8L1RhYmxlSGVhZGVyPlxuICAgICAgICAgIDwvVGFibGVSb3c+XG4gICAgICAgIDwvVGFibGVIZWFkPlxuICAgICAgICA8VGFibGVCb2R5PntjaGlsZHJlbn08L1RhYmxlQm9keT5cbiAgICAgIDwvVGFibGU+XG4gICAgKTtcbiAgfVxufTtcbi8vIENyZWF0ZSBhIG5ldyBjb21wb25lbnQgZm9yIGEgcm93IG9mIHByb2plY3QgZGV0YWlscywgdXNlZCBmb3IgdGhlIHByb2plY3RzIGFscmVhZHkgYXNzb2NpYXRlZCB0byB0aGUgY29tcGFueVxuZXhwb3J0IGNvbnN0IFByb2plY3REZXRhaWxzUm93ID0gKHsgaXRlbSwgcHJvcHMgfSkgPT4ge1xuICAvLyBTaG93L2hpZGUgZm9ybSB0byB1cGRhdGUgc3RhdHVzIGZvciB0aGlzIHNwZWNpZmljIHByb2plY3RcbiAgY29uc3QgW2lzU3RhdHVzRm9ybVZpc2libGUsIHNldElzU3RhdHVzRm9ybVZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHNob3dTdGF0dXNGb3JtID0gKCkgPT4ge1xuICAgIHNldENoYW5nZVN0YXR1c1ZhbHVlKGl0ZW0uc3RhdHVzID8gaXRlbS5zdGF0dXMudmFsdWUgOiBcImFzc2lnbmVkXCIpO1xuICAgIHNldElzU3RhdHVzRm9ybVZpc2libGUodHJ1ZSk7XG4gIH07XG4gIC8vIEhpZGUgdGhlIGZvcm1cbiAgY29uc3QgaGlkZVN0YXR1c0Zvcm0gPSAoKSA9PiB7XG4gICAgc2V0SXNTdGF0dXNGb3JtVmlzaWJsZShmYWxzZSk7XG4gIH07XG4gIC8vIERpc2FibGUgdGhlIGZvcm0gd2hpbGUgaXQncyBwcm9jZXNzaW5nXG4gIGNvbnN0IFtkaXNhYmxlZFdoaWxlV29ya2luZywgc2V0RGlzYWJsZWRXaGlsZVdvcmtpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICAvLyBUcmFjayB0aGUgdmFsdWUgb2YgdGhlIHN0YXR1cyBmb3JtIGZpZWxkIGZvciB1cGRhdGluZyBzdGF0dXNcbiAgY29uc3QgW2NoYW5nZVN0YXR1c1ZhbHVlLCBzZXRDaGFuZ2VTdGF0dXNWYWx1ZV0gPSB1c2VTdGF0ZShcbiAgICBpdGVtLnN0YXR1cyA/IGl0ZW0uc3RhdHVzLnZhbHVlIDogXCJhc3NpZ25lZFwiXG4gICk7XG4gIC8vIEJ1aWxkIHRoZSBsaW5rIHRvIHRoZSByZWNvcmQgcGFnZSBmb3IgdGhlIHByb2plY3RcbiAgbGV0IHJlY29yZFVybCA9IGBodHRwczovL2FwcC5odWJzcG90LmNvbS9jb250YWN0cy8ke3Byb3BzLnBvcnRhbElkfS9yZWNvcmQvJHtwcm9wcy5jdXN0b21PYmplY3RJZH0vJHtpdGVtLmhzX29iamVjdF9pZH0vdmlldy8xYDtcblxuICAvLyBTdWJjb21wb25lbnQgZm9yIHRoZSBzdGF0dXMgdGFnIHRvIGhhbmRsZSB0aGUgdmFyaWFudCB1c2VkIGJhc2VkIG9uIHN0YXR1cyBsYWJlbFxuICAvLyBXaGVuIHRoZSBUYWcgaXMgY2xpY2tlZCwgaXQgc3dpdGNoZXMgdG8gc2hvd2luZyB0aGUgZm9ybSBhbmQgc2F2ZS9jYW5jZWwvcmVtb3ZlIGJ1dHRvbnMgdG8gY2hhbmdlIHRoZSBzdGF0dXNcbiAgY29uc3QgUHJvamVjdFN0YXR1cyA9ICh7IHN0YXR1c0xhYmVsIH0pID0+IHtcbiAgICBsZXQgdGFnVmFyaWFudCA9IFwiZGVmYXVsdFwiO1xuXG4gICAgaWYgKHN0YXR1c0xhYmVsID09PSBcIlBsYW5uaW5nIEluaXRpYXRlZFwiIHx8IHN0YXR1c0xhYmVsID09PSBcIkFzc2lnbmVkXCIpIHtcbiAgICAgIHRhZ1ZhcmlhbnQgPSBcImVycm9yXCI7XG4gICAgfSBlbHNlIGlmIChzdGF0dXNMYWJlbCA9PT0gXCJJbiBQcm9ncmVzc1wiKSB7XG4gICAgICB0YWdWYXJpYW50ID0gXCJ3YXJuaW5nXCI7XG4gICAgfSBlbHNlIGlmIChzdGF0dXNMYWJlbCA9PT0gXCJDb21wbGV0ZWRcIikge1xuICAgICAgdGFnVmFyaWFudCA9IFwic3VjY2Vzc1wiO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8VGFnIHZhcmlhbnQ9e3RhZ1ZhcmlhbnR9IG9uQ2xpY2s9e3Nob3dTdGF0dXNGb3JtfT5cbiAgICAgICAge3N0YXR1c0xhYmVsfVxuICAgICAgPC9UYWc+XG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGVzIHRoZSBTYXZlIGJ1dHRvbiBjbGljayBmb3IgdXBkYXRpbmcgc3RhdHVzIGZyb20gaXRzIG93biBjb21wb25lbnRcbiAgLy8gVGhpcyBsZXRzIHVzIGdldCB0aGUgcHJvamVjdCByZWNvcmRJZCB3aXRob3V0IHVzaW5nIGFuIGlucHV0IGZpZWxkIGZvciBpdFxuICBjb25zdCBoYW5kbGVTdWJtaXRDbGljayA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImNsaWNrZWQgc2F2ZSwgc3RhdHVzIGlzOlwiLCBjaGFuZ2VTdGF0dXNWYWx1ZSk7XG4gICAgc2V0RGlzYWJsZWRXaGlsZVdvcmtpbmcodHJ1ZSk7XG4gICAgcHJvcHMudXBkYXRlUHJvamVjdFN0YXR1cyhcbiAgICAgIGl0ZW0uaHNfb2JqZWN0X2lkLFxuICAgICAgY2hhbmdlU3RhdHVzVmFsdWUsXG4gICAgICByZXNldFJvd1N0YXRlXG4gICAgKTtcbiAgfTtcblxuICAvLyBIYW5kbGVzIHRoZSByZW1vdmUgYnV0dG9uIGNsaWNrLCBkZWxldGVzIHRoZSBhc3NvY2lhdGlvbiBhbmQgcmVzZXRzIHN0YXR1cyB0byBhdmFpbGFibGVcbiAgLy8gVGhpcyBsZXRzIHVzIGdldCB0aGUgcHJvamVjdCByZWNvcmRJZCB3aXRob3V0IHVzaW5nIGFuIGlucHV0IGZpZWxkIGZvciBpdFxuICBjb25zdCBzZW5kUHJvamVjdFJlbW92ZSA9ICgpID0+IHtcbiAgICBzZXREaXNhYmxlZFdoaWxlV29ya2luZyh0cnVlKTtcbiAgICBwcm9wcy5yZW1vdmVQcm9qZWN0ZnJvbUNvbXBhbnkoaXRlbS5oc19vYmplY3RfaWQsIHJlc2V0Um93U3RhdGUpO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0Um93U3RhdGUgPSAoKSA9PiB7XG4gICAgc2V0RGlzYWJsZWRXaGlsZVdvcmtpbmcoZmFsc2UpO1xuICAgIGhpZGVTdGF0dXNGb3JtKCk7XG4gIH07XG4gIC8vIFJlbmRlcnMgdGhlIHJvdyBpbiB0aGUgbWFpbiB0YWJsZVxuICAvLyBUaGUgc3RhdHVzIGNlbGwgc2hvd3MgYSB0YWcgY29tcG9uZW50IGJ5IGRlZmF1bHRcbiAgLy8gb25jbGljayBpdCBzd2l0Y2hlcyB0byBhIGZvcm0gdGhhdCBsZXRzIHlvdSB1cGRhdGUgdGhlIHN0YXR1cyBmb3IgdGhlIHJlY29yZFxuICByZXR1cm4gKFxuICAgIDxUYWJsZVJvdyBrZXk9e2l0ZW0uaHNfb2JqZWN0X2lkfT5cbiAgICAgIDxUYWJsZUNlbGw+e2l0ZW0ucHJvamVjdF9uYW1lfTwvVGFibGVDZWxsPlxuICAgICAgPFRhYmxlQ2VsbD5cbiAgICAgICAgPExpbmsgaHJlZj17cmVjb3JkVXJsfT5WaWV3IFByb2plY3QgUmVjb3JkPC9MaW5rPlxuICAgICAgPC9UYWJsZUNlbGw+XG4gICAgICA8VGFibGVDZWxsPlxuICAgICAgICA8TGluayBocmVmPVwiaHR0cHM6Ly9hcHAuYXNhbmEuY29tLzAvcHJvZmlsZS8xMjA1MTYwNjM4NTYyOTU0XCI+PC9MaW5rPlxuICAgICAgICB7aXRlbS5hc2FuYV9pZH1cbiAgICAgIDwvVGFibGVDZWxsPlxuICAgICAgPFRhYmxlQ2VsbD57aXRlbS5idWRnZXR9PC9UYWJsZUNlbGw+XG4gICAgICA8VGFibGVDZWxsPlxuICAgICAgICB7IWlzU3RhdHVzRm9ybVZpc2libGUgPyAoXG4gICAgICAgICAgaXRlbS5zdGF0dXMgPyAoXG4gICAgICAgICAgICA8UHJvamVjdFN0YXR1cyBzdGF0dXNMYWJlbD17aXRlbS5zdGF0dXMubGFiZWx9IC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxQcm9qZWN0U3RhdHVzIHN0YXR1c0xhYmVsPVwiTm9uZVwiIC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8Rm9ybSBwcmV2ZW50RGVmYXVsdD17dHJ1ZX0+XG4gICAgICAgICAgICAgIDxGbGV4IGRpcmVjdGlvbj17XCJyb3dcIn0gZGlzdGFuY2U9e1wiZXh0cmEtc21hbGxcIn0+XG4gICAgICAgICAgICAgICAgPFNlbGVjdFxuICAgICAgICAgICAgICAgICAgbmFtZT1cIm5ld1N0YXR1c1wiXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWRXaGlsZVdvcmtpbmd9XG4gICAgICAgICAgICAgICAgICBvcHRpb25zPXtwcm9wcy5zdGF0dXNPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NoYW5nZVN0YXR1c1ZhbHVlfVxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q2hhbmdlU3RhdHVzVmFsdWUoZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPEJ1dHRvblJvdz5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cInByaW1hcnlcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdWJtaXRDbGlja31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkV2hpbGVXb3JraW5nfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBTYXZlXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGlkZVN0YXR1c0Zvcm19XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZFdoaWxlV29ya2luZ31cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQ2FuY2VsXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImRlc3RydWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17c2VuZFByb2plY3RSZW1vdmV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZFdoaWxlV29ya2luZ31cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgUmVtb3ZlXG4gICAgICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L0J1dHRvblJvdz5cbiAgICAgICAgICAgICAgPC9GbGV4PlxuICAgICAgICAgICAgPC9Gb3JtPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9UYWJsZUNlbGw+XG4gICAgPC9UYWJsZVJvdz5cbiAgKTtcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZsZXgsIGh1YnNwb3QgfSBmcm9tICdAaHVic3BvdC91aS1leHRlbnNpb25zJztcblxuLy9DdXN0b20gY29tcG9uZW50c1xuaW1wb3J0IHsgQWRkTmV3RnJhbWUgfSBmcm9tICcuL2NvbXBvbmVudHMvYWRkTmV3Q29tcG9uZW50cyc7XG5pbXBvcnQge1xuICBBc3NpZ25lZFByb2plY3RUYWJsZSxcbiAgUHJvamVjdERldGFpbHNSb3csXG59IGZyb20gJy4vY29tcG9uZW50cy9hc3NpZ25lZFByb2plY3RUYWJsZSc7XG5cbi8vIFRoZSBJRCBvZiB0aGUgY3VzdG9tIG9iamVjdCwgQ29uc3RydWN0aW9uIFByb2plY3QsIHVzZWQgZm9yIHJlY29yZCBsaW5rc1xuLy8gZGV2IHNhbmRib3ggPSAyLTE2OTkwODYwXG4vLyB1aWUgZGVtbyA9IDItMTcwNDI2MjlcbmNvbnN0IGN1c3RvbU9iamVjdElkID0gJzItMTcwNDI2MjknO1xuXG4vLyBEZWZpbmUgdGhlIGV4dGVuc2lvbiB0byBiZSBydW4gd2l0aGluIHRoZSBIdWJzcG90IENSTVxuaHVic3BvdC5leHRlbmQoKHsgY29udGV4dCwgcnVuU2VydmVybGVzc0Z1bmN0aW9uLCBhY3Rpb25zIH0pID0+IChcbiAgPEV4dGVuc2lvblxuICAgIGNvbnRleHQ9e2NvbnRleHR9XG4gICAgcnVuU2VydmVybGVzcz17cnVuU2VydmVybGVzc0Z1bmN0aW9ufVxuICAgIHNlbmRBbGVydD17YWN0aW9ucy5hZGRBbGVydH1cbiAgICBmZXRjaFByb3BlcnRpZXM9e2FjdGlvbnMuZmV0Y2hDcm1PYmplY3RQcm9wZXJ0aWVzfVxuICAvPlxuKSk7XG4vLyBEZWZpbmUgdGhlIEV4dGVuc2lvbiBjb21wb25lbnQsIHRha2luZyBpbiBydW5TZXJ2ZXJsZXNzLCBjb250ZXh0LCAmIHNlbmRBbGVydCBhcyBwcm9wc1xuY29uc3QgRXh0ZW5zaW9uID0gKHsgY29udGV4dCwgcnVuU2VydmVybGVzcywgc2VuZEFsZXJ0LCBmZXRjaFByb3BlcnRpZXMgfSkgPT4ge1xuICAvLyBIb2xkcyB0aGUgcmVjb3JkIElEIG9mIHRoZSBjdXN0b20gb2JqZWN0IGJlaW5nIHZpZXdlZCwgdXNlZCB0byBmZXRjaCBhc3NvY2lhdGlvbnMgYW5kIGFzc29jaWF0ZSBuZXcgcHJvamVjdHNcbiAgY29uc3QgW29iamVjdElkLCBzZXRPYmplY3RJZF0gPSB1c2VTdGF0ZShudWxsKTtcbiAgLy8gSG9sZHMgdGhlIEh1YiBJRCBmb3IgcmVjb3JkIGxpbmtzXG4gIGNvbnN0IHBvcnRhbElkID0gY29udGV4dC5wb3J0YWwuaWQ7XG5cbiAgLy8gQ29sbGVjdGlvbnMgZm9yIGRhdGEgZGlzcGxheWVkIGluIHRhYmxlczpcbiAgLy8gUHJvamVjdHMgY3VycmVudGx5IGFzc29jaWF0ZWQgd2l0aCB0aGUgdmlld2VkIHJlY29yZFxuICBjb25zdCBbcHJvamVjdERldGFpbHMsIHNldFByb2plY3REZXRhaWxzXSA9IHVzZVN0YXRlKG51bGwpO1xuXG4gIC8vIE9wdGlvbnMgZm9yIHRoZSBzZWxlY3QgY29tcG9uZW50IHVzZWQgZm9yIHRoZSBzdGF0dXMgZmllbGQgaW4gdGhlIGZvcm1zXG4gIC8vIFdlIGRvbid0IGluY2x1ZGUgXCJhc3NpZ25lZFwiIHNpbmNlIHRoYXQncyBvbmx5IHVzZWQgd2hlbiByZW1vdmluZyBhIHByb2plY3QgYW5kIGhhbmRsZWQgc2VwYXJhdGVseVxuICBjb25zdCBzdGF0dXNPcHRpb25zID0gW1xuICAgIHsgbGFiZWw6ICdBc3NpZ25lZCcsIHZhbHVlOiBcImFzc2lnbmVkXCIgfSxcbiAgICB7IGxhYmVsOiAnUGxhbm5pbmcgSW5pdGlhdGVkJywgdmFsdWU6IFwicGxhbm5pbmdcIiB9LFxuICAgIHsgbGFiZWw6ICdJbiBQcm9ncmVzcycsIHZhbHVlOiBcIkluIFByb2dyZXNzXCIgfSxcbiAgICB7IGxhYmVsOiAnQ29tcGxldGVkJywgdmFsdWU6IFwiQ29tcGxldGVkXCIgfSxcbiAgXTtcblxuICAvLyBDYWxscyB0aGUgc2VydmVybGVzcyBmdW5jdGlvbiB0byBnZXQgYXNzb2NpYXRlZCBjb25zdHJ1Y3Rpb24gcHJvamVjdCByZWNvcmQgZm9yIHRoZSBjdXJyZW50bHkgdmlld2VkIHByb2plY3RcbiAgY29uc3QgZ2V0QXNzb2NpYXRlZFByb2plY3RzID0gKGhzX29iamVjdF9pZCkgPT57XG4gICAgcnVuU2VydmVybGVzcyh7XG4gICAgICBuYW1lOiAnZ2V0QXNzb2NpYXRlZFByb2plY3RzJyxcbiAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgaHNfb2JqZWN0X2lkOiBoc19vYmplY3RfaWQsXG4gICAgICB9LFxuICAgIH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdncmFwaHFsIHJlc3A6JywgcmVzcC5yZXNwb25zZSk7XG4gICAgICBsZXQgdGVtcFByb2plY3REZXRhaWxzID1cbiAgICAgICAgcmVzcC5yZXNwb25zZS5kYXRhLkNSTS5jb21wYW55LmFzc29jaWF0aW9uc1xuICAgICAgICAgIC5wX2NvbnN0cnVjdGlvbl9wcm9qZWN0c19jb2xsZWN0aW9uX19jb25zdHJ1Y3Rpb25fcHJvamVjdF90b19jb21wYW55XG4gICAgICAgICAgLml0ZW1zO1xuICAgICAgdGVtcFByb2plY3REZXRhaWxzLnNvcnQoIChhLGIpID0+IGEucHJvamVjdF9uYW1lLmxvY2FsZUNvbXBhcmUoYi5wcm9qZWN0X25hbWUpKTtcbiAgICAgIGNvbnNvbGUubG9nKHRlbXBQcm9qZWN0RGV0YWlscyk7XG4gICAgICBzZXRQcm9qZWN0RGV0YWlscyh0ZW1wUHJvamVjdERldGFpbHMpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIENhbGxzIHRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIHRvIGNyZWF0ZSBhIG5ldyBwcm9qZWN0IHJlY29yZCBhbmQgYXNzb2NpYXRlIGl0IHdpdGggdGhlIGNvbXBhbnlcbiAgY29uc3QgY3JlYXRlTmV3UHJvamVjdCA9IChmb3JtRGV0YWlscykgPT4ge1xuICAgIGxldCBmb3JtRmllbGRzID0gZm9ybURldGFpbHMudGFyZ2V0VmFsdWU7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIGFzYW5hIElkIGlzIGEgbnVtYmVyLCBza2lwIHRoZSBzZXJ2ZXJsZXNzIGNhbGwgaWYgaXQncyBub3RcbiAgICBpZiAoIU51bWJlcihmb3JtRmllbGRzLmFzYW5hX2lkKSkge1xuICAgICAgc2VuZEFsZXJ0KHsgbWVzc2FnZTogXCJBc2FuYSBJZCBtdXN0IGJlIGEgbnVtYmVyXCIgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFNlbmQgdGhlIGZvcm0gZGV0YWlscyB0byB0aGUgc2VydmVybGVzcyBmdW5jdGlvbiB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBwcm9qZWN0IHJlY29yZFxuICAgIHJ1blNlcnZlcmxlc3Moe1xuICAgICAgbmFtZTogJ2NyZWF0ZU5ld1Byb2plY3QnLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBjb21wYW55SWQ6IG9iamVjdElkLFxuICAgICAgICBwcm9qZWN0X25hbWU6IGZvcm1GaWVsZHMucHJvamVjdF9uYW1lLFxuICAgICAgICBhc2FuYV9pZDogZm9ybUZpZWxkcy5hc2FuYV9pZCxcbiAgICAgICAgYnVkZ2V0OiBmb3JtRmllbGRzLmJ1ZGdldCxcbiAgICAgICAgcHJvamVjdF9zdGF0dXM6IGZvcm1GaWVsZHMucHJvamVjdF9zdGF0dXNcbiAgICAgIH1cbiAgICB9KS50aGVuKChyZXNwKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXNwLnJlc3BvbnNlKTtcbiAgICAgIGlmKFxuICAgICAgICByZXNwLnJlc3BvbnNlICYmXG4gICAgICAgIHJlc3AucmVzcG9uc2Uuc3RhdHVzICYmXG4gICAgICAgIHJlc3AucmVzcG9uc2Uuc3RhdHVzID49IDQwMFxuICAgICAgKSB7XG4gICAgICAgIHNlbmRBbGVydCh7IG1lc3NhZ2U6IFwiU29tZXRoaW5nIHdlbnQgd3JvbmcuIFBsZWFzZSB0cnkgYWdhaW4uXCIgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZW5kQWxlcnQoeyBtZXNzYWdlOiBcIkNvbnN0cnVjdGlvbiBQcm9qZWN0IGFkZGVkIVwiIH0pO1xuICAgICAgfVxuICAgICAgLy8gUmVidWlsZCB0aGUgdGFibGUgdG8gaW5jbHVkZSB0aGUgbmV3IHByb2plY3RcbiAgICAgIGdldEFzc29jaWF0ZWRQcm9qZWN0cyhvYmplY3RJZCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ2FsbHMgdGhlIHNlcnZlcmxlc3MgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGF0dXMgcHJvcGVydHkgb2YgYSBwcm9qZWN0LCBhZnRlciBjaG9vc2luZyBhIG5ldyBzdGF0dXMgaW4gdGhlIHRhYmxlIHJvd1xuICBjb25zdCB1cGRhdGVQcm9qZWN0U3RhdHVzID0gKHJlY29yZElkLCBuZXdTdGF0dXMsIGNhbGxiYWNrKSA9PiB7XG4gICAgLy8gY2FsbCB0aGUgc2VydmVybGVzcyBmdW5jdGlvbiB0byB1cGRhdGUgdGhlIHN0YXR1cyBvZiB0aGUgcmVjb3JkXG4gICAgcnVuU2VydmVybGVzcyh7XG4gICAgICBuYW1lOiAndXBkYXRlUHJvamVjdFN0YXR1cycsXG4gICAgICBwYXJhbWV0ZXJzOiB7XG4gICAgICAgIHByb2plY3Rfc3RhdHVzOiBuZXdTdGF0dXMsXG4gICAgICAgIHByb2plY3RSZWNvcmRJZDogcmVjb3JkSWQsXG4gICAgICB9LFxuICAgIH0pLnRoZW4oKHJlc3ApID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGUgcmVzcG9uc2U6JywgcmVzcCk7XG4gICAgICBzZW5kQWxlcnQoeyBtZXNzYWdlOiBcIlByb2plY3Qgc3RhdHVzIHVwZGF0ZWRcIiB9KTtcbiAgICAgIGdldEFzc29jaWF0ZWRQcm9qZWN0cyhvYmplY3RJZCk7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVByb2plY3Rmcm9tQ29tcGFueSA9IChyZWNvcmRJZCwgY2FsbGJhY2spID0+IHtcbiAgICAvLyBDYWxsIHRoZSBzZXJ2ZXJsZXNzIGZ1bmN0aW9uIHRvIG1ha2UgdGhlIDIgQVBJIHJlcXVlc3RzXG4gICAgcnVuU2VydmVybGVzcyh7XG4gICAgICBuYW1lOiAncmVtb3ZlUHJvamVjdEZyb21Db21wYW55JyxcbiAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgcHJvamVjdFJlY29yZElkOiByZWNvcmRJZCxcbiAgICAgICAgY29tcGFueUlkOiBvYmplY3RJZCxcbiAgICAgIH0sXG4gICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ3JlbW92ZSByZXNwb25zZScsIHJlc3ApO1xuICAgICAgc2VuZEFsZXJ0KHsgbWVzc2FnZTogXCJDb25zdHJ1Y3Rpb24gcHJvamVjdCByZW1vdmVkIGZyb20gY29tcGFueS5cIiB9KTtcbiAgICAgIGdldEFzc29jaWF0ZWRBc3NldHMob2JqZWN0SWQpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgfTtcbiAgLy8gQ2FsbHMgdGhlIHNlcnZlcmxlc3MgZnVuY3Rpb24gdG8gYXNzaWduIGFuIGV4aXN0aW5nIHByb2plY3QgdG8gdGhlIGNvbXBhbnlcbiAgLy8gQXNzb2NpYXRlcyB0aGUgcHJvamVjdCByZWNvcmQgdG8gdGhlIGNvbXBhbnkgYW5kIHNldHMgdGhlIHByb2plY3QncyBzdGF0dXMgdG8gXCJwbGFubmluZ1wiXG4gIGNvbnN0IGFzc2lnbkFuZFVwZGF0ZVN0YXR1cyA9IChwcm9qZWN0SWQsIHNldFN0YXR1cykgPT4ge1xuICAgIGNvbnNvbGUubG9nKHByb2plY3RJZCwgc2V0U3RhdHVzLCBvYmplY3RJZCk7XG5cbiAgICBydW5TZXJ2ZXJsZXNzKHtcbiAgICAgIG5hbWU6ICdhc3NpZ25BbmRVcGRhdGVTdGF0dXMnLFxuICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICBwcm9qZWN0UmVjb3JkSWQ6IHByb2plY3RJZCxcbiAgICAgICAgcHJvamVjdF9zdGF0dXM6IHNldFN0YXR1cyxcbiAgICAgICAgY29tcGFueUlkOiBvYmplY3RJZCxcbiAgICAgIH0sXG4gICAgfSkudGhlbigocmVzcCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coJ2Fzc2lnbiBhbmQgdXBkYXRlIHJlc3BvbnNlJywgcmVzcCk7XG4gICAgICBzZW5kQWxlcnQoeyBtZXNzYWdlOiBcIkNvbnN0cnVjdGlvbiBwcm9qZWN0IGFzc2lnbmVkIHRvIGNvbXBhbnkhXCIgfSk7XG4gICAgICBnZXRBc3NvY2lhdGVkUHJvamVjdHMob2JqZWN0SWQpO1xuICAgIH0pO1xuICB9O1xuICAvLyBSdW5zIGF0IHN0YXJ0IHRvIGdldCB0aGUgaHNfb2JqZWN0X2lkIGFuZCBzZXRzIGl0IGZvciBvYmplY3RJZFxuICAvLyBSdW5zIGFmdGVyIG9iamVjdElkIGlzIHNldCB0byBjYWxsIGdldEFzc29jaWF0ZWRQcm9qZWN0cyAoaWYgaXQncyBub3QgYWxyZWFkeSBzZXQgZm9ybSB0aGUgZmlyc3QgcnVuKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwibWFpbiB1c2VlZmZlY3QgcmFuXCIpO1xuICAgIGlmICghb2JqZWN0SWQpIHtcbiAgICAgIGZldGNoUHJvcGVydGllcyhbXCJoc19vYmplY3RfaWRcIl0pLnRoZW4oKHByb3BlcnRpZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIG9iamVjdElkJyk7XG4gICAgICAgIGdldEFzc29jaWF0ZWRQcm9qZWN0cyhwcm9wZXJ0aWVzLmhzX29iamVjdF9pZCk7XG4gICAgICAgIHNldE9iamVjdElkKHByb3BlcnRpZXMuaHNfb2JqZWN0X2lkKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgW2ZldGNoUHJvcGVydGllc10pO1xuXG4gIGNvbnN0IGFkZE5ld1N0YXRlUHJvcHMgPSB7XG4gICAgY3VzdG9tT2JqZWN0SWQsXG4gICAgcG9ydGFsSWQsXG4gICAgc3RhdHVzT3B0aW9ucyxcbiAgICBjcmVhdGVOZXdQcm9qZWN0LFxuICAgIGFzc2lnbkFuZFVwZGF0ZVN0YXR1cyxcbiAgICBydW5TZXJ2ZXJsZXNzLFxuICB9O1xuXG4gIGNvbnN0IGFzc2lnbmVkUm93UHJvcHMgPSB7XG4gICAgcHJvamVjdERldGFpbHMsXG4gICAgcG9ydGFsSWQsXG4gICAgY3VzdG9tT2JqZWN0SWQsXG4gICAgc3RhdHVzT3B0aW9ucyxcbiAgICB1cGRhdGVQcm9qZWN0U3RhdHVzLFxuICAgIHJlbW92ZVByb2plY3Rmcm9tQ29tcGFueSxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxGbGV4IGdhcD1cIm1lZGl1bVwiIGRpcmVjdGlvbj1cImNvbHVtblwiPlxuICAgICAgPEFzc2lnbmVkUHJvamVjdFRhYmxlIHByb2plY3REZXRhaWxzPXtwcm9qZWN0RGV0YWlsc30+XG4gICAgICAgIHtwcm9qZWN0RGV0YWlscyAmJlxuICAgICAgICAgIHByb2plY3REZXRhaWxzLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgPFByb2plY3REZXRhaWxzUm93IGl0ZW09e2l0ZW19IHByb3BzPXthc3NpZ25lZFJvd1Byb3BzfSAvPlxuICAgICAgICAgICkpfVxuICAgICAgPC9Bc3NpZ25lZFByb2plY3RUYWJsZT5cbiAgICAgIDxBZGROZXdGcmFtZSB7Li4uYWRkTmV3U3RhdGVQcm9wc30gLz5cbiAgICA8L0ZsZXg+XG4gICk7XG59O1xuIl0sIm5hbWVzIjpbImlzVmFsaWRFbGVtZW50IiwiY3JlYXRlUm9vdCIsImNyZWF0ZVJlbW90ZVJlYWN0Q29tcG9uZW50IiwiU2VydmVybGVzc0V4ZWN1dGlvblN0YXR1cyIsIlJlYWN0IiwicHJvcHMiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCJdLCJtYXBwaW5ncyI6Ijs7QUFHTyxRQUFNLFVBQVU7QUFBQSxJQUNuQixRQUFRO0FBQUEsRUFDWjtBQUNBLFFBQU0sU0FBUyxJQUFJLFNBQVMsS0FBSyxPQUFPLEdBQUcsSUFBSTtBQUMvQyxXQUFTLE9BQU8sZ0JBQWdCO0FBQzVCLFdBQU8sT0FBTyxDQUFD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
