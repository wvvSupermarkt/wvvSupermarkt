import React from 'react';
import { Container, Box, Typography, Divider } from '@material-ui/core';
import { getLayout as getSiteLayout } from '../src/Layouts/SiteLayout';
import Link from '../src/Link';
import RegSheetsStepper from '../src/RegSheetsStepper';

const Index = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>

        <Typography variant="h4" component="h1" gutterBottom>
          Live Reg-Sheets-Viewer
        </Typography>
        <Link href="/about">
          About this project
        </Link>
        <Divider style={{ margin: "16px 0" }} />
        <RegSheetsStepper />

      </Box>
    </Container>
  );
};

Index.getLayout = getSiteLayout;

export default Index;
