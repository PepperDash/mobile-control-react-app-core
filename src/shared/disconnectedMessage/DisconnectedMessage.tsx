const DisconnectedMessage = ({reconnect}: { reconnect: () => void}) => {
  
  return<>

    <div className="disconnected-message">
      <h1>Disconnected</h1>
      {/* <p>Reconnecting...</p> */}
      <button onClick={reconnect}>Reconnect Manually</button>
    </div>

  </>
}

export default DisconnectedMessage;