# POSTGRESQL and Sequelize Intro

## Intro
- Relational Database: type of database that allows us to identify and access data in relatio to another piece of data in the database
- Relational Database Management System (RDBMS): a program that allows us to create, update, and administer a relational database. Uses SQL (Structured Query Language), which is a programming language that is used to work with data in a RDBMS
- PostgreSQL: an RDBMS that is typically used for web app development

## Notes on Project
- To create a seed file to populate database, create seed.sql in root directory
of project. INSERT INTO statements will go in this file
- To seed the database, go to terminal and type:
`psql -d dbName -a -f ./pathToSeedFile`