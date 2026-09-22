/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CrComLib } from '@pepperdash/ch5-crcomlib-lite';

declare global {
  interface Window {
    CrComLib: typeof CrComLib;
    WebXPanel: any;
  }
}

export {};
