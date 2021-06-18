import bcrypt from 'bcryptjs';
const ITERATIONS = 12;

export const hashPassword = async (password: string) : Promise<string> => {
 const hash = await bcrypt.hash(password, ITERATIONS);
 return hash;
};

export const matchPassword = async (password: string, hash : string) : Promise<Boolean> => {
 const match = await bcrypt.compare(password, hash);
 return match;
};