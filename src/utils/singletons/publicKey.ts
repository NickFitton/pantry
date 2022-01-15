import { createPublicKey, KeyObject } from "crypto";
import { readFile } from "fs";

let publicKey: KeyObject | null;

const getPublicKey = async (): Promise<KeyObject> => {
  if (!publicKey) {
    const pkPem = await new Promise<Buffer>((resolve, error) =>
      readFile("public.pem", (err, data) => (err ? error(err) : resolve(data)))
    );
    publicKey = createPublicKey(pkPem);
  }
  return publicKey;
};

export { getPublicKey };
