import jwt from 'jsonwebtoken';

// Sign a JWT token
export const generateToken = (userId: number) => {
  const payload = { userId };
  const secretKey = process.env.JWT_SECRET!;
  const options = { expiresIn: '1h' }; // Token expires in 1 hour

  return jwt.sign(payload, secretKey, options);
};

// Verify the JWT token
export const verifyToken = (token: string) => {
  const secretKey = process.env.JWT_SECRET!;
  return jwt.verify(token, secretKey) as { userId: number };  // Decode and return userId
};
