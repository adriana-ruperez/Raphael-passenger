import Constants from 'expo-constants';

type RuntimeConfig = {
  apiBaseUrl: string;
  defaultCountry: string;
  officePhone: string;
  officeSmsPhone: string;
  zonitelBaseUrl: string;
  zonitelClientId: string;
  zonitelMilanesTransportPhone: string;
  zonitelUserPrivateToken: string;
  zonitelVersion: number;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Partial<RuntimeConfig>;

export const env: RuntimeConfig = {
  apiBaseUrl:
    process.env.EXPO_PUBLIC_API_BASE_URL ??
    extra.apiBaseUrl ??
    'https://krasnovbw-001-site1.rtempurl.com/',
  defaultCountry: process.env.EXPO_PUBLIC_DEFAULT_COUNTRY ?? extra.defaultCountry ?? 'US',
  officePhone:
    process.env.EXPO_PUBLIC_OFFICE_PHONE ?? extra.officePhone ?? '4072594421',
  officeSmsPhone:
    process.env.EXPO_PUBLIC_OFFICE_SMS_PHONE ?? extra.officeSmsPhone ?? '4072594421',
  zonitelBaseUrl:
    process.env.EXPO_PUBLIC_ZONITEL_BASE_URL ??
    extra.zonitelBaseUrl ??
    'https://api.zonitel.com/',
  zonitelClientId:
    process.env.EXPO_PUBLIC_ZONITEL_CLIENT_ID ??
    extra.zonitelClientId ??
    'a775b9f3-3b25-403a-b335-72f7716b697f',
  zonitelMilanesTransportPhone:
    process.env.EXPO_PUBLIC_ZONITEL_MILANES_TRANSPORT_PHONE ??
    extra.zonitelMilanesTransportPhone ??
    '4072594421',
  zonitelUserPrivateToken:
    process.env.EXPO_PUBLIC_ZONITEL_USER_PRIVATE_TOKEN ??
    extra.zonitelUserPrivateToken ??
    'zpit-235cb71f-791e-42d1-9fa4-c01edec3bd8d',
  zonitelVersion: Number(
    process.env.EXPO_PUBLIC_ZONITEL_VERSION ?? extra.zonitelVersion ?? 3,
  ),
};
