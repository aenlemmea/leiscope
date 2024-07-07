/* eslint react/prop-types: 0*/
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// TODO: Fix the white outline when the card is selected
export default function VideoCard(props) {
  const imageURL = props.imageURL;
  const title = props.title;
  const author = props.author;
  const height = props.height;
  return (
    <Card
      sx={{
        backgroundColor: "black",
        color: "white",
        width: "22%",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height={height}
          image={imageURL}
          alt={title}
          sx={{ objectFit: "fill" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="grey">
            {author}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
