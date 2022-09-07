import { Card, CardContent, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";

function PostingBoard() {
  return (
    <Card sx={{ marginBottom: "1rem" }}>
      <CardContent>
        <Stack>
          <Typography variant="h6">Share your experience</Typography>
          <Typography variant="body1">Create Post</Typography>
          <Typography variant="body1">Write review</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default PostingBoard;
