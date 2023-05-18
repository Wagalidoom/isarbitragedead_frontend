import { Typography, Box } from '@mui/material';
import { AwesomeButton, AwesomeButtonProgress, AwesomeButtonSocial } from "react-awesome-button";
import { useTheme } from '@mui/material/styles';

const About = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h2" sx={{ textAlign: 'center', color: theme.palette.text.secondary, marginTop: '10vh' }}>About</Typography>
      <Box sx={{ width: '70%', marginTop: '20px', padding: '20px' }}>
        <div>
          <Typography sx={{ color: theme.palette.text.secondary }} variant="h4" align="justify" gutterBottom>
            What is this website?
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary, fontSize: 17,  marginBottom: 4 }} align="justify" gutterBottom>
            This is a website showcasing the fruits of our labor: the opportunities identified by our real-time arbitrage bot. It is developed in NodeJS, integrating mathematical and statistical techniques, artificial intelligence, and of course, interactions with Web3. Although theoretically exploitable, we do not advise trying to take advantage of the opportunities displayed on this site. Indeed, many players compete to seize these opportunities and have optimized infrastructures. We emphasize that these results are publicly shared for educational purposes, and we are not responsible for any derivative use of this site.
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }} variant="h4" align="justify" gutterBottom>
            Who are we?
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary, fontSize: 17,  marginBottom: 4 }} align="justify" gutterBottom>
            We are two freelancers, Lukas and Jordan, operating in Web3 and Artificial Intelligence, respectively. We aim to improve this bot to capture a wider spectrum of MEV related to arbitrage. Currently, our bot broadcasts "SingleHop" opportunities (ie: only passing through one intermediate token). A cyclic arbitrage solution with N hops is under development, with the intention to roll it out once a stable version is ready. In the future, we plan to extend the number of exchanges considered in our calculations.
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }} variant="h4" align="justify" gutterBottom>
            What is arbitrage?
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary, fontSize: 17,  marginBottom: 4 }} align="justify" gutterBottom>
            Arbitrage is a MEV strategy that involves profiting from price differences between different markets for the same asset. To put it simply, it's about buying an asset at a lower price on one market, then simultaneously selling it at a higher price on another market, thus realizing a risk-free profit. In our case, our arbitrage bot scans real-time price differences between various cryptocurrency exchange platforms and highlights arbitrage opportunities.
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }} variant="h4" align="justify" gutterBottom>
            Contact
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary, fontSize: 17,  marginBottom: 4 }} align="justify" gutterBottom>
            We maintain this arbitrage bot thanks to the income generated from freelance missions. If you have needs in the domains of Web3, AI or ChatGPT, we're just an email away:<br /><br />
            <Typography sx={{ color: theme.palette.text.primary, fontSize: 17 }}>
              <b><u> Lukas B.</u>  <i>Freelance in Web3, NFT, Blockchain Dev: maillukas</i></b><br />
              <b><u>Jordan C.</u> Freelance in AI, Computer Vision and ChatGPT Expert: bouton</b>
            </Typography>
          </Typography>
          <Typography sx={{ color: theme.palette.text.secondary }} variant="h4" align="justify" gutterBottom>
            Sources
          </Typography>
          <Typography sx={{ color: theme.palette.text.primary, fontSize: 17 }} align="justify" gutterBottom>
            Frontend sources are available on GitHub : <AwesomeButtonSocial type="github" href="https://github.com/Wagalidoom/isarbitragedead_frontend"><div/></AwesomeButtonSocial>
          </Typography>
        </div>
      </Box>
    </Box>
  );
};

export default About;
