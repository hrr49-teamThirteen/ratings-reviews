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
#### /api/ratings/images/insert/:prodId/?loc=’path’
##### Insert an image
##### Params:
- prodId = product id
- loc = image path

#### /api/ratings/images/:prodId
##### Returns a list of images for a product id
##### Params:
- prodId = product id

#### /api/ratings/images/update/:imgId/:prodId?loc=’path’
##### Update an image
##### Params:
- imgId = image id
- prodId = product id
- loc = image path

#### /api/ratings/images/delete/:imgId
##### Delete an image
##### Params:
- imgId = image id

### Users:
#### /api/ratings/users/insert?name='username'
##### Insert a user
##### Params:
- name = the username

#### /api/ratings/users/:uId
##### Get a user's information
##### Params:
- uId = the id of the user

#### /api/ratings/users/update/:uId?name='username'
##### Update a user's information
##### Params:
- uId = the id of the user
- name = the username

#### /api/ratings/users/delete/:uId
##### Delete a user
##### Params:
- uId = the id of the user