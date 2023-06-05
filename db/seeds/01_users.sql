INSERT INTO users (name, email, password) VALUES ('test user', 'a@a.com', 'password');
INSERT INTO users (name, email, password)
SELECT
  CONCAT_WS(' ', first_names.name, last_names.name),
  LOWER(CONCAT(first_names.name, last_names.name, '@example.com')),
  'password'
FROM
  (SELECT name FROM (VALUES
    ('Emma'), ('Liam'), ('Olivia'), ('Noah'), ('Ava'), ('Isabella'),
    ('Sophia'), ('Mia'), ('Charlotte'), ('Amelia'), ('Harper'), ('Evelyn'),
    ('Abigail'), ('Emily'), ('Elizabeth'), ('Mila'), ('Ella'), ('Avery'),
    ('Sofia'), ('Camila'), ('Aria'), ('Scarlett'), ('Victoria'), ('Madison'),
    ('Luna'), ('Grace'), ('Chloe'), ('Penelope'), ('Layla'), ('Riley'), ('Zoey'),
    ('Nora'), ('Lily'), ('Eleanor'), ('Hannah'), ('Lillian'), ('Addison'),
    ('Aubrey'), ('Ellie'), ('Stella'), ('Natalie'), ('Zoe'), ('Leah')
  ) AS first_names(name) ORDER BY random()
  ) AS first_names,
  (SELECT name FROM (VALUES
    ('Smith'), ('Johnson'), ('Williams'), ('Brown'), ('Jones'), ('Miller'),
    ('Davis'), ('Garcia'), ('Rodriguez'), ('Wilson'), ('Martinez'), ('Anderson'),
    ('Taylor'), ('Thomas'), ('Hernandez'), ('Moore'), ('Martin'), ('Jackson'),
    ('Thompson'), ('White'), ('Lopez'), ('Lee'), ('Gonzalez'), ('Harris'), ('Clark'),
    ('Lewis'), ('Robinson'), ('Walker'), ('Perez'), ('Hall'), ('Young'), ('Allen'),
    ('Sanchez'), ('Wright'), ('King'), ('Scott'), ('Green'), ('Baker'), ('Adams'),
    ('Nelson'), ('Hill'), ('Ramirez'), ('Campbell'), ('Mitchell'), ('Roberts'),
    ('Carter'), ('Phillips'), ('Evans')
  ) AS last_names(name) ORDER BY random()
  ) AS last_names
LIMIT 100;
