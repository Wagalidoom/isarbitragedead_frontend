import { Box, Typography, Avatar, IconButton, useTheme } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { styled } from "@mui/system";
import ReactGA from 'react-ga4';

interface IProfileCard {
    imageUrl: string;
    name: string;
    title: string;
    domain: string;
    linkedin: string;
    github: string;
    email: string;
}

const ProfileCard: React.FC<IProfileCard> = ({ imageUrl, name, title, domain, linkedin, github, email }) => {
    const theme = useTheme();

    const CardContainer = styled(Box)({
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateRows: "repeat(3, auto)",
        alignItems: "center",
        gap: 1,
        backgroundColor: theme.colors.backgroundSides,
        borderRadius: "10px",
        marginBottom: "10px",
        padding: '10px',
        paddingRight: '20px',
        paddingLeft: '20px',
        width: '50%',
        margin: 'auto'
    });

    const PersonInfo = styled(Box)({
        display: "flex",
        alignItems: "center",
    });

    const PersonDetails = styled(Box)({
        marginLeft: "20px",
    });

    const IconContainer = styled(Box)({
        marginLeft: "20px"
    });

    return (
        <CardContainer>
            <PersonInfo>
                <Avatar src={imageUrl} alt={name} sx={{ width: 70, height: 70 }} />
                <PersonDetails>
                    <Typography variant="h6" fontWeight={'bold'}><u>{name}</u></Typography>
                    <Typography variant="subtitle1" fontWeight={'bold'}>{title}</Typography>
                    <Typography variant="subtitle2">{domain}</Typography>
                </PersonDetails>
            </PersonInfo>
            <IconContainer>
                <IconButton onClick={() => {
                    window.open(linkedin, "_blank");
                    ReactGA.event({
                        category: "Contact",
                        action: "Clicked",
                        label: `LinkedIn of ${name}`
                    });
                    }}>
                    <LinkedInIcon />
                </IconButton>
                <IconButton onClick={() => {
                    window.open(github, "_blank");
                    ReactGA.event({
                        category: "Contact",
                        action: "Clicked",
                        label: `GitHub of ${name}`
                    });
                    }}>
                    <GitHubIcon />
                </IconButton>
                <IconButton onClick={() => {
                    window.open(`mailto:${email}`, "_blank");
                    ReactGA.event({
                        category: "Contact",
                        action: "Clicked",
                        label: `Email of ${name}`
                    });
                    }}>
                    <EmailIcon />
                </IconButton>
            </IconContainer>
        </CardContainer>
    );
};

export default ProfileCard;
