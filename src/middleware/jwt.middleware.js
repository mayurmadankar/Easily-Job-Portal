import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  // Get the token from the request header or session
  const token = req.cookies.jwtToken;
  // console.log(token);
  // Check if the token exists
  if (!token) {
    console.log("token not created");
    return res.status(401).send("Unauthorized");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, "Np1feZQmW6aIC44XK4KFRBFoSbbwG4tL");
    req.user = { email: decoded.email }; // Add the decoded payload (e.g., email) to the request object
    next(); // Pass control to the next handler
  } catch (ex) {
    return res.status(400).render("404.ejs", { message: "Invalid token." });
  }
};

export default jwtAuth;
