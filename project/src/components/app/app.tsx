import MainScreen from '../../pages/main/main-screen';

type AppScreenProps = {
  countRooms: number,
};


function App({countRooms}: AppScreenProps): JSX.Element {
  return (
    <MainScreen countRooms={countRooms}/>
  );
}

export default App;
