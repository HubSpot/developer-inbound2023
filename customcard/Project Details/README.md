# Project Details Card for Company Record

## Getting started

### Prerequisites
This guides assumes that you're already familiar with:
- The basics of React and JavaScript (or optionally Typescript)
- Using the HubSpot CLI for local development

1. Update your CLI to the latest version using `npm install -g @hubspot/cli@next`
2. Run `hs init` to initialize the HubSpot configuration file to connect the CLI to your HubSpot account.
3. Create a new project in your directory `hs project create`
4. Navigate into the new directory by running `cd <project-directory>`, then run `npm install` to load the dependencies required to start local development server.
5. To start local development, you'll use the `hs project dev command`
6. Changes made to configuration files, such as app.json and hsproject.json, require a manual upload before you can continue development. To upload those changes, first stop the local development server with q, then run `hs project upload`. After your changes are uploaded, run `hs project dev` again to restart the server.

### Asana Integration
*Note: Post-Inbound 2023, we will update Asana implementation instructions.

Fore more information or troubleshooting, please refer to the [CRM development tools](https://developers.hubspot.com/docs/platform/ui-extensions-overview) documentation