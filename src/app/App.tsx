import IconLibrary from '../lib/shared/Icons/IconLibrary';
import { MobileControlProvider } from '../lib/shared/MobileControlProvider/MobileControlProvider';
import { MainLayout } from '../lib/shared/layout/habanero/MainLayout/MainLayout';

function App() {
  return ( 
    <MobileControlProvider>
      <>
        {/* <RoomBusinessLogic> */}
       <MainLayout 
        header={<div>Logo and Header Stuff</div>}
        content={<IconLibrary />}
        footer={<div>I'm a Footer.  Put stuff here</div>}
        volume={<div>Volume Controls Here</div>}
      />   
      {/* </RoomBusinessLogic> */}
      </>
    </MobileControlProvider>
  )
}

export default App
