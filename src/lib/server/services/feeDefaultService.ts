import { resolveFeeDefault, type FeeRates } from "@/lib/feeDefaults";
import {
  deleteFeeDefault,
  findFeeDefaults,
  upsertFeeDefault,
} from "@/lib/server/repositories/feeDefaultRepository";

export function getFeeDefaults() {
  return findFeeDefaults();
}

export async function getFeeRatesForYear(year: number): Promise<FeeRates> {
  return resolveFeeDefault(await findFeeDefaults(), year);
}

export async function setFeeDefault(jahr: number, regular: number, student: number) {
  await upsertFeeDefault(jahr, regular, student);
}

export async function removeFeeDefault(jahr: number) {
  await deleteFeeDefault(jahr);
}
