// components/Block.tsx
import React from 'react';
import { OpportunityData } from './BlockData';

interface BlockProps {
  data: OpportunityData;
}

const Block: React.FC<BlockProps> = ({ data }) => {
  return (
    <div className="block-box">
      {/* Render the block data however you'd like */}
      <p>Block : {data.blockNumber} Profit: {data.profit}</p>
    </div>
  );
};

export default Block;
