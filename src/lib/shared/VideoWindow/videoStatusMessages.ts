export const INVALID_URL = -9002;

/**
 * Messages for the status codes the panel returns in a video response.
 */
export const videoStatusMessages: Record<number, string> = {
  0: 'success',
  1: 'HDMI no sync',
  2: 'DM no stream',
  [-1]: 'connection refused / camera offline',
  [-2]: 'no network',
  [-1001]: 'Credentials required or invalid',
  [-1002]: 'Hostname invalid',
  [-1003]: 'Unsupported codec',
  [-9001]: 'Unsupported source type',
  [INVALID_URL]: 'Invalid URL',
  [-9003]:
    'Request for greater than maximum simultaneous sessions per source type',
  [-9004]: 'Request for greater than maximum simultaneous sessions per device',
  [-9007]: 'Unknown Error Message',
  [-9008]: 'HDCP error when using HDMI input',
};
