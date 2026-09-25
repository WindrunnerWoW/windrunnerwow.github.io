import { createPrivateKey, sign } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const encodedKey = process.env.CLIENT_MANIFEST_PRIVATE_KEY;
if (!encodedKey || !/^[A-Za-z0-9+/]{43}=$/.test(encodedKey)) {
  throw new Error('CLIENT_MANIFEST_PRIVATE_KEY must be a base64-encoded 32-byte Ed25519 seed');
}

const seed = Buffer.from(encodedKey, 'base64');
if (seed.length !== 32 || seed.toString('base64') !== encodedKey) {
  throw new Error('CLIENT_MANIFEST_PRIVATE_KEY must be a base64-encoded 32-byte Ed25519 seed');
}

const payload = readFileSync('client.json');
const payloadJson = payload.toString('utf8');
if (!Buffer.from(payloadJson, 'utf8').equals(payload)) {
  throw new Error('client.json must contain valid UTF-8');
}

// PKCS#8 wrapper for a raw 32-byte Ed25519 seed (RFC 8410).
const privateKey = createPrivateKey({
  key: Buffer.concat([Buffer.from('302e020100300506032b657004220420', 'hex'), seed]),
  format: 'der',
  type: 'pkcs8'
});

const manifest = JSON.stringify({
  keyId: 'client-prod-1',
  algorithm: 'Ed25519',
  signatureB64: sign(null, payload, privateKey).toString('base64'),
  payloadJson
}, null, 2) + '\n';

writeFileSync('client.manifest.json', manifest);
writeFileSync('static/client.manifest.json', manifest);
