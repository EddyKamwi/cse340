const pool = require("../database/");

// insert profile image URL into the database

async function insertProfileImage(account_id, image_path) {
  try {
    const sql =
      "INSERT INTO avatar (account_id, avatar_path) VALUES ($1, $2) RETURNING *";
    return await pool.query(sql, [account_id, image_path]);
  } catch (error) {
    console.error("Error inserting profile image:", error);
    throw new Error("Database error while inserting profile image");
  }
}

async function getAvatarByAccountId(account_id) {
  try {
    const sql = "SELECT avatar_path FROM avatar WHERE account_id = $1";
    return await pool.query(sql, [account_id]);
  } catch (error) {
    console.error("failed to get the avatar");
  }
}

module.exports = {
  insertProfileImage,
  getAvatarByAccountId,
};
