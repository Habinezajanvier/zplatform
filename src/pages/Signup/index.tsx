import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import signup from "../../assets/images/signup.png";
import ICONS from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState, SignupData } from "../../redux/types/types";
import { signupAction } from "../../redux/actions";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { signUpSchema } from "../../validators";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const { loading, error, authenticated, message } = useSelector(
    (action: RootState) => action.auth
  );

  React.useEffect(() => {
    if (error || authenticated) {
      setOpen(true);
    }
    setInterval(()=>{
      if(authenticated){
        navigate('/login')
      }
    }, 6000)
  }, [error, authenticated, navigate]);

  const initialValues: SignupData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(signupAction(values) as unknown as AnyAction);
    },
  });
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
                  src={signup}
                  alt="_signup_image"
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
                  Create your account
                </Typography>
                <form className="authForm" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      placeholder="John"
                      onChange={handleChange("firstname")}
                      onBlur={handleBlur("firstname")}
                      value={values["firstname"]}
                    />
                    {touched.firstname && errors.firstname && (
                      <span className="errors">{errors.firstname}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      placeholder="Doe"
                      onChange={handleChange("lastname")}
                      onBlur={handleBlur("lastname")}
                      value={values["lastname"]}
                    />
                    {touched.lastname && errors.lastname && (
                      <span className="errors">{errors.lastname}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="john@email.com"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values["email"]}
                    />
                    {touched.email && errors.email && (
                      <span className="errors">{errors.email}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values["password"]}
                    />
                    {touched.password && errors.password && (
                      <span className="errors">{errors.password}</span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Signup"}
                  </Button>
                  <Typography sx={{ width: "100%" }} component="div">
                    <Typography
                      sx={{ width: "100%" }}
                      color="#808080"
                      component="div"
                      variant="body1"
                    >
                      Have an account?{" "}
                      <span onClick={() => navigate("/login")}>Login</span>
                    </Typography>
                  </Typography>
                </form>
              </Card>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={authenticated ? "success" : "error"}
              sx={{ width: "100%" }}
            >
              {message || error}
            </Alert>
          </Snackbar>
        </Typography>
      </Box>
    </Box>
  );
}
