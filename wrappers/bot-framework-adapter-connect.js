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
const botbuilder_1 = require("botbuilder");
class BotFrameworkAdapterConnect extends botbuilder_1.BotFrameworkAdapter {
    /**
     * Extends the BotFrameworkAdapter to support simplified Connect-style middleware
     * @param settings Optional adapter settings
     */
    constructor(settings) {
        super(settings);
        this.onTurnError = (context, error) => __awaiter(this, void 0, void 0, function* () {
            console.error('[ Unhandled Error ]', error);
            yield context.sendActivity(`Oops, something went wrong! Check your bot's log.`);
        });
    }
    /**
     * Execute bot logic as Connect-style middleware
     * @param botOrLogic Bot implementation or callback handler to run business logic
     */
    connect(botOrLogic) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const logic = typeof botOrLogic === 'function'
                    ? botOrLogic
                    : (context) => botOrLogic.run(context);
                yield this.processActivity(req, res, logic);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.BotFrameworkAdapterConnect = BotFrameworkAdapterConnect;