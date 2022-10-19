# PRANAGEO Employment Test
Clone the project to a local directory using the command:
*git clone git@github.com:stradox4u/pranageo-cells.git*

## Server
To run the server:
* *cd server*
* *npm install*
* *npm run dev*

This would start the local development server, running on port 8000;

To parse the included json and initialize the local and remote git repos:
* First create a remote repository on your git hosting provider of choice, and copy the ssh access string.
* *npm run readfile \<commit message\> \<remote repository string\>*

This should parse the included json file, create the required directories and write the required files, initialize a local git repository at */umar/\<projectName\>* create a commit with the supplied *commit message*, and push the repository to the supplied *remote repository string*