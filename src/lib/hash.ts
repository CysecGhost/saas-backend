import bcrypt from "bcrypt";

const salt_rounds = 12;

export const hashPassword = (password: string) => bcrypt.hash(password, salt_rounds);

export const verifyPassword = (password: string, hash: string) => bcrypt.compare(password, hash);