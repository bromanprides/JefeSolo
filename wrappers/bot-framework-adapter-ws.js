"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const microsoft_bot_protocol_streamingextensions_1 = require("microsoft-bot-protocol-streamingextensions");
const url = require("url");
const upgraded_response_1 = require("./upgraded-response");
class BotFrameworkAdapterWebSocket {
    /**
     * Wraps the WebSocketConnector to support simplified http->WebSocket upgrade and routing
     * @param settings Optional adapter settings
     */
    constructor(settings) {
        this.settings = settings;
    }
    /**
     * Upgarde the Node.js http server to support bot WebSocket requests
     * @param server Standard Node.js http server
     * @param bot Bot logic
     */
    upgrade(server, bot) {
        const wsc = new microsoft_bot_protocol_streamingextensions_1.WebSocketConnector(bot);
        const { appId, appPassword, endpoint } = this.settings;
        server.on('upgrade', (req, socket, head) => __awaiter(this, void 0, void 0, function* () {
            const { pathname } = url.parse(req.url);
            if (!endpoint || pathname === endpoint) {
                try {
                    const res = new upgraded_response_1.UpgradedResponse(req, socket, head);
                    yield wsc.processAsync(req, res, { appId, appPassword });
                }
                catch (err) {
                    console.error(err);
                    socket.end();
                }
            }
            else {
                console.warn('WebSocket upgrade requested on invalid path: ' + pathname);
                socket.end();
            }
        }));
    }
}
exports.BotFrameworkAdapterWebSocket = BotFrameworkAdapterWebSocket;