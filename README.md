# JWT DEMO
## This is a demo Node.JS project, which focues on creating REST API and securing them with JWT authentication.

#### Database used:
* MongoDB
#### NodeJS Packages used:
* __Express__ - Web framework
* __Mongoose__ - MongoDB ORM
* __Bcryptjs__ - Password Hashing
* __Jsonwebtoken__ - JSON web token generation & authenticator
* __Body-parser__ - Parse incoming request bodies


For more information on JWT (JSON Web Token), please refer to [JWT.io](https://jwt.io/)

### Documentations:

* #### The Mongoose userSchema:
The userSchema has basic information about a user, such as:
* email
* firstName
* lastName
* phone
* password (hashed)
* isActive

Some of the basic validation is also added, more information on it refer to the models/models.js file.

* #### The app:
The entry point of this app is the app.js file.

* #### The routes information:

  * POST signup route:

  _Route address : http://localhost:3000/signup_

  A POST request to this route will along with valid user data in x-www-form-urlencoded format will create a user in the database.
  Required data for this route are email, firstName, lastName and password, phone is optional.

  Refer to the screenshot below, which shows a valid POST signup request:

  ![Image of signup](https://raw.githubusercontent.com/shirshendubhowmick/jwt-demo/master/demo-screenshots/signup.JPG)


  * POST login route:

  _Route address : http://localhost:3000/login_

  A POST request to this route along with valid user id (email in this case) & password in x-www-form-urlencoded format will return an access token in the response header & user data in the response body. It will also update the token field in database with the generated token.
  
  Refer to the screenshot below, which shows a valid POST login request:

  ![Image of login-body](https://raw.githubusercontent.com/shirshendubhowmick/jwt-demo/master/demo-screenshots/login-body.JPG)

  ![Image of login-header](https://raw.githubusercontent.com/shirshendubhowmick/jwt-demo/master/demo-screenshots/login-header.JPG)


  * DELETE logout route:

  _Route address : http://localhost:3000/logout_

  A DELETE request to this route along with an valid access token in form of request header will logout the user i.e. it will destroy the token and make sure no further authentication is possible with this token. To log out an user the user needs to be already logged in i.e. the user should be authenticated which is done by the authenticate middleware, we will talk about it in a moment.
  
  Refer to the screenshot below, which shows a valid DELETE logout request:

  ![Image of logout](https://raw.githubusercontent.com/shirshendubhowmick/jwt-demo/master/demo-screenshots/logout.JPG)


* #### Securing a custom route - the authenticate middleware:

If you want to create your custom route and add authentication to it, we have built the authenticate middleware for that. While accessing the route you need to send the x-auth header with a valid access token and use the authenticate middleware. If the token is a valid token the authenticate middleware will add the user information to req object upon successful validation of the token and call the next(). If the token is not valid it will throw an 401 error.

For example in our app.js file we have a __GET users route__ at http://localhost:3000/users this route uses the authenticate middleware to perform authentication. While requesting to this route you need to provide a valid x-auth token as part of the header, upon successful authentication this will send the user details as a response.

Refer to the screenshot below, it shows a successful GET users request:

![Image of users](https://raw.githubusercontent.com/shirshendubhowmick/jwt-demo/master/demo-screenshots/get-users.JPG)


For more information please refer to the code, as it has self explanatory comments added.

__If you need any help and face a bug or an issue, please contact me or raise it in GitHub.__

*__Thank You__*