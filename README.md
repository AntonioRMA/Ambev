# Ambev QA Automation Project

## Introduction
This project was developed to meet the requirements of the technical aptitude test for the position of Senior QA Analyst at Ambev.

Using the Cypress framework and JavaScript, develop 3 automated E2E test scenarios for the frontend and 3 automated test scenarios for the API of the application indicated below.

Frontend: [Serverest Frontend](https://front.serverest.dev/)
Swagger API: [Serverest API](https://serverest.dev/)

## Technical Description
This project aimed to meet good practice requirements. An example is the organization of the JS file of the WEB tests, focusing on readability, self-documentation, quick understanding, and traceability by encapsulating functions with cohesive names corresponding to their functionalities.

In line with this reasoning, code reuse was applied using Cypress's `commands.js` resource, which aims to group frequently used functions in a single point of the project.

The `fixtures` resource was used for storing test parameters such as the target system URL and login parameters.

The test coverage includes regression testing with auto-management of test data, making the automation self-sufficient and capable of being executed multiple times without affecting previous tests.

For test development, the Faker library was used for dynamic generation of test data.

Performance strategies focused on login via the API with session registration in the browser, reducing test time by approximately 4 seconds in the applied tests. This feature was used in the scenarios:
- Register product
- Product details

However, login via the frontend was also covered in the scenario:
- Create new User

## Test Coverage and Strategy
As proposed, 3 test scenarios were conducted for both WEB and API.

The test strategy applied was end-to-end and integration regression testing, where the scenario that creates the data also utilizes it in the system to ensure its efficiency. For integration, data generated on the front-end was also used in REST requests to validate cohesion and integration between environments.

The tests were divided into: WEB and API.

The coverage of API and WEB tests includes user creation, login (administrator and user), product creation, and product consultation.

## Execution Instructions
### Environment:
- Node.js - version 12 or higher
- NPM - version 10.9.1 or higher
- Visual Studio Code - version 1.95.3 or higher

### GIT:
- Windows: `winget install Microsoft.Git`
- Linux: `sudo apt install git`
- macOS: `brew install git`

### Cypress: 
- `npm install cypress` or `yarn add cypress`

### Dependencies:
- Faker: `npm install faker`

### Getting the automation version from the repository:
- `git clone https://github.com/AntonioRMA/Ambev.git`
- `git pull origin master --allow-unrelated-histories`

### How to execute the automation:
1. Access the `Ambev` folder from the cloned repository
2. In your OS command line or VSCode, type: `npx cypress open`
3. Select the "E2E Testing" option
4. Choose a browser
5. Select `API.spec` to execute the API scenarios or `Frontend.spec` to execute the frontend scenarios

## Final Considerations
I am grateful for the opportunity to participate in this selection process and I hope that my implementation meets the selection criteria for the position.
