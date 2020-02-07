# Users API
Path: /api/users

## UserObject
Key        |Type  |Description
-----------|------|------------------------------
[uid]      |number|unique user id
[dateOfReg]|string|date of registration
username   |string|username
password   |string|SHA-256 hashed password
email      |string|email address
gender     |number|0: unknown, 1: male, 2: female

## Methods
```diff
GET /api/users
+ Authorization header
```

Get the information of all users

```diff
POST /api/users
```

Create a new user

```diff
GET /api/users/:uid
+ Authorization header
```

Get the information of the user with the specified uid

```diff
PUT /api/users/:uid
+ Authorization header
```

Replace the information of the user with the specified uid

```diff
PATCH /api/users/:uid
+ Authorization header
```

Update the information of the user with the specified uid

```diff
DELETE /api/users/:uid
+ Authorization header
```

Delete the information of the user with the specified uid
