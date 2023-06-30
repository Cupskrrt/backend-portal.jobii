import jwt from "jsonwebtoken";

const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ msg: "Access token not found" });
  }

  try {
    jwt.verify(token, process.env.TOKEN_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ msg: "Error retrieving token" });
  }
};

export default jwtVerify;
