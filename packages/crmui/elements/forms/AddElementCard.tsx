import { Button, Card, CardActionArea } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useBoolean } from '@modules/hooks';
import { Stack } from '@mui/system';
import React from 'react';

const AddElementCard: React.FC<{
  children: (props: { toAdd: () => void }) => React.ReactElement;
  title: React.ReactNode;
}> = ({ title, children }) => {
  const [isAdd, { setTrue, setFalse }] = useBoolean(false);
  if (isAdd) {
    return children({ toAdd: setFalse });
  }
  return (
    <Card>
      <Stack sx={{ minHeight: 300, height: 1 }}>
        <Button
          onClick={setTrue}
          startIcon={<AddIcon />}
          color="primary"
          sx={{ height: 1 }}
        >
          {title}
        </Button>
      </Stack>
    </Card>
  );
};

export default AddElementCard;
