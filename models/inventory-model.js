const pool = require("../database/");
// get all classification data

async function getClassifications() {
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
}
async function getInventoryByClassification(classificationId) {
  return await pool.query(
    "SELECT * FROM inventory WHERE classification_id = $1",
    [classificationId]
  );
}
module.exports = { getClassifications, getInventoryByClassification };
