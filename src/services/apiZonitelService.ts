import { RequestCallbackFormValues } from '@/src/features/passenger/schemas/requestCallbackSchema';
import { SmsRequest } from '@/src/models/zonitel/SmsRequest';
import { ZonitelSettings } from '@/src/models/zonitel/ZonitelSettings';
import { env } from '@/src/config/env';
import { normalizePhone } from '@/src/utils/phone';

export class ApiZonitelService {
  private readonly settings: ZonitelSettings;

  constructor() {
    this.settings = {
      baseUrl: env.zonitelBaseUrl,
      clientId: env.zonitelClientId,
      milanesTransportPhone: env.zonitelMilanesTransportPhone,
      userPrivateToken: env.zonitelUserPrivateToken,
      version: env.zonitelVersion,
    };
  }

  async sendSMSMessagePassengerRequestsCallback(
    payload: RequestCallbackFormValues,
  ): Promise<boolean> {
    try {
      if (!this.settings.baseUrl) {
        return false;
      }

      if (!this.settings.clientId || !this.settings.userPrivateToken) {
        return false;
      }

      if (!this.settings.milanesTransportPhone || !env.officeSmsPhone) {
        return false;
      }

      const endpoint = new URL(
        `api/v${this.settings.version}/integrations/sms/send`,
        this.settings.baseUrl,
      );

      const smsBody: SmsRequest = {
        from: `+1${this.settings.milanesTransportPhone}`,
        text:
          `Passenger callback request.\n` +
          `Name: ${payload.fullName.trim()}\n` +
          `Phone: ${normalizePhone(payload.phoneNumber)}`,
        to: `+1${normalizePhone(env.officeSmsPhone)}`,
      };

      const response = await fetch(endpoint.toString(), {
        body: JSON.stringify(smsBody),
        headers: {
          Authorization: `Bearer ${this.settings.userPrivateToken}`,
          'Content-Type': 'application/json',
          'X-Client-Id': this.settings.clientId,
        },
        method: 'POST',
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}
