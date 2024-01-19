import { IconType } from '../../store/appConfig.slice.ts';

/**
 * @interface
 * Contains configuration data for the MC application
 */
export interface AppConfig {
  enableDev: boolean;
  apiPath: string;
  gatewayAppPath: string;
  logoPath: string;
  iconSet: IconType;
  loginMode: string;
  modes: { [key: string]: unknown };
}
