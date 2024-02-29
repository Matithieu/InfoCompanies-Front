import Typography from '@mui/joy/Typography';
import * as React from 'react';

interface TitleProps {
  children?: React.ReactNode;
}

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" level="h4" color="primary" >
      {props.children}
    </Typography>
  );
}
