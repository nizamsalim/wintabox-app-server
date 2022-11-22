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

## <b>List of endpoints </b>

| Sl. no |                     Name                      |
| :----: | :-------------------------------------------: |
|   1    | <a href="#email_verif">Email verification</a> |
|   2    |   <a href="#email_signup">Email Signup</a>    |
|   3    |    <a href="#email_login">Email login</a>     |
|   4    |   <a href="#prov_login">Provider login</a>    |
|   5    |   <a href="#reset_pass">Reset password</a>    |

<br>

# I. User Management

## <b id="email_verif">Email Verification</b>

```
A. /auth/signup/email/verification/initiate
B. /auth/signup/email/verification/verify
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

## <b id="email_signup">1. Email signup</b>

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

## <b id="email_login">2. Email login</b>

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

## <b id="prov_login">3. Provider login (google/facebook)</b>

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

<br>
<br>

## <b id="reset_pass" >4. Reset password</b>

`POST /auth/login/email`

<br>
Body format

```js
{
    *emailToken: "...",
    *dateOfBirth: "johndoe@gmail.com"
}
```

_Complete email verification and obtain emailToken in same method as in email signup._
