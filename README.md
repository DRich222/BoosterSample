# Dan Rich Code Sample

## Intro
Thanks for your interest in my code sample!

This sample comes from a project called "Booster", which is a resume web platform.  The novelty of Booster is that it allows users to connect the work that they've done ("impacts") with the skills employers are looking for ("keywords").  

This code was written in Vue.JS and is a stand-alone slice of broader functionality intended to provide a sense of my development ability.  This sample is part of an in-process development effort.
If you run this code locally, please check out the following functionality:
1. Click on impacts (bullets) to see associated keywords.
1. Click on keywords (in the column on the right) to see the impacts associated with that keyword.
1. Click the "Show / Hide All" switch at the top of the keyword list to see how impact statements are displayed and hidden based on the keywords that are active (shown) or inactive (hidden).
1. Use dev tools, navigate to the deployed instance on your phone, or just make the window narrow to see the mobile version of the page.  Be sure to change the width by either adjusting the orientation of the mobile device (real or virtual) or simply resizing the browser window.

A few items that the larger project includes that aren't reflected in this sample are:
1. Java using the Spring Boot framwork 
1. SQL (T-SQL) and data persistence
1. Integration with external APIs (one for account management capabilities, another for resume parsing capabilities).
1. Security leveraging JSON Web Tokens
1. Authentication via a third-part provider.
1. Rest API development

## Prerequsits
To run this you must have node.js and npm installed.
Although the actual product makes API calls, this demo version is completely stand-alone.

## Project setup and deployment
1. Download the project as a zip and copy the `BoosterSample-master` folder to a location on your machine.
2. Install the project by navigating to the `BoosterSample-master` folder in your command line and running 
```
npm install
```
3. Forgive all the linting errors that show up.
4. Run
```
npm start
```
5. Navigate to http://localhost:8080/DRich222@hotmail.com

## Code structure and areas of potential interest.
The meat of the code is structured as follows.  Please note:
1. I've gone through the files and added comments with `@Reviewer` at the top of the comment.  These are comments intended to provide additional context and explanation.  `@@Reviewer` is for commments that explain in a bit more detail some of the more subtle but impactful work that I've done.
1. All items listed are .vue files
1. (Items in parens have been commented out of the code since they're not part of the demo, are part or will be part of the product)
1. \* Items with an asterisk are areas I've put a bit of work into and I think showcases some of my ability.
1. The `ResumePage` I've listed as the root below can be found in `src\views`.  The code structure outlined below reflects how components are nested within other components, not the file structure.

```
ResumePage
- SafariDebuggingScreen
- MobileControls
  |-- RightSide Controls (As listed below)
- Resume
  |-- ResumeHeader
  |   |--HeaderShortText
  |-- ResumeArea
      |-- ResumeSection
          |-- SectionHeader
          |-- ImpactArea
              |-- Impact
                  |-- ImpactKeywordContainer*
                      |-- ImpactKeyword
- RightSideControls
  |-- (RightSideControlHeader)
  |-- KeywordList
  |   |-- KeywordControls
  |   |   |-- KeywordViewControls
  |   |   |-- (AddKeywordControls)
  |   |-- KeywordLI*
  |       |-- KeywordAction
  |       |-- KeywordIndicator
  |       |-- KeywordDetails_PublicView
  |-- (ControlBox)
  ```
