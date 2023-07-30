import { useState } from 'react';
import World from './World';
import CollectionSpace from './CollectionSpace';

const HandleSpace = () => {
  const [isCollectionVisible, setIsColletionVisible] = useState(false);

  console.log(isCollectionVisible);

  return isCollectionVisible ? (
    <CollectionSpace setIsColletionVisible={setIsColletionVisible} />
  ) : (
    <World setIsColletionVisible={setIsColletionVisible} />
  );
};

export default HandleSpace;
