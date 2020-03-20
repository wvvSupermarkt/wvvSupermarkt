import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../src/Link';
import { getLayout as getSiteLayout } from '../src/Layouts/SiteLayout';

const About = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About the "Live RegFileViewer"
        </Typography>
        <Link href="/">Back to Home</Link>
        <Typography variant="body1" gutterBottom>
          I'm currently working on this project, so stay tuned in 🥳
        </Typography>
      </Box>
    </Container>
  );
};

About.getLayout = getSiteLayout;

export default About;
