const pool = require("../database/");

// check if the classification exists
async function checkClassificationExists(classificationName) {
  const result = await pool.query(
    "SELECT * FROM classification WHERE classification_name = $1",
    [classificationName]
  );
  return result.rowCount;
}

// get all classification data
async function getClassifications() {
  return await pool.query(
    "SELECT * FROM classification ORDER BY classification_name"
  );
}

// get classification by id
async function getClassificationById(classificationId) {
  return await pool.query(
    "SELECT * FROM classification WHERE classification_id = $1",
    [classificationId]
  );
}

// add a new classification
async function addClassification(classificationName) {
  return await pool.query(
    "INSERT INTO classification (classification_name) VALUES ($1)",
    [classificationName]
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
  return await pool.query("SELECT * FROM inventory WHERE inv_id = $1", [
    inventoryId,
  ]);
}

//check

// add a new inventory item
//  inv_make,inv_model,inv_year,inv_description,inv_image,inv_thumbnail,inv_price,inv_miles,inv_color
async function addInventory(
  invMake,
  invModel,
  invYear,
  invDescription,
  invImage,
  invThumbnail,
  invPrice,
  invMiles,
  invColor,
  classificationId
) {
  return await pool.query(
    "INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      invMake,
      invModel,
      invYear,
      invDescription,
      invImage,
      invThumbnail,
      invPrice,
      invMiles,
      invColor,
      classificationId,
    ]
  );
}

async function updateInventory(
  invId,
  invMake,
  invModel,
  invYear,
  invDescription,
  invImage,
  invThumbnail,
  invPrice,
  invMiles,
  invColor,
  classificationId
) {
  return await pool.query(
    "UPDATE inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11",
    [
      invMake,
      invModel,
      invYear,
      invDescription,
      invImage,
      invThumbnail,
      invPrice,
      invMiles,
      invColor,
      classificationId,
      invId,
    ]
  );
}

module.exports = {
  getClassifications,
  getInventoryByClassification,
  getInventoryById,
  addClassification,
  addInventory,
  getClassificationById,
  checkClassificationExists,
  updateInventory,
};
