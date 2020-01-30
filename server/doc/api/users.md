# Users API
Path: /api/users

## UserObject
Key        |Type  |Description
-----------|------|------------------------------
[uid]      |number|unique user id
[dateOfReg]|string|date of registration
username   |string|username
password   |string|password
email      |string|email address
gender     |number|0: unknown, 1: male, 2: female

## Methods
`GET /api/users`

Get the information of all users

`POST /api/users`

Create a new user

`GET /api/users/:uid`

Get the information of the user with the specified uid

`PUT /api/users/:uid`

Replace the information of the user with the specified uid

`PATCH /api/users/:uid`

Update the information of the user with the specified uid

`DELETE /api/users/:uid`

Delete the information of the user with the specified uid
