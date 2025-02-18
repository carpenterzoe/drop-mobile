import { useState, useEffect } from 'react';

const My = () => {
  const [state] = useState();

  useEffect(() => {
    console.log(state);
  }, []);
  return (
    <div>
      My
    </div>
  );
};
export default My;
