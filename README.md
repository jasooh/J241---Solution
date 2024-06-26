# J241 - Engineering Challenge Solution

This project aims to simulate bacterial growth on a dynamically resizable grid using React, while following biological rules. The application supports grids of up to 10,000 units in size and allows users to control the rate of bacterial division using the keyboard or mouse. Users can start, pause, and reset the simulation, place initial bacterial cells, and resize the grid dynamically. Additionally, the application provides detailed statistics on the ongoing simulation.

https://github.com/jasooh/J241---Solution/assets/124289381/63e65248-78fb-42f3-a028-4527cf0a6bcc

## Assumptions

**The following assumptions were made for the biological rules:**
1. Bacterial cells divide at fixed intervals (adjustable by the user).
2. Bacterial cells divide only if there is at least one adjacent empty cell in any of the 8 directions.
3. Bacterial cells divide themselves once per generation.
5. Bacterial cells do not die, and the simulation ends when the grid is fully occupied by bacterial cells.

## Performance Overview

*Metrics were recorded with a simulation on a 20x20 grid, and 3 initial bacterial cells that divide every 0.5s.* \
*Graphical performance was measured on a 4070 Ti and i7-14700k.*

**First Contentful Paint:** ~200ms \
**Average Frame Rate:** ~147 FPS

## Running Locally

1. Open a new file in your desired IDE.
2. Ensure **Node.js**, **npm**, and **git** are installed.
3. Clone the repository using `git clone https://github.com/jasooh/J241---Solution/`.
4. Navigate to the project directory using `cd J241---Solution`.
5. Install dependencies by running `npm install`

Once the following steps have been completed, run:

### `npm start`

This runs the app in the development mode.\
Open [http://localhost:3000] (http://localhost:3000) to view it in the browser.

**The page will reload if you make edits.\
You will also see any lint errors in the console.**

## Stack

This project was bootstrapped with [**Create React App**] (https://github.com/facebook/create-react-app), written with **TypeScript**, and styled with [**Tailwind CSS**] (https://tailwindui.com/)
