import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Grid } from "@mui/material";
import world from "../../assets/images/world.png";
import ICONS from "../../assets/icons";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const cards = [
  {
    icon: ICONS.file,
    title: "Goverment Services",
    body: "Lorem ipsum dolar sit concectur dalr sit. Leberariusum Assemuna lea, lorem ispus dolar sit censectur laberosa lorem ipsm concectur",
    link: "#",
  },
  {
    icon: ICONS.document,
    title: "Recover Lost document",
    body: "Lorem ipsum dolar sit concectur dalr sit. Leberariusum Assemuna lea, lorem ispus dolar sit censectur laberosa lorem ipsm concectur",
    link: "#",
  },
  {
    icon: ICONS.pay,
    title: "Easy payment",
    body: "Lorem ipsum dolar sit concectur dalr sit. Leberariusum Assemuna lea, lorem ispus dolar sit censectur laberosa lorem ipsm concectur",
    link: "#",
  },
];

export default function Homepage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          py: 3,
          px: {
            xs: 3,
            sm: 5,
            md: 10,
          },
        }}
      >
        <Toolbar />
        <Typography>
          <Grid container spacing={2} sx={{ height: "85vh" }}>
            <Grid item sm={5} sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="div">
                <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
                  Don’t burn fuel to get service,
                  <br /> We are here to help you
                </Typography>
                <Typography variant="body1">
                  Lorem ipsum dolar sit concectur dalr sit. Leberariusum
                  Assemuna lea, lorem ispus dolar sit censectur laberosa lorem
                  ipsm concectur
                </Typography>
              </Typography>
            </Grid>
            <Grid item sm={7}>
              <Typography component="div">
                <img
                  src={world}
                  alt="_home_image"
                  loading="lazy"
                  width="100%"
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              width: {
                md: "80%",
              },
              margin: "0 auto",
            }}
          >
            {cards.map((item, i) => (
              <Grid key={i} item xs={12} sm={6} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      // <Typography component="div">
                      <Avatar src={item.icon} alt="card_avatar" />
                      // </Typography>
                    }
                    title={item.title}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      This impressive paella is a perfect party dish and a fun
                      meal to cook together with your guests. Add 1 cup of
                      frozen peas along with the mussels, if you like.
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button variant="contained" color="secondary">
                      Read more
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Typography>
      </Box>
    </Box>
  );
}
