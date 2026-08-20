"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.convertCaseInsensitiveForQuery = exports.generateJWT = exports.comparePassword = exports.hashPassword = exports.isDuplicateUserEmailService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config/config"));
const SALT_ROUNDS = 10;
const isDuplicateUserEmailService = (userModel, email) => __awaiter(void 0, void 0, void 0, function* () { return Boolean(yield userModel.findOne({ email })); });
exports.isDuplicateUserEmailService = isDuplicateUserEmailService;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () { return bcryptjs_1.default.hash(password, SALT_ROUNDS); });
exports.hashPassword = hashPassword;
const comparePassword = (inputPassword, dbPassword) => __awaiter(void 0, void 0, void 0, function* () { return bcryptjs_1.default.compare(inputPassword, dbPassword); });
exports.comparePassword = comparePassword;
const generateJWT = (jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(Object.assign({}, jwtPayload), config_1.default.auth.jwtSecret, {
        expiresIn: config_1.default.auth.jwtExpiresIn
    });
});
exports.generateJWT = generateJWT;
/** Builds a case-insensitive match for a Mongo query. */
const convertCaseInsensitiveForQuery = (value) => ({
    $regex: value,
    $options: "i"
});
exports.convertCaseInsensitiveForQuery = convertCaseInsensitiveForQuery;
exports.auth = {
    isDuplicateUserEmailService: exports.isDuplicateUserEmailService,
    hashPassword: exports.hashPassword,
    comparePassword: exports.comparePassword,
    generateJWT: exports.generateJWT,
    convertCaseInsensitiveForQuery: exports.convertCaseInsensitiveForQuery
};
