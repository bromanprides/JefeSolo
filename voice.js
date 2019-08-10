"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function voice(voiceId, language) {
    return (text) => {
        return `
    <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">
      <voice name="${voiceId}">${text}</voice>
    </speak>`;
    };
}
exports.voice = voice;