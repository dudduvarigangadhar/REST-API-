const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const app = express();
let db = null;
const initalizeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "todoApplication.db"),
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
initalizeDBAndServer();

app.get("/todos/", async (request, response) => {
  let data = null;
  let getTodosQuery = "";
  const { search_q = "", priority, status } = request.query;
  const hasPriorityAndStatusProperties = (requestQuery) => {
    return (
      requestQuery.priority !== undefined && requestQuery.status !== undefined
    );
  };
  const hasPriorityProperty = (requestQuery) => {
    return requestQuery.priority !== undefined;
  };
  const hasStatusProperty = (requestQuery) => {
    return requestQuery.status !== undefined;
  };
  //   console.log(hasPriorityAndStatusProperties(request.query));
  switch (true) {
    case hasPriorityAndStatusProperties(request.query):
      console.log("1", request.query);
      getTodosQuery = `
            SELECT * FROM todo 
            WHERE todo LIKE '%${search_q}%'
            AND status = '${status}'
            AND priority = '${priority}';
            `;
      break;

    case hasPriorityProperty(request.query):
      getTodosQuery = `
            SELECT * FROM todo
            WHERE todo LIKE '%${search_q}%
            AND priority = '${priority}' ;`;
      break;

    case hasStatusProperty(request.query):
      console.log("3", request.query);
      getTodosQuery = `
            SELECT * FROM todo
            WHERE todo LIKE '%${search_q}%'
            AND status = '${status}'
            `;
      break;

    default:
      console.log(request.query);
      getTodosQuery = `
                SELECT * FROM todo
                WHERE todo LIKE '$%{search_q}%';
                `;
  }

  const dbResponse = await db.all(getTodosQuery);
  console.log(dbResponse);
  console.log(hasPriorityAndStatusProperties);
  console.log(hasPriorityProperty);
  console.log(hasStatusProperty);
  response.send(dbResponse);
});

const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const app = express();
let db = null;
const initalizeDBAndServer = async () => {
  try {
    db = await open({
      filename: path.join(__dirname, "todoApplication.db"),
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};
initalizeDBAndServer();

// app.get("/todos/", async (request, response) => {
//   let data = null;
//   let getTodosQuery = "";
//   const { search_q = "", priority, status } = request.query;
//   const hasPriorityAndStatusProperties = (requestQuery) => {
//     return (
//       requestQuery.priority !== undefined && requestQuery.status !== undefined
//     );
//   };
//   const hasPriorityProperty = (requestQuery) => {
//     return requestQuery.priority !== undefined;
//   };
//   const hasStatusProperty = (requestQuery) => {
//     return requestQuery.status !== undefined;
//   };

//   switch (true) {
//     case hasPriorityAndStatusProperties(request.query):
//       console.log("1", request.query);
//       getTodosQuery = `
//             SELECT * FROM todo
//             WHERE todo LIKE '%${search_q}%'
//             AND status = '${status}'
//             AND priority = '${priority}';
//             `;
//       break;

//     case hasPriorityProperty(request.query):
//       getTodosQuery = `
//             SELECT * FROM todo
//             WHERE todo LIKE '%${search_q}%
//             AND priority = '${priority}' ;`;
//       break;

//     case hasStatusProperty(request.query):
//       console.log("3", request.query);
//       getTodosQuery = `
//             SELECT * FROM todo
//             WHERE todo LIKE '%${search_q}%'
//             AND status = '${status}'
//             `;
//       break;

//     default:
//       console.log(request.query);
//       getTodosQuery = `
//                 SELECT * FROM todo
//                 WHERE todo LIKE '$%{search_q}%';
//                 `;
//   }

//   const dbResponse = await db.all(getTodosQuery);
//   response.send(dbResponse);
// });

// app.get("/todos/", async (request, response) => {
//   let data = null;
//   let getTodosQuery = "";
//   const { search_q = "", priority } = request.query;
//   const hasPriorityProperty = (requestQuery) => {
//     return requestQuery.priority !== undefined;
//   };
//   const hasPriorityAndStatus = (requestQuery) => {
//     return (
//       requestQuery.priority !== undefined && requestQuery.status !== undefined
//     );
//   };
//   const hasStatusProperty = (requestQuery) => {
//     return requestQuery.status !== undefined;
//   };
//   switch (true) {
//     case hasPriorityProperty(request.query):
//       console.log("2", request.query);
//       getTodosQuery = `
//           SELECT * FROM todo
//           WHERE todo LIKE '%${search_q}%'
//           AND priority = '${priority}';
//           `;
//       break;
//     default:
//       getTodosQuery = `
//       SELECT * FROM todo
//       WHERE todo LIKE '$%{search_q}%';
//       `;
//   }
//   data = await db.all(getTodosQuery);
//   response.send(data);
// });

// app.get("/todos", async (request, response) => {
//   let data = null;
//   let getTodosQuery = "";
//   const { search_q = "", priority, status } = request.query;
//   const hasPriorityAndStatus = (requestQuery) => {
//     return (
//       requestQuery.priority !== undefined && requestQuery.status !== undefined
//     );
//   };
//   const hasPriorityProperty = (requestQuery) => {
//     return requestQuery.priority !== undefined;
//   };
//   const hasStatusProperty = (requestQuery) => {
//     return requestQuery.status !== undefined;
//   };

//   switch (true) {
//     case hasPriorityAndStatus(request.query):
//       console.log("1", request.query);
//       getTodosQuery = `
//           SELECT * FROM todo
//           WHERE todo LIKE '%${search_q}%'
//           AND status = '${status}'
//           AND priority = '${priority}';
//           `;
//       break;
//     default:
//       getTodosQuery = `
//          SELECT * FROM todo
//          WHERE todo LIKE '$%{search_q}%';`;
//   }
//   data = await db.all(getTodosQuery);
//   response.send(data);
// });

app.get("/todos/", async (request, response) => {
  const { search_q } = request.query;
  let getQuery = "";
  const hasSearchqProperity = (requestQuery) => {
    return requestQuery.search_q !== undefined;
  };
  switch (true) {
    case hasSearchqProperity(request.query):
      getQuery = `
          SELECT * FROM todo 
          WHERE todo LIKE '%${search_q}%';
          `;
      break;
  }
  data = await db.all(getQuery);
  response.send(data);
});

app.get("/todos/:todoId/", async (request, response) => {
  const { todoId } = request.params;
  const getQuery = `
    SELECT * FROM todo
    WHERE id = ${todoId};
    `;
  const dbResponse = await db.get(getQuery);
  response.send(dbResponse);
});

app.post("/todos/", (request, response) => {});
