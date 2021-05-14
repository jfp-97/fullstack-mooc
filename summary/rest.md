# REST

## Resources

In REST, individual data objects are referred to as *resources*. Each resource should be associated with a unique address (its URL). This address is created by combining the resource's unique id with its resource type. For example:

If you have a collection of resources at a location, like `/notes`, a single resource would be found through its id at, for example, `/notes/5` (`5` being its id).

## HTTP methods

#### GET

The GET method is used to fetch resources from the server. It can be called on the address of a collection or a single resource.

#### POST

The POST method is for storing resources in the server. For storing a new resource in a collection, the method must be called in the address of the collection.

The data to be stored must be formatted as a JSON string and attached as the body of the request. The content type should be `application/json`. If the operation is successful, the data sent and stored in the server will be returned as the *data* field of the response.

Note: the ids for resources should be generated in the backend and not sent from the frontend. The same goes for timestamps.

#### PUT

The PUT method is used for replacing a whole resource.

#### PATCH

The PATCH method is used for changing some of a resource's properties.

#### DELETE

The DELETE method removes a single resource.

## Status codes

| Method | Successful | Failed (not found) | Failed (bad request) | 
| --- | --- | --- | --- |
| GET | 200 | 404 | |
| POST | 201 | 404 | 400 |
| DELETE | 204/404 | | |

## Safety and idempotence

The GET and HEAD methods should be **safe**, meaning they should cause no side effects on the database, they should only retrieve information.

All methods except POST should be **idempotent**: if a request has side effects, the result should be the same no matter how many times the request is preformed.
