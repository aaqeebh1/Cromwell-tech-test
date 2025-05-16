import sql from "./db.js"; 

async function testConnection() {
  try {
    // Perform a simple query to test the connection
    const result = await sql`SELECT 1+1 AS result`;
    console.log("Database connection successful!");
    console.log("Result of test query:", result[0].result);

    
  } catch (error) {
    console.error("Database connection failed:", error);
  } finally {
    // Close the connection pool when done
    await sql.end();
  }
}

testConnection();
