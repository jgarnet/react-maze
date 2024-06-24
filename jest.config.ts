import type {Config} from "jest";

const config: Config = {
    preset: "ts-jest",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "ts-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@data/(.*)$": "<rootDir>/data/$1",
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: "jsdom"
};

export default config;