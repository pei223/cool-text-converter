import { Card, CardContent, Grid, Typography } from "@mui/material";
import Layout from "../components/blocks/common/Layout";
import { useNavigate } from "react-router-dom";

type PanelInfo = {
  title: string;
  description: string;
  link: string;
};

const panels: PanelInfo[] = [
  {
    title: "Markdownへ変換",
    description: "入力を良い感じに解釈してMarkdownに変換します。",
    link: "/markdown/convert",
  },
];

function Index() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Grid container spacing={2}>
        {panels.map((panel) => (
          <Grid item xs={6}>
            <Card
              onClick={() => navigate(panel.link)}
              sx={{ padding: 3, cursor: "pointer" }}
            >
              <CardContent>
                <Typography color="text.secondary" variant="h6" component="h3">
                  {panel.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  component="h3"
                  sx={{
                    marginTop: 2,
                  }}
                >
                  {panel.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export default Index;
