import { Account } from "next-auth";

export function getAccountData(userId: string, account: Account) {
  return {
    type: account.type,
    provider: account.provider,
    providerAccountId: account.providerAccountId,
    access_token: account.access_token ?? undefined,
    expires_at: account.expires_at ?? undefined,
    token_type: account.token_type ?? undefined,
    scope: account.scope ?? undefined,
    id_token: account.id_token ?? undefined,
    session_state: account.session_state?.toString() ?? null,
    refresh_token: account.refresh_token ?? undefined,
  };
}
