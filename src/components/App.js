import { useEffect } from 'react';
import { getPosts } from '../api';

function App() {
  useEffect(async () => {
    const response = await getPosts();
    console.log('response', response);
  }, []);
  return (
    <div className="App">
      <h1>Hello World!</h1>
    </div>
  );
}

export default App;
