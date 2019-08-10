"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = env('PORT', '3978');
exports.BOT_SETTINGS = {
    appId: env('MSA_APP_ID', '8cf44991-6f55-4831-b938-92d959add7c2'),
    appPassword: env('MSA_PASSWORD', 'jX^6&HLVHX>-Vh_JEr+lHEx--0['),
    endpoint: env('BOT_ENDPOINT', '/api/messages'),
};
function env(name, defaultValue) {
    if (process.env.hasOwnProperty(name)) {
        return process.env[name];
    }
    else if (defaultValue !== undefined) {
        return defaultValue;
    }
    else {
        throw new Error(`Cannot find environment variable '${name}'`);
    }
}
exports.env = env;