import User from '../models/userModel'; // Use default import
import bcrypt from 'bcryptjs';
import * as jwtUtils from '../utils/jwtUtils';

// Register a new user
export const registerUser = async (username: string, email: string, password: string) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of hashing

  // Create the user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
};

// Log in a user
export const loginUser = async (email: string, password: string) => {
  // Find the user by email
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid password');

  // Generate JWT token using the jwtUtils utility
  const token = jwtUtils.generateToken(user.id);

  return { user, token };
};

// Get user by ID
export const getUserById = async (userId: number) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');
  return user;
};
