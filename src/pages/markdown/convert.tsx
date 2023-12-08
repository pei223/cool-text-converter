import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Layout from "../../components/blocks/common/Layout";
import { useEffect, useState } from "react";
import { MarkdownConverter } from "../../services/converter/types";
import { convertToMarkdown } from "../../services/converter";

function MarkdownConvert() {
  const [src, setSrc] = useState("");
  const [dist, setDist] = useState("");
  const [converter, setConverter] = useState<MarkdownConverter | null>(null);

  useEffect(() => {
    const result = convertToMarkdown(src);
    if (result == null) {
      setConverter(null);
      return;
    }
    setConverter(result.convereter);
    setDist(result.result);
  }, [src]);

  useEffect(() => {
    if (converter == null) {
      return;
    }
    const result = converter.convertToMarkdown(src);
    setDist(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [converter]);

  return (
    <Layout>
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Typography color="text.secondary" variant="h5" component="h1">
            Markdown変換
          </Typography>
          <Typography
            color="text.secondary"
            variant="h6"
            component="p"
            sx={{
              paddingTop: 2,
            }}
          >
            認識したフォーマット:{" "}
            {converter == null ? "-" : converter.formatName()}
          </Typography>
          <Box
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              multiline
              rows={20}
              sx={{ width: "100%" }}
              value={src}
              onChange={(e) => setSrc(e.target.value)}
            />
            <ArrowForwardIosIcon />
            <TextField
              multiline
              rows={20}
              sx={{ width: "100%" }}
              value={dist}
              onChange={(e) => setDist(e.target.value)}
            />
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default MarkdownConvert;
