# TreeApp

**Family Tree visualzation based social network**

Made with:

> -**Sails**, A Node/Express based mvc framework

> -**Angular**, A frontend MVVM framework

> -**Bluebird**, A promise library which manages the complexities of async code

> -**D3JS**, An SVG based web framework for creating beautiful data visualizations

> -**Lodash**, A set of functional utilities to write consise javascript

> -**Postgres**, A nice, stable, and feature rich database

> -**Docker**, Great for shipping and provisioning environments

# Instructions for running React

# Step 1

Currently React only nuns locally. Navigate to the ginko folder,
and install the app using

```
npm install
```

# Step 2

And run the react application using

```
npm start
```

# Windows

On Windows Install the [Docker Toolbox on Windows](https://docs.docker.com/toolbox/toolbox_install_windows/#step-2-install-docker-toolbox)
, run the tool then open the Docker Quickstart terminal.

Only the C:\Users directory is linked between the Virtual Machine and windows so place
the project in that directory then run steps 1 and 2.

# Instructions for running Angular

Fast Installation Guidance

# Step 1

Use docker-compose to start the database

```
$ docker-compose run db
```

# Step 2

Start the Ginko app container on port 1337 using docker compose
```
$ docker-compose run -p 1337:1337  ginko bash
```

# Step 3

In the Ginko container, run the tests to seed testing data into the database
```
$ npm test
```

# Step 4

In the Ginko container, run the application and start the server
```
$ npm start
```

# Windows
On Windows Install the [Docker Toolbox on Windows](https://docs.docker.com/toolbox/toolbox_install_windows/#step-2-install-docker-toolbox)
, run the tool then open the Docker Quickstart terminal.

Only the C:\Users directory is linked between the Virtual Machine and windows so place
the project in that directory then run steps 1-4.

Lastly, when you start the Docker Quickstart terminal you will see a message like -

```

                        ##         .
                  ## ## ##        ==
               ## ## ## ## ##    ===
           /"""""""""""""""""\___/ ===
      ~~~ {~~ ~~~~ ~~~ ~~~~ ~~~ ~ /  ===- ~~~
           \______ o           __/
             \    \         __/
              \____\_______/

docker is configured to use the default machine with IP 192.168.99.100
For help getting started, check out the docs at https://docs.docker.com

Start interactive shell
```
To access the project go to 192.168.99.100:1337 (Any instance of localhost
must be replaced with this provided IP)
