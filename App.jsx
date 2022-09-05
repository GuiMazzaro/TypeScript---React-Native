import { StatusBar } from 'react-native';
import { Inicial } from './src/telas/Inicial';

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent
      />
      <Inicial />
    </>
  );
}
