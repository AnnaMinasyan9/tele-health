import AsyncStorage from "@react-native-async-storage/async-storage";
import { MOCK_SESSION_KEY } from "@shared/configs";
import { AuthSession, Credential, LoginResponse, User } from "@shared/models";
import { InternalAxiosRequestConfig } from "axios";
import { MockDB } from "../../models/db";
import { generateResponse, parseRequestData } from "../helpers";
import { VALIDATION_MESSAGES } from "../messages";
import { STATUS_CODES } from "../status-codes";

export const handleAuthLogin = async (db: MockDB, config: InternalAxiosRequestConfig) => {
    const { username, password } = parseRequestData<Credential>(config.data);

    const credential = db.credentials.find(
        (c) => c.username === username && c.password === password
    );

    if (!credential) {
        return generateResponse(config, STATUS_CODES.UNAUTHORIZED, {
            message: VALIDATION_MESSAGES.INVALID_USERNAME_OR_PASSWORD,
        });
    }

    const user: User | undefined =
        db.doctors.find((d) => d.username === username) ??
        db.patients.find((p) => p.username === username);

    if (!user) {
        return generateResponse(config, STATUS_CODES.NOT_FOUND, {
            message: VALIDATION_MESSAGES.USER_NOT_FOUND_FOR_CREDENTIAL,
        });
    }

    const authData: AuthSession = { id: user.id, role: user.role };
    await AsyncStorage.setItem(MOCK_SESSION_KEY, JSON.stringify(authData));

    return generateResponse(config, STATUS_CODES.OK, { user } as LoginResponse);
};