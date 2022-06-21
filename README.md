# Blog API

This is a blog API. The user will get a Token upon sign in that will be in the header. The user will then be able to view all blogs, view blogs by id, add, update blogs by id, and remove blogs by id. They will also be able to see all users, see users by id, update users by id, add users by id, and delete users by id.

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

```
cd blogAPI
```

### Install Dependencies

```
npm init -y

npm i
```

The following should be added to your package.json

- bcrypt
- dotenv
- express
- express-validator
- helmet
- jsonwebtoken
- mongoose
- morgan
- swagger-jsdoc
- swagger-ui-express

### Routes

#### Root ("/")

- Returns message "Welcome to my blog API"

#### Auth ("/auth")

| Type | Route | Description                                           |
| ---- | ----- | ----------------------------------------------------- |
| POST | "/"   | Login users, password is hashed, and token generated. |

#### User ("/users")

| Type   | Route  | Description                                                                                      |
| ------ | ------ | ------------------------------------------------------------------------------------------------ |
| GET    | "/"    | Shows all users, must be logged in and have token.                                               |
| POST   | "/"    | Creates users with usersSchema, password is hashed, and provides token.                          |
| GET    | "/:id" | Returns user by user ID. Parameter is required to get user. Must be signed in and have token.    |
| PUT    | "/:id" | Updates user by user ID. Parameter is required to update user. Must be signed in and have token. |
| DELETE | "/:id" | Deletes user by user ID. Parameter is required to delete user. Must be signed in and have token. |

#### Blogs ("/blogs")

| Type   | Route           | Description                                                                                        |
| ------ | --------------- | -------------------------------------------------------------------------------------------------- |
| GET    | "/"             | Shows all blogs, must be logged in and have a token                                                |
| POST   | "/blogs"        | Creates blog with blogSchema. Must be signed in and have a token.                                  |
| GET    | "/blogs/public" | Shows all public blogs. Must be signed in and have a token.                                        |
| GET    | "/:id"          | Returns blog by blog ID. Parameter is required to get blog. Must be signed in and have a token.    |
| PUT    | "/:id"          | Updates blog by blog ID. Parameter is required to update blog. Must be signed in and have a token. |
| DELETE | "/:id"          | Deletes blog by blog ID. Parameter is required to delete blog. Must be signed in and have a token. |

## Schemas

### Blogs Route Schema:

- **created_by:** String, required
- **created_at:** Date, required
- **blog_title:** String, required
- **blog_content:** String, required
- **private:** Boolean, required

### Users Route Schema:

- **username:** String, required
- **email:** String, required
- **birthday:** Date, required
- **age:** Number
- **password:** String, required

## Middleware

authMiddleware: checks to see if header has a token.

## Upcoming Features

- Blogs linked to creators
- Admin Account
- Calculate the age
