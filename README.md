# WARP offline test
[![Build Status](https://travis-ci.org/ilovelili/warp-restaurant.svg?branch=master)](https://travis-ci.org/ilovelili/warp-restaurant)

## Demo
* (July 5th) The droplet hosting the demo application has been destroyed. Please let me know if you are still interested in the demo and I can set up a new one.

http://188.226.157.229:4200/#/home

    This demo is hosted by my personal DigitalOcean Droplet.
    Please use Mozilla Firefox to access since Google Chrome will block non-secure origins for Google Places API. (It's not an application issue)
    You can access http://localhost:4200 in Chrome since localhost is considered as a whitelist domain.
    
## Requirements
* [Docker:17.06.0-ce (with Docker Compose:1.14.0)](https://docs.docker.com/)

### Docker Images
* [node:8.1.2-alpine](https://hub.docker.com/_/node/)
* [mvertes/alpine-mongo](https://hub.docker.com/r/mvertes/alpine-mongo/)

## Frameworks
* [Angular](https://angular.io/)
* [Express 4](https://expressjs.com/)

## External APIs
* [Google Places API](https://developers.google.com/places/)

## Main Node dependencies (including devDependencies)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [supertest](https://www.npmjs.com/package/supertest)
* [tape](https://www.npmjs.com/package/tape)
* [jshint](https://www.npmjs.com/package/jshint)
* [angular](https://www.npmjs.com/package/angular)
* [typescript](https://www.npmjs.com/package/typescript)

## Run
* `docker-compose up`
* access http://localhost:4200

## Endpoints
| Method      | URL         | Auth Needed   | Note               |
| ---         | ---         | ---           | ---                |
| `GET`       | `/health`   | No            | Health check       |
| `GET`       | `/places`   | No            | Get place by ID    |
| `POST`      | `/places`   | No            | Create a new place |

## Database
Data Persisted to MongoDB.

### DataTable
    Place
    * _id - Bson Object ID (string)
    * placeId - place ID provided by Google Places API (string)
    * placeResult - place detailed info provided by Google Places API (Object)
    * lastModified - last modified time (Date)

## Test
   supertest is used for API testing and intergrated with Travis CI.

## Deployment
I personally perfer [Ansible](http://docs.ansible.com/ansible/docker_module.html).

## Note
    Actually this application can be totally switched to 'serverless' since Google Places API provides nearby place searching | reviewing | rating features which can fully satisfy the business need.
    The back-end of the application just works as a cache server. If we could find the corresponding data in database, we use this cached data and do not call Google API in that case.
    I consider it a good practice since we want to restrict the API access to prevent the overload/overuse on a (web) api endpoint or shorten the response time sometimes in real-world applications.

## TBD
1. mongo db auth
2. PM2 intergration

## Contact
Min Ju <route666@live.cn>
