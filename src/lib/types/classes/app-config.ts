import { IconType } from '../../store/appConfig/appConfig.slice';

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


// This data should move to a websocket message so as not to requre the local config file to be updated
export interface AppConfigExtras extends AppConfig {
  partnerMetadata?: PartnerMetadata[];
  roomCombineStyles: {
    wallFbStyle: BootstrapColor;
  }
  audioStyles?: {
    audioVariant: AudioVariant;
    volumeUpIconStyle: string;
    volumeDownIconStyle: string;
  }
  techMenu?: {
    leftNav: {
      about: TechMenuNavItemConfig;
      audio: TechMenuNavItemConfig;
      changePin: TechMenuNavItemConfig;
      displays: TechMenuNavItemConfig;
      environment: TechMenuNavItemConfig;
      matrixRouting: TechMenuNavItemConfig;
      roomSetup: TechMenuNavItemConfig;
      setTopBox: TechMenuNavItemConfig;
      systemStatus: TechMenuNavItemConfig;
    }
  }
}

type BootstrapColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

type AudioVariant = "dangerFeedback";

export interface TechMenuNavItemConfig {
  label?: string;
  enabled?: boolean;
}

/**
 * @interface
 * Contains metadata for partners
 */
export interface PartnerMetadata {
  role: string;
  description: string;
  logoPath: string;
}
