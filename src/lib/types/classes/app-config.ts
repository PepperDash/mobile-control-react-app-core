import { IconType } from 'src/lib/store/appConfig/appConfig.slice';

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
