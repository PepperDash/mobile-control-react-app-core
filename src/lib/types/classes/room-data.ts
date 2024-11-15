export interface RoomData {
  clientId: string | number;
  roomKey: string;
  systemUuid: string;
  roomUuid: string;
  userAppUrl: string;
  config?: EssentialsConfig;
  userInteraceConfig?: UserInterfaceConfig;
  userCode: string;
  codeExpires?: Date;
  enableDebug?: boolean;
  qrUrl: string;
}

export interface UserInterfaceConfig {
  partnerMetadata?: PartnerMetadata[];
  customStyles?: Record<UiModes, unknown>;
  techMenuConfig?: {
    leftNav: Record<UiModes, TechMenuNavItemConfig>;
    // leftNav: {
    //   about: TechMenuNavItemConfig;
    //   audio: TechMenuNavItemConfig;
    //   changePin: TechMenuNavItemConfig;
    //   displays: TechMenuNavItemConfig;
    //   environment: TechMenuNavItemConfig;
    //   matrixRouting: TechMenuNavItemConfig;
    //   roomSetup: TechMenuNavItemConfig;
    //   setTopBox: TechMenuNavItemConfig;
    //   systemStatus: TechMenuNavItemConfig;
    // }
  }
}

interface TechMenuNavItemConfig {
  label?: string;
  enabled?: boolean;
}

type UiModes = 
"systemStatus" |
"matrixRouting" |
"displays" |
"audio" |
"setTopBox" |
"environment" |
"roomSchedule" |
"roomSetup" |
"changePin" |
"about";

// type BootstrapColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

// type AudioVariant = "dangerFeedback";

/**
 * @interface
 * Contains metadata for partners
 */
export interface PartnerMetadata {
  role: string;
  description: string;
  logoPath: string;
}

export interface EssentialsConfig {
  runtimeInfo: {
    pluginVersion: string;
    essentialsVersion: string;
    pepperDashCoreVersion: string;
    essentialsPlugins: { name: string; version: string }[];
  };
}