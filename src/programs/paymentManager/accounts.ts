import { Program, Provider } from "@project-serum/anchor";
import type { Connection, PublicKey } from "@solana/web3.js";

import type { AccountData } from "../../utils";
import type { PAYMENT_MANAGER_PROGRAM, PaymentManagerData } from "./constants";
import { PAYMENT_MANAGER_ADDRESS, PAYMENT_MANAGER_IDL } from "./constants";

// TODO fix types
export const getPaymentManager = async (
  connection: Connection,
  paymentManagerId: PublicKey
): Promise<AccountData<PaymentManagerData>> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new Provider(connection, null, {});
  const paymentManagerProgram = new Program<PAYMENT_MANAGER_PROGRAM>(
    PAYMENT_MANAGER_IDL,
    PAYMENT_MANAGER_ADDRESS,
    provider
  );

  const parsed = await paymentManagerProgram.account.paymentManager.fetch(
    paymentManagerId
  );
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    parsed,
    pubkey: paymentManagerId,
  };
};

export const getPaymentManagers = async (
  connection: Connection,
  paymentManagerIds: PublicKey[]
): Promise<AccountData<PaymentManagerData>[]> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const provider = new Provider(connection, null, {});
  const paymentManagerProgram = new Program<PAYMENT_MANAGER_PROGRAM>(
    PAYMENT_MANAGER_IDL,
    PAYMENT_MANAGER_ADDRESS,
    provider
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  let paymentManagers = [];
  try {
    paymentManagers =
      await paymentManagerProgram.account.paymentManager.fetchMultiple(
        paymentManagerIds
      );
  } catch (e) {
    console.log(e);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return paymentManagers.map((pm, i) => ({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    parsed: pm,
    pubkey: paymentManagerIds[i],
  }));
};
