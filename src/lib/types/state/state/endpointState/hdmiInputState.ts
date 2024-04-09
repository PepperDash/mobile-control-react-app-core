export interface HdmiInputState {
  key: string;
  hdcpCapability: HdcpCapabilityType;
  syncDetected: boolean;
  currentResolution: string;
  audioChannelCount: number;
  audioFormat: string;
  colorspaceMode: string;
  hdrType: string;
}

export type HdcpCapabilityType =
  | "HdcpSupportOff"
  | "HdcpVersionUnknown"
  | "hdcp2xSupport"
  | "HdcpAutoSupport"
  | "Hdcp1xSupport"
  | "Hdcp2_2Support";
