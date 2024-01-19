import { Config, Message, MessageHandler } from "../types/state/index.ts";


export abstract class MainServiceBase {
    sessionStorageCodeKey = 'current-code';

    sessionStorageUuidKey = 'current-uuid';
  
    sessionStorageExpiryKey = 'current-uuid-expires';
  
    sessionStorageRoomKey = 'current-room-key';

    /**
     * System config from Essentials
     * SEE IF WE CAN DO AWAY WITH THIS
     * @deprecated
     */
    config: Config | null = null;

  
    /**
     * Indicates that the code has been changed by the API server
     */
    codeChanged: boolean = false;
  
  
    /** message handlers for various flavors of message */
    messageHandlers: MessageHandler[] = new Array<MessageHandler>();
  

  
    uiValues: Map<string, string> = new Map();
  


    websocketClient: WebSocket | null = null;

    abstract checkForIncomingRoomUuidOrCode(): void;

    abstract serverMessageHandler(res: string): void;  

    clearSessionStorage() {
        console.log('clearing Session storage');
        sessionStorage.removeItem(this.sessionStorageUuidKey);
        sessionStorage.removeItem(this.sessionStorageCodeKey);
        sessionStorage.removeItem(this.sessionStorageExpiryKey);
        sessionStorage.removeItem(this.sessionStorageRoomKey);
      }

  /**
   *
   * @param path
   * @param handler
   */
  addMessageHandler(path: string, handler: (msg: Message) => void) {
    this.messageHandlers.push(new MessageHandler(path, handler));
  }

  /**
   * Unregisters a message handler
   *
   * @param path
   * @param handler
   */
  removeMessageHandler(path: string, handler: (msg: Message) => void) {
    const currentHandler = this.messageHandlers.find(
      (h) => h.path.toLowerCase() === path.toLowerCase() && h.handler === handler,
    );
    console.log('mainService: Found a handler');
    if (currentHandler) {
      const i = this.messageHandlers.indexOf(currentHandler);
      if (i > -1) {
        console.log(`mainService: Removing handler for ${path}`);
        this.messageHandlers.splice(i, 1);
      }
    }
  }

  connectWebsocket = async (joinToken: string): Promise<void> => {
    this.token = joinToken;

    try {
      await this.joinWebsocket().toPromise();

      console.log(`Code expires ${this.roomData?.codeExpires}`);
      if (this.roomData?.codeExpires) {
        sessionStorage.setItem(this.sessionStorageExpiryKey, this.roomData.codeExpires.toString());
      } else {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        sessionStorage.setItem(this.sessionStorageExpiryKey, d.toISOString());
      }
      return await Promise.resolve();
    } catch (error) {
      console.log(`Cannot link to system.  May have gone offline. ${error}`);
      return Promise.reject(error);
    }
  };

    /**
   * Attempts to join the websocket
   */
    joinWebsocket(): Observable<void> {
      const wsPath = this.apiService.appConfig.apiPath.replace('http', 'ws');
      const wsurl = `${wsPath}/ui/join/${this.token}`;
      this.websocketClient = new WebSocket(wsurl);
      this.websocketClient.onopen = () => {
        this.isConnected = true;
  
        if (this.websocketClient) {
          this.websocketClient.onmessage = (e) => {
            this.serverMessageHandler(e.data);
          };
          this.websocketClient.onclose = (evt) => {
            console.log('Websocket closed', evt);
            if (evt.code === 4000) {
              console.log('user code changed');
              this.disconnectionMessage =
                "Room code has changed. Click 'Reconnect' to enter the new code.";
              this.codeChanged = true;
              this.roomCode = '';
              this.isConnected = false;
              sessionStorage.removeItem(this.sessionStorageCodeKey);
              console.log('CODE HAS EXPIRED');
              return;
            }
            if (evt.code === 4002) {
              this.disconnectionMessage =
                "Room configuration has changed. Click 'Reconnect' to re-join the room.";
              this.isConnected = false;
              this.codeChanged = false;
              return;
            }
  
            if (!this.serverIsRunningOnProcessorHardware) {
              this.disconnectionMessage =
                "Room is offline. Click 'Reconnect' to try again.  If the room is still offline you will be redirected to the rooms list.";
            } else {
              this.disconnectionMessage = "System is offline. Click 'Reconnect' to try again.";
            }
  
            this.codeChanged = false;
            this.isConnected = false;
          };
        }
        s.next();
        s.complete();
      };
      return s;
    }


  
    /**
     * Helper to send message
     */
    sendMessage(type: string, content?: any) {
      const msg = new Message(type, content);
      msg.clientId = this.clientId;
      this.sendMessageObject(msg);
    }
  
    /**
     * Senda a message object
     */
    sendMessageObject = (msg: Message) => {
      this.websocketClient?.send(JSON.stringify(msg));
    };
}