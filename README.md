# Order Delivery RESTful API
## Featuring Docker, Node, Express, MongoDB, Mongoose & NGINX

## About

- [Docker](https://www.docker.com/) Docker is used on a large scale for running server applications but nothing stands in the way to use it in the development process. Additionally, there's a high probability that our code will work in the same way on server environment if we test it first on a local machine using same technologies.
- [Node.js](https://nodejs.org/en/) It provide run-time environment to run JavaScript files.
- [Express.js](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MongoDB](https://www.mongodb.com/) It is non relational database used to provide database layer
- [Mongoose](https://mongoosejs.com/) Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
- [NGINX](https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/) as a proxy / content-caching layer

## How to Install & Run

1.  Clone the repo.
2.  Set Google Distance API key in app/config.js file line no. 6.
3.  Run `./start.sh` to download Docker, npm.
4.  After container is started , testcase will run automatically.

## Manually Starting the server and test Cases

1. Ensure mongo server is up and running
2. Run npm install
3. Run node app/index.js
4. Server is accessible at `http://localhost:8080`
5. Run manual testcase suite by `npm test app/test`

## Manually Starting the docker and test Cases

1. You can run `docker-compose up` from terminal
2. Server is accessible at `http://localhost:8080`
3. Run manual testcase suite by `npm test app/test`

## How to Run Tests (Explicity from cli)

 You should be able to run `npm install` and mongodb server should be started followed by `npm test app/test` to run everything (assuming you have the LTS version of Node installed on your machine).

## App Structure

**./app**

- `handlers` It is used to handle common erors and orders functionality having `request`, `response`, and `next` parameters.
- `helpers` It contains apiError and parsing page and limit functionality for application.
- `models` It is used for Mongoose schema definitions and associated models
- `routers` It is sed for RESTful route declarations using express.Router module that utilize the functions in `handlers`
- `schemas` It conatins JSONSchema validation schemas for creating or updating a Order.
- `app.js` It is used to  configure the express app
- `config.js` It is the app-specific config that you will want to customize for your app
- `index.js` Is the entrypoint that actually starts the application

**./test**

- this folder contains test case run using `npm test app/test` which in turn uses [Mocha]

**./config**

- config contains NGINX proxy configuration, the production pm2 configuration (the process-runner of choice).

## Google API configuration ##

- add google apk key in configuration file located in app/config.js


## API Documentation
Api documentation an be seen on url http://localhost:8080/api-docs/
