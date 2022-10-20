# PRANAGEO Employment Test
Clone the project to a local directory using the command:
*git clone git@github.com:stradox4u/pranageo-cells.git*

## Server
First, fill in the values in the included *.env.sample*, then rename the file to *.env*

> To parse the included json and initialize the local and remote git repos:
* First create a remote repository on your git hosting provider of choice, and copy the ssh access string.
* *npm run readfile \<commit message\> \<remote repository string\>*

This should parse the included json file, create the required directories and write the required files, initialize a local git repository at *\<username\>\<projectName\>* create a commit with the supplied *commit message*, and push the repository to the supplied *remote repository string*

To run the server separately:
* *cd server*
* *npm install*
* *npm run dev*

This would start the local development server for the backend, running on port 8000;

## Client
The default value of the backend url in the client *.env* is *http://localhost:8000/api/v1*

To run the client separately:
* *cd client*
* *npm install*
* *npm run dev*

This starts the client and you can visit the application at *http://localhost:5173/* in your browser.

## Docker
To run the entire application using one command:

* Replace *umar* with the name of your <username> directory, in the server's *Dockerfile*.
* Do the same in the *pranageo_server* service section of the *docker-compose.yml* file.
* Run *docker compose up* to start the containers serving the client and server.

You should now be able to visit the application by navigating to *http://localhost:5173/* in your browser.

You can also directly call the backend routes on *http://localhost:8000*.
