import React from "react";
import { Box, Button } from "@mui/material";
import Link from "next/link";

interface DictionaryPanelProps {
  createLink: string;
}

export const DictionaryPanel: React.FC<DictionaryPanelProps> = ({
  createLink,
}) => {
  return (
    <Box>
      <Button LinkComponent={Link} href={createLink}>
        Создать
      </Button>
    </Box>
  );
};
