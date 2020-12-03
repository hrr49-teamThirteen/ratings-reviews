# Project Name

> Project description

## Related Projects

  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo
  - https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## Endpoints:
### Images:
#### /api/ratings/images/insert/:prodId
##### Insert an image
##### Params:
- prodId = product id
- loc = image path

#### /api/ratings/images/:prodId
##### Returns a list of images for a product id
##### Params:
- prodId = product id

#### /api/ratings/images/update/:imgId/:prodId
##### Update an image
##### Params:
- imgId = image id
- prodId = product id
- loc = image path

#### /api/ratings/images/delete/:imgId
##### Delete an image
##### Params:
- imgId = image id

### Reviews:
#### /api/ratings/reviews/insert/:pId
##### Adds a review
##### Params:
- pId = product id
- username = username of reviewer
- title = ?
- date = date of the post
- body = main review
- rating = 1-5 rating

#### /api/ratings/reviews
##### Returns all reviews
##### This was used by the original front-end, and shouldn't be used.

#### /api/ratings/reviews/:pId
##### Returns a specific review based on product ID.
##### Params:
- pId = product id

#### /api/ratings/reviews/update/:rId
#### Updates a review.
#### Params:
- rId = review id
- title = I assume there was going to be front-end titles for reviews, but they never got used.
- date = The date of the post. If none is provided, the current date will be added.
- body = the main content of the review
- rating = Should be 1-5. This looks like it should've updated stars on the front-end, but functionality never was added.
- pid = The product id that this review is for.

#### /api/ratings/reviews/delete/:rId
##### Delete review.
##### Params:
- rId = review id.

### Users:
#### /api/ratings/users/insert
##### Adds a user
##### Params:
- uname = username

#### /api/ratings/users/:uId
##### Returns a specific user's info
##### Params:
- uid = user id

#### /api/ratings/users/update/:uId
##### Update a user's info
##### Params:
- uId = user id
- uname = username

#### /api/ratings/users/delete/:uId
##### Delete a user
##### Params:
- uId = userId

### Products:
#### /api/ratings/products/insert
##### Adds a product.
##### Params:
- name = product name

#### /api/ratings/products/:pId
##### Retreives a product.
##### Params:
- pId = product id

#### /api/ratings/products/update/:pId
##### Updates a product.
##### Params:
- pId = product id
- name = product name

#### /api/ratings/products/delete/:pId
##### Deletes a product.
##### Params:
- pId = product id

