"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bot_1 = require("./bot");
const settings_1 = require("./settings");
const bot_framework_adapter_connect_1 = require("./wrappers/bot-framework-adapter-connect");
const bot_framework_adapter_ws_1 = require("./wrappers/bot-framework-adapter-ws");
const { appId, appPassword, endpoint } = settings_1.BOT_SETTINGS;
const adapter = new bot_framework_adapter_connect_1.BotFrameworkAdapterConnect({ appId, appPassword });
const webSocketAdapter = new bot_framework_adapter_ws_1.BotFrameworkAdapterWebSocket({ appId, appPassword, endpoint });
const bot = new bot_1.HelloWorldBot();
const server = express()
    .post(endpoint, adapter.connect(bot))
    .listen(settings_1.PORT, () => console.log(`Listening on ${settings_1.PORT}. Connect to the bot using the Bot Framework Emulator.`));
webSocketAdapter.upgrade(server, bot);
