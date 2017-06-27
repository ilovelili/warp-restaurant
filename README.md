# WARP offline test

## Requirements
* [Docker](https://docs.docker.com/)

## Docker Hubs
* [node:8.1.2-alpine](https://hub.docker.com/_/node/)
* [mvertes/alpine-mongo](https://hub.docker.com/r/mvertes/alpine-mongo/)

## Frameworks
* [Express 4](https://expressjs.com/)
* [Angular](https://angular.io/)

## Run
* `docker-compose up`
* access http://localhost:4200

## Endpoints
| Name   | Method      | URL                            | Auth Needed   |

## Database
Data Persisted to MongoDB.

## DataTable
1. recipe
    * ID - Bson ObjectId(mongodb) or SERIAL(postgres)
    * Name - string
    * Prep - Date
    * Difficulty - int
    * Vegetarian - bool
2. reciperate
    * ID - Bson ObjectId(mongodb) or SERIAL(postgres)
    * RecipeID - string
    * Rate - int
    * User - string
    * Modified - Date

## Test

## TBD
1. mongo db auth
2. client side auth
3. test
4. PM2?

## Known issue

## Contact
min ju <route666@live.cn>