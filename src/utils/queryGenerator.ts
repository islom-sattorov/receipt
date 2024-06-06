export type Query = Record<string, string | number>;

export function queryGenerator(queries: Query) {
  let query = "";

  for (let i = 0; i < Object.keys(queries).length; i++) {
    query += Object.keys(queries)[i];
    query += `=${queries[Object.keys(queries)[i]]}`;

    if (i < Object.keys(queries).length - 1) {
      query += "&";
    }
  }

  return query;
}
