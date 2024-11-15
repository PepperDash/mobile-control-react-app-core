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


// // This data should move to a websocket message so as not to requre the local config file to be updated
// export interface AppConfigExtras extends AppConfig {
//   partnerMetadata?: PartnerMetadata[];
//   roomCombineStyles: {
//     wallFbStyle: BootstrapColor;
//   }
//   audioStyles?: {
//     audioVariant: AudioVariant;
//     volumeUpIconStyle: string;
//     volumeDownIconStyle: string;
//   }
// }


