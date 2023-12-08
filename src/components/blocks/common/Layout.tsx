import React from "react";
import { AppBar, Button, Container, Toolbar, Typography } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

interface menu {
  icon?: () => React.ReactNode;
  link: string;
  text: string;
}

const menuList: menu[] = [
  {
    link: "/markdown/convert",
    text: "# Markdownへ変換",
  },
];

type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            marginLeft="20px"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            良い感じに変換するやつ
          </Typography>
          {menuList.map((menu) => (
            <Button
              key={menu.link}
              color="inherit"
              onClick={() => navigate(menu.link)}
            >
              <Typography>{menu.text}</Typography>
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container sx={{ paddingTop: 2 }}>{children}</Container>
    </>
  );
}

export default Layout;
