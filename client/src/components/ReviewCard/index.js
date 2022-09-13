import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';

import { CardActionArea } from '@mui/material';

export default function ReviewCard({ cardData }) {
  return (
    <Card sx={{ maxWidth: '850px' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            textAlign="left"
            fontWeight="600"
          >
            {cardData.title}
          </Typography>
          <Rating
            size="medium"
            name="read-only"
            value={cardData.rating}
            icon={<CircleRoundedIcon fontSize="inherit" />}
            emptyIcon={<CircleRoundedIcon fontSize="inherit" />}
            readOnly
          />
        </Box>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          textAlign="left"
        >
          {cardData.username}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="left"
          mt={2}
        >
          {cardData.reviewText}
        </Typography>
      </CardContent>
    </Card>
  );
}
