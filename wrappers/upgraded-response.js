"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const CRLF = '\r\n';
const EMPTY = '';
const REASON = 'Connection Not Upgraded';
/**
 * Restify+Watershed compatible response object
 */
class UpgradedResponse extends http_1.ServerResponse {
    constructor(req, socket, head) {
        super(req);
        this.socket = socket;
        this.head = head;
    }
    claimUpgrade() {
        const { socket, head } = this;
        return { socket, head };
    }
    status(statusCode) {
        this.statusCode = statusCode;
    }
    send(codeOrData, body) {
        if (typeof codeOrData === 'number') {
            this.statusCode = codeOrData;
        }
        else {
            body = codeOrData;
        }
        this.body = body || '';
        this.end();
    }
    end() {
        const { socket, statusCode, statusMessage, body } = this;
        const content = [
            `HTTP/1.1 ${statusCode} ${statusMessage || REASON}`,
            'Connection: close',
            `Date: ${new Date().toUTCString()}`,
            EMPTY,
            body,
        ].join(CRLF);
        socket.write(content);
        socket.end();
    }
}
exports.UpgradedResponse = UpgradedResponse;