This app is bootstrapped with [razzle](https://github.com/jaredpalmer/razzle/tree/master).

The code is avaliable on [github](https://github.com/viveksanthosh/cash_free_user_comment/blob/master/README.md)

## Database
[Nano-sql](https://nanosql.io/) is used as the data to store the comments and users.
There are two tables:

- Users:  (name, color, user_id {pk} )
- Comments: (comment, timestamp, comment_id {pk} ,  user_id {fk}, reply_to_comment_id {self fk}, reply_to_user {fk} )

These table are joined to display the comments and the users table is queries for the initial user list
The users data along with some comments are loaded at the start, comments are added with submitted or replies to other comments are done

## Api Layer

The api layer consists of:

- Repository Layer: This handles the db operations (in this case it sets up nano-sql tables and pre-populates data)\
- Service Layer: This layer performs logical operations over the repository
- Router Layer: This layer interacts with the service and network


## UI Layer

The UI is build with react. The entry point is App.js, while a majority of the logic resides in Comments.js

## How to Use

- yarn install and yarn start to start the app
- runs on http://localhost:3000/
- Users can add comments via the text area in the bottom of the screen
- Users can reply to comments, these comments appear nested
- Users can reply to nested comments, these comments reference the user they are replying to 
- The replying user can be changed by changing the dropdown value
- As nano-sql is an inmemory db, new comments are presistant till the app is stopped and restarted. The data persists during a reqular restart
