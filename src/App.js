
import './App.css';
import LeftScreen from './screens/leftscreen/LeftScreen';
import RightScreen from './screens/rightscreen/RightScreen';

function App() {


  return (
    <div className="app" >

          <div className="app__left">
              <LeftScreen/>
          </div>

          <div className="app__left">
              <RightScreen />
          </div>

    </div>
  );
}

export default App;
