import { Box } from "@mui/material";

interface MinimapBlockProps {
    blockNumber: number;
    onClick: () => void;
    isHighLighted: boolean;
}

const MinimapBlock: React.FC<MinimapBlockProps> = ({ blockNumber, onClick, isHighLighted }) => {
    return (
        <Box onClick={onClick} style={isHighLighted ? { backgroundColor: '#e64d43' } : undefined} sx={{ backgroundColor: '#ffffff', height: '10px', width: '50px', zIndex: 2, display: 'inline', marginBottom: '5px' }}></Box>
    );
};

export default MinimapBlock;