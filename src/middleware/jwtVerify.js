import jwt from "jsonwebtoken";

const jwtVerify = (req, res, next) => {
  const token = req.headers.authorization;
  const accessToken = token.split(" ")[1];

  if (!token) {
    return res.status(403).json({ msg: "Access token not found" });
  }

  try {
    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid Token" });
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).json({ msg: "Error retrieving token" });
  }
};

export default jwtVerify;
