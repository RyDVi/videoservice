import { Alert, List, ListItem, ListItemText } from '@mui/material';

const ListError: React.FC<{ error?: string[] }> = ({ error }) => (
  <List>
    {error?.map((errText, index) => (
      <ListItem key={index}>
        <ListItemText primary={<Alert severity="error">{errText}</Alert>} />
      </ListItem>
    ))}
  </List>
);

export default ListError;
