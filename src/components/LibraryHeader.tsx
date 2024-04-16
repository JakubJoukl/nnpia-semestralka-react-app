import * as React from "react";
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logoImg from "../assets/logo.png";
import "../css/image.css";
import { Alert, ButtonBase, Collapse } from "@mui/material";
import Login from "./Login";
import { Link } from "react-router-dom";
import MyAlert from "./MyAlert";

const settings = ["Odhlásit se"];

function ResponsiveAppBar() {
  const [username, setUsername, jwtToken, setJwtToken] =
    useContext(UserContext);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const doLogout = () => {
    setUsername(null);
    setJwtToken(null);
    setAnchorElUser(null);
  };

  function registerPage() {
    return (
      <Link to="/registrace">
        <Button
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Registrace
        </Button>
      </Link>
    );
  }

  function additionalPages() {
    return (
      <>
        <Link to="/kalendarTerminu">
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Kalendář
          </Button>
        </Link>
        <Link to="/mojeTerminy">
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Moje termíny
          </Button>
        </Link>
        <Link to="/volneTerminy">
          <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Volné termíny
          </Button>
        </Link>
      </>
    );
  }

  console.log(username, jwtToken, setUsername, setJwtToken);

  function logoutPart() {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Nastavení">
          <ButtonBase onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            Uživatel {username}
          </ButtonBase>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={doLogout}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    );
  }

  function loginPart() {
    return <Login></Login>;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logoImg} alt="Logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Rezervace termínů
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Rezervace termínů
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                O mě
              </Button>
            </Link>
            {username == null || jwtToken == null
              ? registerPage()
              : additionalPages()}
          </Box>

          {username == null || jwtToken == null ? loginPart() : logoutPart()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
