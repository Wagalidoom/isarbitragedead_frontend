// components/Block.tsx
import React from 'react';
import { BlockData } from './Blocks';

const Block: React.FC<BlockData> = ({ blockNumber, opportunities }) => {
  console.log(opportunities);
  const content = opportunities.length === 0
    ? (<p>No opportunities at this block</p>)
    : (opportunities.map((opportunity, index) => <p key={index}>Profit: {opportunity.profit}</p>));
  return (
    <div className="block-box">
      <h3>Block : {blockNumber}</h3>
      {content}
    </div>
  );
};

export default Block;
