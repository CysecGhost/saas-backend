import bcrypt from "bcrypt";
const salt_rounds = 12;
export const hashPassword = (password) => bcrypt.hash(password, salt_rounds);
export const verifyPassword = (password, hash) => bcrypt.compare(password, hash);
//# sourceMappingURL=hash.js.map