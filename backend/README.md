# MovieBoxd Backend

## Database Schema

<sup><sub>Subject to change</sub></sup>

### Users Table

| Column        | Data Type   | Constraints                |
| ------------- | ----------- | -------------------------- |
| id            | SERIAL      | Primary Key                |
| username      | VARCHAR(50) | Unique, Not Null           |
| password_hash | TEXT        | Not Null                   |
| created_at    | TIMESTAMP   | Default: Current Timestamp |

### Watchlist Table

| Column     | Data Type | Constraints                        |
| ---------- | --------- | ---------------------------------- |
| id         | SERIAL    | Primary Key                        |
| user_id    | INTEGER   | Foreign Key -> Users(id), Not Null |
| movie_id   | INTEGER   | Not Null                           |
| created_at | TIMESTAMP | Default: Current Timestamp         |

### Reviews Table

| Column     | Data Type | Constraints                        |
| ---------- | --------- | ---------------------------------- |
| id         | SERIAL    | Primary Key                        |
| user_id    | INTEGER   | Foreign Key -> Users(id), Not Null |
| movie_id   | INTEGER   | Not Null                           |
| created_at | TIMESTAMP | Default: Current Timestamp         |
