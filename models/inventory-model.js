const pool = require("../database/");

// get all classification data
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
}
// get inventory by classification id
async function getInventoryByClassification(classificationId) {
  return await pool.query(
    "SELECT * FROM inventory WHERE classification_id = $1",
    [classificationId]
  );
}
// get inventory by id
async function getInventoryById(inventoryId) {
  return await pool.query(
    "SELECT * FROM inventory WHERE inv_id = $1",
    [inventoryId]
  );
}
module.exports = { getClassifications, getInventoryByClassification, getInventoryById };
