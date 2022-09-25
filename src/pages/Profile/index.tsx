import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar, Grid, Input } from "@mui/material";
import Card from "@mui/material/Card";
import VerifiedIcon from "@mui/icons-material/Verified";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import home from "../../assets/images/home.png";
import ICONS from "../../assets/icons";
import { useNavigate, useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { AnyAction } from "redux";
import { HTMLInputEvent, UserData } from "../../redux/types/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/types/types";
import {
  uploadProfileImage,
  getSelfProfile,
  updateUser,
  logoutUser
} from "../../redux/actions";
import { useFormik } from "formik";
import { profileSchema } from "../../validators/index";

const list = ["Personal Infos", "Documents", "Settings"];

export default function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const {
    profile,
    profileProgress,
    updateLoading,
    updateSuccess,
    profileLink,
  } = useSelector((action: RootState) => action.users);

  const initialValues: UserData = {
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    nationality: "",
    profile: "",
  };

  const onFileChange = (e?: HTMLInputEvent) => {
    const accepted = ["image/png", "image/jpeg"];
    const selected = e?.target?.files ? e?.target?.files[0] : null;

    if (selected && accepted.includes(selected.type)) {
      dispatch(uploadProfileImage(selected) as unknown as AnyAction);
    } else {
      const errorMsg = "Selected file is not an image type";
      // toast.error(errorMsg);
    }
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateUser({...profile, ...values}) as unknown as AnyAction);
    },
  });

  React.useEffect(() => {
    dispatch(getSelfProfile() as unknown as AnyAction);
  }, [dispatch]);

  React.useEffect(() => {
    Object.keys(profile).forEach((key) => {
      setFieldValue(key, profile[key]);
    });
  }, [profile, setFieldValue]);

  const handleLogout =()=>{
    dispatch(logoutUser() as unknown as AnyAction)
    navigate("/login");
  }

  return (
    // <Box >
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
        <Grid container spacing={2} sx={{ minHeight: "85vh" }}>
          <Grid item sm={4}>
            <Card
              sx={{
                backgroundColor: "#f1f1f1",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                py: 6,
              }}
            >
              <Typography sx={{ position: "relative" }}>
                <Avatar
                  alt={`${profile.firstname} ${profile.lastname}`}
                  src={profile.profile || profileLink}
                  sx={{ width: 90, height: 90 }}
                />
                <Fab
                  size="small"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    zIndex: 1000,
                  }}
                >
                  {profileProgress ? (
                    `${profileProgress}%`
                  ) : (
                    <label
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                      }}
                      htmlFor="icon-button-file"
                    >
                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={onFileChange as any}
                        style={{ display: "none" }}
                      />
                      <EditIcon color="secondary" />
                    </label>
                  )}
                </Fab>
              </Typography>
              <Typography
                component="p"
                variant="body1"
                sx={{ fontWeight: "bold" }}
              >
                {profile.email}
              </Typography>
              <Typography
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  component="p"
                  variant="body1"
                  sx={{ fontWeight: "bold" }}
                >
                  {profile.firstname} {profile.lastname}
                </Typography>
                <VerifiedIcon color="secondary" />
              </Typography>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                sx={{ my: 4 }}
                variant="contained"
                color="secondary"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
              <Typography />
              <List sx={{ width: "90%" }}>
                {list.map((item) => (
                  <ListItem
                    sx={{ width: "100%", color: "#0389FF" }}
                    key={item}
                    disablePadding
                  >
                    <ListItemButton sx={{ width: "100%" }}>
                      <ListItemText color="secondary" primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Typography
                component="div"
                sx={{
                  width: "90%",
                }}
              >
                <Button onClick={handleLogout} sx={{ color: "#0389FF" }}>Logout</Button>
              </Typography>
            </Card>
          </Grid>
          <Grid item sm={8} sx={{ alignItems: "center" }}>
            <Card sx={{ backgroundColor: "#f1f1f1", width: "100%" }}>
              <Typography
                color="#fff"
                bgcolor="#2F4F6B"
                component="div"
                variant="h6"
                sx={{ px: 4, py: 2 }}
              >
                Personal Information
              </Typography>
              <form onSubmit={handleSubmit} className="authForm">
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    disabled={!isEditing}
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
                    disabled={!isEditing}
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
                  <label htmlFor="gender">Gender</label>
                  <select
                    disabled={!isEditing}
                    name="gender"
                    id="gender"
                    onChange={handleChange("gender")}
                  >
                    <option selected={values["gender"] === "male"} value="male">
                      Male
                    </option>
                    <option
                      selected={values["gender"] === "female"}
                      value="female"
                    >
                      Female
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    disabled={!isEditing}
                    type="date"
                    name="dob"
                    id="dob"
                    placeholder="12/12/2000"
                    onChange={handleChange("dob")}
                    onBlur={handleBlur("dob")}
                    value={values["dob"]}
                  />
                </div>
                {touched.dob && errors.dob && (
                  <span className="errors">{errors.dob}</span>
                )}
                <div>
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <select
                    disabled={!isEditing}
                    onChange={handleChange("maritalStatus")}
                    name="maritalStatus"
                    id="maritalStatus"
                  >
                    <option
                      selected={values["maritalStatus"] === "single"}
                      value="single"
                    >
                      Single
                    </option>
                    <option
                      selected={values["maritalStatus"] === "married"}
                      value="married"
                    >
                      Married
                    </option>
                  </select>
                </div>
                <div>
                  <label htmlFor="nationality">Nationality</label>
                  <input
                    disabled={!isEditing}
                    type="text"
                    name="nationality"
                    id="nationality"
                    placeholder="Rwanda"
                    onChange={handleChange("nationality")}
                    onBlur={handleBlur("nationality")}
                    value={values["nationality"]}
                  />
                  {touched.nationality && errors.nationality && (
                    <span className="errors">{errors.nationality}</span>
                  )}
                </div>
                {isEditing && (
                  <Button
                    // onClick={() => {
                    //   console.log("===button=clicked==>")
                    //   handleSubmit()
                    // }}
                    type="submit"
                    variant="contained"
                    color="secondary"
                    disabled={Boolean(updateLoading)}
                  >
                    {updateLoading ? "Loading ..." : "Save"}
                  </Button>
                )}
              </form>
            </Card>
          </Grid>
        </Grid>
      </Typography>
    </Box>
    // </Box>
  );
}
