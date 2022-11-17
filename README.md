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

```
A. /auth/signup/email/verification/initiate
B. /auth/signup/email/verification/verify
C. /auth/signup/email
```

<br>

A. Initiate OTP verification

```js
{
  *email: "johndoe@gmail.com";
}
```

Returns statusCode 200 if success. <br>
Returns error otherwise
<br><br>

B. Verify OTP

```js
{
  *otp: "413687",
  *email: "johndoe@gmail.com"
}
```

Returns a JWT if success.
Returns error otherwise
<br><br>

C. User creation

Body format

```js
{
    *name: "John Doe",
    dateOfBirth: "30/07/2004", // dd/mm/yyyy
    *email: "johndoe@gmail.com",
    *password: "mypassword123",
    *emailToken: "..."
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
