import React from 'react';

const Dog: () => JSX.Element = () => {
  return (
    <div>
      <h1>Look at this dog from App One!</h1>
      <img src="http://place-puppy.com/400x400" alt={undefined} />
    </div>
  );
};

export default Dog;
