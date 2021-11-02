import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { useWallet } from "@solana/wallet-adapter-react";

export default function useUser() {
  const { publicKey, connected } = useWallet();
  let { data, error } = useSWR(
    connected && `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${publicKey}`,
    fetcher
  );

  return {
    user: data,
    isAdmin: data && data.Role === "admin",
    connected,
    error,
  };
}
