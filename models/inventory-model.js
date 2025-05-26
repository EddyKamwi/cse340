const pool = require("../database/");
// get all classification data

async function getClassifications() {
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
}
module.exports = { getClassifications };
