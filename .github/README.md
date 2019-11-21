# Allegiance

Find this up on the Internet at [allegiance17.com](https://www.allegiance17.com)

## Contributors

### Labs 17
| ![Luis Martinez](https://github.com/luiscmartinez.png) | ![Sean Doyle](https://github.com/sdoylelambda.png) | ![Connor Claxton](https://github.com/czclaxton.png) | ![Zachary Lasky](https://github.com/ZacharyLasky.png) | ![Brandon Gasing Dong](https://github.com/gasingdong.png)  |
| --------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| [@luiscmartinez](https://github.com/luiscmartinez) | [@sdoylelambda](https://github.com/sdoylelambda) | [@czclaxton](https://github.com/czclaxton) | [@ZacharyLasky](https://github.com/ZacharyLasky)   | [@gasingdong](https://github.com/gasingdong) |

### Labs 15
| ![Jarred Stanford](https://github.com/JarredStanford.png) | ![Derek Schwantner](https://github.com/DerekSchwantner.png) | ![Adam McKenney](https://github.com/DaftBeowulf.png) | ![Ang Xu](https://github.com/AngXuDev.png) | ![Dan O'Neill](https://github.com/danpatrickoneill.png)  |
| --------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- |
| [@JarredStanford](https://github.com/JarredStanford)      | [@DerekSchwantner](https://github.com/DerekSchwantner)      | [@DaftBeowulf](https://github.com/DaftBeowulf)       | [@AngXuDev](https://github.com/AngXuDev)   | [@danpatrickoneill](https://github.com/danpatrickoneill) |

## Project Overview

[Trello Board](https://trello.com/b/2L0hcHSc/labs-15-allegiance)

[Product Canvas](https://www.notion.so/Allegiance-2973bfcc17f34daa8f6786dd2ad2146d)

[UX Design files](https://www.figma.com/file/2IOo1GVvRaR7FkxpeU8xFq/%F0%9F%8F%80-Allegiance?node-id=0%3A12)

Allegiance is a sports social media platform that allows sports fans to to support their favorite teams, talk about sports, and interact with other fans.

### Key Features

- Users can view, join and create groups based on allegiances and location
- Users can choose and display their allegiances on profile page
- Groups feature posting, replying, likes, etc. for lively sports discussion
- Group privacy controls and moderation controls
- User-specific activity feed and notifications

## Tech Stack

### Front end built using:

#### React

🚫 Why did you choose this framework?

- React's virtual DOM in ReactJS makes for faster development and better user experience
- Designed for an app like ours featuring various configs of reusable user-specific components

#### Front end deployed to `Netlify`

#### [Back end](https://github.com/labs15-allegiance/backend/) built using:

#### 🚫 Node/Express

- Allows for quick building of scalable network applications
- REST APP is predictable, and doesn't expose database architecture to FE
- Very clean, DRY code using packages/middleware for validation, error handling, etc.

# APIs

## Auth0

Allegiance uses [Auth0](https://auth0.com/) for its authentication and API call processes. Please find Auth0 documentation [here](https://auth0.com/docs), along with the step by step tutorial used in this project [here](https://auth0.com/docs/quickstart/spa/react).

# Environment Variables

In order for the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    *  REACT_APP_DOMAIN - Can be found in Auth0 account info
    *  REACT_APP_CLIENTID - Can be found in Auth0 account info
    *  REACT_APP_AUDIENCE - Can be found in Auth0 account info
    *  REACT_APP_AUTHURL - URL variable for auth calls
    *  REACT_APP_BASEURL - Production server URL
    *  REACT_APP_LOCALURL - Local server URL
    *  REACT_APP_CLOUDINARY_APIKEY - Can be found in Cloudinary account info
    *  REACT_APP_CLOUDINARY_PRESET - Can be found in Cloudinary account info
    *  REACT_APP_CLOUDINARY_URL - Can be found in Cloudinary account info

## License

MIT © 2019 Allegiance |

# Installation Instructions

- Clone this repository
- **npm install** to install all required dependencies
- **npm run start** to run React app locally

# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./CODE_OF_CONDUCT.md). Please follow it in all your interactions with the project.

## Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Backend Documentation](https://github.com/labs15-allegiance/backend/blob/master/.github/README.md) for details on the backend of our project.
