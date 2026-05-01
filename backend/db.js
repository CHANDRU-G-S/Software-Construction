const oracledb = require("oracledb");

const dbConfig = {
  user: "bank_user",
  password: "582",
  connectString: "localhost/XEPDB1"
};

async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    console.log("✅ Database connected successfully");
    return connection;

  } catch (error) {
    console.error("❌ Database connection failed");
    console.error("Error message:", error.message);

    // Optional: handle specific Oracle errors
    if (error.message.includes("ORA-12541")) {
      console.error("Listener not running (check Oracle service)");
    } else if (error.message.includes("ORA-12154")) {
      console.error("Invalid connection string");
    } else if (error.message.includes("ORA-01017")) {
      console.error("Invalid username/password");
    }

    throw error; // rethrow so caller knows it failed
  }
}

module.exports = getConnection;