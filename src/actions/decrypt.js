var base64js = require('base64-js');
var CryptoJS = require('crypto-js');
var util = require('util');

export function DecryptPassword(str) {
    var encryptionkey = 'cH8l3Fpp[s0ee<dqoi5GS0kKb9ZQxr6L3y5EJ4>vWain1tjE2';

    var buffer = base64js.toByteArray(str);
    var salt = buffer.slice(0, 8);
    var obj = getKeyAndIV(encryptionkey, salt);
    var clearText = CryptoJS.AES.decrypt(base64js.fromByteArray(buffer.slice(8)), obj.key, { iv: obj.iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);

    clearText = clearText.replace(/(.)./g, "$1");

    return clearText;
}

function convertUint8ArrayToWordArray(u8Array) {
    var words = [], i = 0, len = u8Array.length;

    while (i < len) {
        words.push(
            (u8Array[i++] << 24) |
            (u8Array[i++] << 16) |
            (u8Array[i++] << 8) |
            (u8Array[i++])
        );
    }

    return {
        sigBytes: words.length * 4,
        words: words
    };
}

function convertWordArrayToUint8Array(wordArray) {
    var len = wordArray.words.length,
        u8_array = new Uint8Array(len << 2),
        offset = 0, word, i
        ;
    for (i = 0; i < len; i++) {
        word = wordArray.words[i];
        u8_array[offset++] = word >> 24;
        u8_array[offset++] = (word >> 16) & 0xff;
        u8_array[offset++] = (word >> 8) & 0xff;
        u8_array[offset++] = word & 0xff;
    }
    return u8_array;
}

function getKeyAndIV(password, salt) {

    var keyBitLength = 256;
    var ivBitLength = 128;
    var iterations = 1000;

    var iv128Bits = CryptoJS.PBKDF2(password, convertUint8ArrayToWordArray(salt), { keySize: 128 / 8, iterations: iterations });
    var key256Bits = CryptoJS.PBKDF2(password, convertUint8ArrayToWordArray(salt), { keySize: 256 / 8, iterations: iterations });

    return {
        iv: convertUint8ArrayToWordArray(convertWordArrayToUint8Array(iv128Bits).slice(0, 16)),
        key: convertUint8ArrayToWordArray(convertWordArrayToUint8Array(key256Bits).slice(16, 48)),
    };
};
