# Blog API

This is a blog API. The user will get a Token upon sign in that will be in the header. The user will then be able to view, view blogs by id, add, update blogs by id, and remove blogs by id. They will also be able to see, see users by id update, add, and delete users.

User will be able to see both public and private blogs, and will be able to filter out private blogs by going to the /blogs/public route.

The API is protected by using a hashed password, and unique emails during account creation.

## Heroku Link

https://jan-blog-app.herokuapp.com/

## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

**Tools:** MongoDB

## Environment Variables

To run this file, the following environment variables are needed in the .env file:

- MONGODB_URI
- SECRET_KEY
- PORT

## Run Locally

To run the project, you must follow the steps and have all dependencies to ren the project.

### Clone git repository

git clone https://github.com/PotstickerNut/blogAPI.git

### Go to the blogAPI directory

cd location of the blogAPI on your computer

### Install Dependencies

npm init -y

npm i

the following should be added to your package.json

- bcrypt
- dotenv
- express
- express-validator
- helmet
- jsonwebtoken
- mongoose
- morgan

### Routes

#### Root ("/")

- Returns message "Welcome to my blog API"

#### Auth ("/auth")

- **authRouter.post ("/"):** register users, password is hashed, and token generated.

#### User ("/users")

- **usersRouter.get ("/"):** shows all users, must be logged in and have token.

- **usersRouter.post ("/"):** Creates users with usersSchema and provides token.
- **usersRouter.get ("/:id"):** Returns user by user ID. Parameter is required to get user. Must be signed in and have token.
- **usersRouter.put ("/:id"):** Updates user by user ID. Parameter is required to update user. Must be signed in and have token.
- **usersRouter.delete ("/:id"):** Deletes user by user ID. Parameter is required to delete user. Must be signed in and have token.

#### Blogs ("/blogs")

- **blogsRoute.get ("/"):** Shows all blogs, must be logged in and have a token
- **blogsRoute.post ("/blogs"):** Creates blog with blogSchema. Must be signed in and have a token.
- **blogsRoute.get ("/blogs/public"):** Shows all public blogs. Must be signed in and have a token.
- **blogsRoute.get ("/:id"):** Returns blog by blog ID. Parameter is required to get blog. Must be signed in and have a token.
- **blogsRoute.put ("/:id"):** Updates blog by blog ID. Parameter is required to update blog. Must be signed in and have a token.
- **blogsRoute.delete ("/:id"):** Deletes blog by blog ID. Parameter is required to delete blog. Must be signed in and have a token.

## Schemas

### Blogs Route Schema:

- created_by: String, required
- created_at: Date, required
- blog_title: String, required
- blog_content: String, required
- private: Boolean, required

### Users Route Schema:

- username: String, required
- email: String, required
- birthday: Date, required
- age: Number
- password: String, required

## Middleware

authMiddleware: checks to see if header has a token.

## Upcoming Features

- Documentation with Swagger
- Super User Account
