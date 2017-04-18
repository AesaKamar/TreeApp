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

Fast Installation Guidence

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


Noraml start
In the Ginko container, run the tests to seed testing data into the database
```
$ npm test
```

# Step 4

In the Ginko container, run the application and start the server
```
$ npm start
```

Start test
```
$ npm test
```