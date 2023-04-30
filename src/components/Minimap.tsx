import { Box } from "@mui/material";

interface MinimapBlockProps {
    blockNumber: number;
    onClick: () => void;
    isHighLighted: boolean;
}

const MinimapBlock: React.FC<MinimapBlockProps> = ({ blockNumber, onClick, isHighLighted }) => {
    return (
        <Box onClick={onClick} style={isHighLighted ? { backgroundColor: 'yellow' } : undefined} sx={{ backgroundColor: '#ffffff', height: '30px', width: '50px', zIndex: 2, display: 'inline' }}></Box>
    );
};

export default MinimapBlock;