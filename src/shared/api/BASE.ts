import { useRouter as useNextRouter } from "next/router";
export const BASE_URL = "http://studhouse.kz/api/v1";

export function useRouter() {
  return useNextRouter();
}