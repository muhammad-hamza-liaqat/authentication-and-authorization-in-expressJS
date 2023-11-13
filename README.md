# authentication-and-authorization-in-expressJS
An Application made in nodeJS and expressJS, which is responsible for handling authentication and authorization. There are 2 form i-e registration and login.
http://localhost:3000/ for server home page
http://localhost:3000/register-user to register the user
http://localhost:3000/login for login into the screen, this is not working yet. to test this go into the POST Application and select the method POST and pass the URL in the body 
http://localhost:3000/login/login-check 
and add the email and password into the body of POSTman in this way
{
    "email" : "your-email@.com",
    "password" : "yourPassword"
}
in return, you will be JWT token for that user.

to test, forgot password API, hit this link on postman http://localhost:3000/forgot
pass the email and the new password in this body
hit the enter, it will check user's email is valid then user is isVerified then it will allow to change the password. the password will be stored in the form of hashes in the database. for hashes, bcrypt npm package is installed. uuid is used to verfity the user and make it verify in the backend.
