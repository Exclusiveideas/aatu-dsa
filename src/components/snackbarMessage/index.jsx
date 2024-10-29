import { SnackbarProvider, useSnackbar } from 'notistack';
import useSnackbarStore from '@/store/snackbarStore';
import React, { useEffect } from 'react';

function SnackComponent() {
  const { enqueueSnackbar } = useSnackbar();
  
  const snackbarMessage = useSnackbarStore((state) => state.snackbarMessage);
  const snackbarVariant = useSnackbarStore((state) => state.snackbarVariant);
  const snackbarInitiated = useSnackbarStore((state) => state.snackbarInitiated);

  const handleClickVariant = () => {
    enqueueSnackbar(snackbarMessage, { variant: snackbarVariant, autoHideDuration: 3000  });
  };

  useEffect(() => {
    if(snackbarMessage) handleClickVariant();
  }, [snackbarInitiated])
  

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default function SnackbarMessage() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackComponent />
    </SnackbarProvider>
  );
}