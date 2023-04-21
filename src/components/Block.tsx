// components/Block.tsx
import React from 'react';

interface BlockProps {
  data: Record<string, any>;
}

const Block: React.FC<BlockProps> = ({ data }) => {
  return (
    <div>
      {/* Render the block data however you'd like */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Block;
