import { KeyLike } from "jose";
import * as crypto from "crypto";
import { readFile } from "fs";

let privateKey: KeyLike | null;

const getPrivateKey = async (): Promise<KeyLike> => {
  if (!privateKey) {
    const pkPem = await new Promise<Buffer>((resolve, error) =>
      readFile("key.pem", (err, data) => (err ? error(err) : resolve(data)))
    );
    privateKey = crypto.createPrivateKey(pkPem);
  }
  return privateKey;
};

export { getPrivateKey };
