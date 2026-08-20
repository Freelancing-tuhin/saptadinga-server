import { Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config/config";

const SALT_ROUNDS = 10;

export const isDuplicateUserEmailService = async (userModel: Model<any>, email: string): Promise<boolean> =>
	Boolean(await userModel.findOne({ email }));

export const hashPassword = async (password: string): Promise<string> => bcrypt.hash(password, SALT_ROUNDS);

export const comparePassword = async (inputPassword: string, dbPassword: string): Promise<boolean> =>
	bcrypt.compare(inputPassword, dbPassword);

export const generateJWT = async (jwtPayload: Record<string, unknown>): Promise<string> =>
	jwt.sign({ ...jwtPayload }, config.auth.jwtSecret as Secret, {
		expiresIn: config.auth.jwtExpiresIn
	} as SignOptions);

/** Builds a case-insensitive match for a Mongo query. */
export const convertCaseInsensitiveForQuery = (value: string): Record<string, unknown> => ({
	$regex: value,
	$options: "i"
});

export const auth = {
	isDuplicateUserEmailService,
	hashPassword,
	comparePassword,
	generateJWT,
	convertCaseInsensitiveForQuery
};
