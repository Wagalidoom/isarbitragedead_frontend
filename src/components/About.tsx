import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const About = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', color: theme.palette.text.primary, marginTop: '10vh' }}>About</Typography>
      <Box sx={{ width: '70%', marginTop: '20px', padding: '20px' }}>
        <Typography sx={{ color: theme.palette.text.primary, fontSize: '17px' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
