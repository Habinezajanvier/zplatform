import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import confirmed from "../../assets/images/comfirmed.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types/types";
import { verifyEmailAction } from "../../redux/actions";




export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(verifyEmailAction(searchParams.get("token") as string) as unknown as AnyAction)
  }, [dispatch, searchParams])

  const { verificationLoading, verificationError, verificationResponse } =
    useSelector((action: RootState) => action.auth);

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
            <Grid item sm={7}>
              <Typography component="div">
                <img
                  src={confirmed}
                  alt="_login_image"
                  loading="lazy"
                  width="100%"
                />
              </Typography>
            </Grid>
            <Grid item sm={5} sx={{ display: "flex", alignItems: "center" }}>
              <Card sx={{ backgroundColor: "#f1f1f1", width: "100%" }}>
                <Typography
                  color="#fff"
                  bgcolor="#2F4F6B"
                  component="div"
                  variant="h6"
                  sx={{ px: 4, py: 2 }}
                >
                  Email Verfication
                </Typography>
                <Typography component="div" sx={{display: "flex", flexDirection: "column", alignItems: "center", m:4}}>
                <Typography
                  component="div"
                  variant="body1"
                  sx={{mb: 6}}
                >
                  {verificationResponse || verificationError}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate('/login')}
                  sx={{ color: "#000" }}
                >
                  login
                </Button>
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Typography>
      </Box>
    </Box>
  );
}
