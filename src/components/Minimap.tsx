import { Box } from "@mui/material";

interface MinimapBlockProps {
    blockNumber: number;
    onClick: () => void;
}

const MinimapBlock: React.FC<MinimapBlockProps> = ({ blockNumber, onClick }) => {
    return (
        <Box onClick={onClick} sx={{ backgroundColor: '#ffffff', height: '30px', width: '50px', zIndex: 2, display: 'inline' }}></Box>
    );
};

export default MinimapBlock;