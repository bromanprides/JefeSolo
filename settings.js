"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = env('PORT', '3978');
exports.BOT_SETTINGS = {
    appId: env('MicrosoftAppId', '83d35b64-03c7-4ec9-a78b-9d65a36e2b73'),
    appPassword: env('MicrosoftAppPassword', '(3Mb>j28ee#>a|?-s)!3h)nLJa1(ZA'),
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