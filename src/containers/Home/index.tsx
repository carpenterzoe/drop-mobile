import { useState, useEffect } from 'react';

const Home = () => {
  const [state] = useState();

  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <div>
      Home
    </div>
  );
};
export default Home;
