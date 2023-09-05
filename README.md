# LCS Programming Exercise

## Summary

As part of the House of Representatives Software Engineer I assessment, this project utilizes House public data source to display information about members. All the implementations, such as UI development and data manipulation, are done in the frontend of the application using Typescript, React, and Bootstrap. In the following sections, I will be explaining all the changes, features, and how to navigate the app in development.

## Running the Application

No changes were made here. If .NET SDK and Yarn are installed locally, you can start the application by starting both components, the api and frontend, using two different shells where:

For api:
$ cd api
$ dotnet watch run

For frontend:
$ yarn install
$ yarn dev

Conversely, you can also start the app using docker container by running the command `docker compose up --build` at the root directory.
All the changes are visible from the UI at `http://localhost:3000/`.

## UI Development & Design

Initially, the app contains a list of members' name. I modified the UI such that the members and relevant information are displayed on a "card". This includes the members' Name, State, Party, Office Room, Number, and Committee Assignments. One feature I would like to highlight is that you can click on "See Committee Assignments", to see a modal component of assignment details. With data manipulation, I was able to map each assigned committees/subcommittees code (i.e. '@comcode' & '@subcomcode') to their respective committee names. Please reference the code in the file [`MemberCard.tsx`](https://github.com/ol64/house_assessment/blob/main/frontend/components/MemberCard.tsx).

The following are new features:

## Features

The following are new features:

### Search by Party, States, Name & Clear all filters:

Please see [`MainPage.tsx`](https://github.com/ol64/house_assessment/blob/main/frontend/components/MainPage.tsx) as reference. This component displays filter/sort options along with the list of member "cards". After fetching the data, the user can provide filter preferences to find specific members based on party, state(s), or name. Note that these filters can overlap. Furthermore, for convenience, there is an option to clear all filters, which returns the state of each filter to their initial state (either null or empty). This way, the filter elements are cleared from previous searches.

### Sort by Last Name, Party, or State with toggle feature to define sort order (descending or ascending):

Please see [`MainPage.tsx`](https://github.com/ol64/house_assessment/blob/main/frontend/components/MainPage.tsx) as reference. After fetching the list of members, the user can choose to sort the data by last name, party or state by utilizing the built-in Array.sort() method. The user can toggle between ascending or descending sorting order by clicking on the asc/desc image.

### Pagination:

Lastly, please see [`MemberList.tsx`](https://github.com/ol64/house_assessment/blob/main/frontend/components/MemberList.tsx) as reference. This component maps each member to a "card" component and implements pagination to break down the long list of members. The number of items per row to display is determined by the width of the window/page divided by the card's width minus one (due to styling/margin/padding). This creates a nice and even UI, which solely depends on the user's screen. I attached an event listener to execute the change whenever the user changes the page size.

For UI enhancement, I also made sure that each time the user modifies a filter, the app sets the page number back to one using useState hook in React.

## Future Ideas

Rather than performing data manipulation directly on the client side, I would like to migrate the XML file into a postgreSQL database, where I can create queries and backend APIs to search, filter and modify data. Additionally, I would like to save URL images of members as another attribute to the database rather than using blank headshots.

An idea I have involves using Docker container to initialize postgreSQL database and connect server to client to take advantage of its ability to communicate with each other.

In terms of the UI, I would like to create a route that brings the user to a single member page that has more descriptions and links relevant to individual members.
