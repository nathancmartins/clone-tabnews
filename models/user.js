import database from "infra/database";
import { ValidationError, NotFoundError } from "infra/errors";

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username);

  return userFound;

  async function runSelectQuery(username) {
    const result = await database.query({
      text: `
            SELECT  
              * 
            FROM 
              users
            WHERE
              LOWER(username) = LOWER($1)
            LIMIT
              1
            ;`,
      values: [username],
    });

    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: "O username não foi encontrado.",
        action: "Verifique se o username está digitado corretametent",
      });
    }

    return result.rows[0];
  }
}

async function create(usersInputValues) {
  await validateUniqueEmail(usersInputValues.email);

  await validateUniqueUsername(usersInputValues.username);

  async function validateUniqueEmail(email) {
    const result = await database.query({
      text: `
            SELECT  
              email 
            FROM 
              users
            WHERE
              LOWER(email) = LOWER($1)
            ;`,
      values: [email],
    });

    if (result.rowCount > 0) {
      throw new ValidationError({
        message: "O email informado já está sendo utilizado",
        action: "Utilize outro email para realizar o cadastro",
      });
    }
  }

  async function validateUniqueUsername(username) {
    const result = await database.query({
      text: `
            SELECT  
              username 
            FROM 
              users
            WHERE
              LOWER(username) = LOWER($1)
            ;`,
      values: [username],
    });

    if (result.rowCount > 0) {
      throw new ValidationError({
        message: "O username informado já está sendo utilizado",
        action: "Utilize outro username para realizar o cadastro",
      });
    }
  }

  const newUser = await runInsertQuery(usersInputValues);
  return newUser;

  async function runInsertQuery(usersInputValues) {
    const result = await database.query({
      text: `
            INSERT INTO 
              users (username, email, password) 
            VALUES 
              ($1, $2, $3)
            RETURNING
              *
            ;`,
      values: [
        usersInputValues.username,
        usersInputValues.email,
        usersInputValues.password,
      ],
    });
    return result.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
};

export default user;
