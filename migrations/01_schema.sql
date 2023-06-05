DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS items_categories CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE DEFAULT CURRENT_DATE,
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  date_added DATE NOT NULL,
  updated_at DATE DEFAULT CURRENT_DATE,
  completed BOOLEAN,
  users_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  important VARCHAR(255) NOT NULL,
)


CREATE TABLE items_categories (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
)

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE DEFAULT CURRENT_DATE,
)

