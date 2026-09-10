export interface InquiryInput {
  requestId: string;
  name: string;
  email: string;
  organization: string;
  interest: string;
  message: string;
  website: string;
}

export function validateInquiry(input: unknown): InquiryInput | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const raw = input as Record<string, unknown>;
  const limits = {
    requestId: 36,
    name: 100,
    email: 254,
    organization: 160,
    interest: 160,
    message: 2000,
    website: 200,
  };
  const value: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof raw[key] !== 'string') return null;
    value[key] = (raw[key] as string).trim();
    if (value[key].length > limit || value[key].includes('\0')) return null;
  }
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value.requestId,
    )
  )
    return null;
  const emailPattern =
    /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
  if (
    !value.name ||
    !value.interest ||
    !value.message ||
    !emailPattern.test(value.email)
  )
    return null;
  return value as unknown as InquiryInput;
}

export function isInboxOwner(
  email: string | null,
  ownerEmail: string | undefined,
): boolean {
  return (
    !!email &&
    !!ownerEmail &&
    email.trim().toLowerCase() === ownerEmail.trim().toLowerCase()
  );
}
