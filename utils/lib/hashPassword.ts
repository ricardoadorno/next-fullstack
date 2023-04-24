import bcrypt from "bcrypt";

export function hashPassword(pass: string) {
  return bcrypt.hashSync(pass, 10);
}

export function comparePassword(pass: string, hashedPassword: string) {
  return bcrypt.compare(pass, hashedPassword);
}
