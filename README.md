# <b>WINTABOX API DOCUMENTATION</b>

<br>

_Note: Required fields are marked with '\*'_

### General Error format

```js
{
  success: false,
  error: {
    code: "...",
    message: "...",
    statusCode: ...,
  },
}

```

<br>

# I. User Management

## <b>1. Email signup</b>

`POST /auth/signup/email`  
<br>
Body format

```js
{
    *name: "John Doe",
    dateOfBirth: "30/07/2004", // dd/mm/yyyy
    *email: "johndoe@gmail.com",
    *password: "mypassword123"
}
```

<br>

Response format

```js
{
  success: true,
  user: {
    _id: "636f5aa6ff77fdf3ec11f8e4",
    name: "John Doe",
    dateOfBirth: "30/07/2004",
    email: "johndoe@gmail.com",
    followerCount: 0,
    followingCount: 0,
    playlistCount: 0,
    __v: 0
  },
  authToken: "..."
}
```

<br>
<br>

## <b>2. Email login</b>

`POST /auth/login/email`  
<br>
Body format

```js
{
    *email: "johndoe@gmail.com",
    *password: "mypassword123"
}
```

<br>

Response format

```js
{
  success: true,
  user: {
    _id: "636f5aa6ff77fdf3ec11f8e4",
    name: "John Doe",
    dateOfBirth: "30/07/2004",
    email: "johndoe@gmail.com",
    followerCount: 0,
    followingCount: 0,
    playlistCount: 0,
    __v: 0
  },
  authToken: "..."
}
```

<br>
<br>

## <b>3. Provider login (google/facebook)</b>

`POST /auth/login/email`  
<br>
Body format

```js
{
    *idToken: "...",
    dateOfBirth: "30/07/2004"
}
```

_\*Refer firebase docs for google/facebook login workflow_

<br>

Response format

```js
{
  success: true,
  user: {
    _id: "636f5aa6ff77fdf3ec11f8e4",
    name: "John Doe",
    dateOfBirth: "30/07/2004",
    email: "johndoe@gmail.com",
    followerCount: 0,
    followingCount: 0,
    playlistCount: 0,
    __v: 0
  },
  authToken: "..."
}
```
