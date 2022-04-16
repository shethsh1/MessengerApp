import React from "react";
import { Box, Typography, Menu, MenuItem, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  root: {
    height: 44,
    marginTop: 23,
    marginLeft: 6,
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 17,
  },
  ellipsis: {
    color: "#95A7C4",
    opacity: 0.5,
  },
}));

const CurrentUser = ({ handleLogout }) => {
  const user = useSelector(state => state.auth.user)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const classes = useStyles();



  return (
    <>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'profile-menu',
        }}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <Box className={classes.root}>
        <BadgeAvatar photoUrl={user?.photoUrl} online={true} />
        <Box className={classes.subContainer}>
          <Typography className={classes.username}>{user?.username}</Typography>
          <IconButton className="cypress" sx={{ marginRight: '24px' }} size="small" onClick={handleClick}

            aria-controls={open ? 'profile-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}

          >
            <MoreHorizIcon classes={{ root: classes.ellipsis }} />
          </IconButton>

        </Box>
      </Box>
    </>
  );
};

export default CurrentUser;
