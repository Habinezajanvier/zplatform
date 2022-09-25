import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import forget from "../../assets/images/forget.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { AnyAction } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types/types";
import { resetPasswordAction } from "../../redux/actions";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { resetPassword } from "../../validators";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams()
  const [open, setOpen] = React.useState(false);

  const { loading, error, success, message } = useSelector(
    (action: RootState) => action.auth
  );

  const initialValues = {
    password: "",
    re_password: "",
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

  const { handleChange, setFieldValue, handleBlur, handleSubmit, values, errors, touched, setErrors } =
    useFormik({
      initialValues,
      validationSchema: resetPassword,
      onSubmit: (values) => {
        if(values.password !== values.re_password){
            setErrors({re_password: "Both Password have to match"});
        }else{
            const token = searchParams.get("token") as string;
            dispatch(resetPasswordAction(token, values) as unknown as AnyAction);
        }
      },
    });

    React.useEffect(() => {
        if (error || success) {
          setOpen(true);
          Object.keys(values).forEach((value)=>{
            setFieldValue(value, "")
            setErrors({[value]: undefined})
        })
        }
      }, [error, success, setFieldValue, values]);
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
                  src={forget}
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
                  Reset Your Password
                </Typography>
                <form className="authForm" onSubmit={handleSubmit}>
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
                  <div>
                    <label htmlFor="password">Re-Enter your password</label>
                    <input
                      id="re_password"
                      name="re_password"
                      type="password"
                      onChange={handleChange("re_password")}
                      onBlur={handleBlur("re_password")}
                      value={values["re_password"]}
                    />
                    {touched.re_password && errors.re_password && (
                      <span className="errors">{errors.re_password}</span>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={loading}
                  >
                    {loading ? "Loading ..." : "Reset"}
                  </Button>
                </form>
              </Card>
            </Grid>
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={success ? "success" : "error"}
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
