import {
  Box,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Layout from "../../components/blocks/common/Layout";
import { useCallback, useEffect, useState } from "react";
import { MarkdownConverter } from "../../services/converter/types";
import { markdownConverters, matchConverter } from "../../services/converter";
import { ConvertibleMarkdownFormats } from "../../services/consts/format";
import MarkdownPreview from "../../components/blocks/common/MarkdownPreview";

const converterMap: Record<ConvertibleMarkdownFormats, MarkdownConverter> =
  markdownConverters.reduce((dict, v) => {
    dict[v.formatName()] = v;
    return dict;
  }, {} as Record<ConvertibleMarkdownFormats, MarkdownConverter>);

type SelectedItem = {
  format: ConvertibleMarkdownFormats;
  converter: MarkdownConverter;
};

function MarkdownConvert() {
  const [src, setSrc] = useState("");
  const [dist, setDist] = useState("");
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  useEffect(() => {
    const converter = matchConverter(src);
    if (converter == null) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem({
      format: converter.formatName(),
      converter,
    });
  }, [src]);

  useEffect(() => {
    if (selectedItem == null) {
      setDist("");
      return;
    }
    setDist(selectedItem.converter.convertToMarkdown(src));
  }, [src, selectedItem]);

  const onFormatSelected = useCallback((v: ConvertibleMarkdownFormats | "") => {
    if (v === "") {
      setSelectedItem(null);
      return;
    }
    setSelectedItem({
      format: v as ConvertibleMarkdownFormats,
      converter: converterMap[v as ConvertibleMarkdownFormats],
    });
  }, []);

  return (
    <Layout>
      <Card sx={{ padding: 3 }}>
        <CardContent>
          <Typography color="text.secondary" variant="h5" component="h1">
            Markdown変換
          </Typography>
          <Box sx={{ marginTop: 3 }}>
            <Typography
              color="text.secondary"
              variant="body2"
              component="p"
              marginRight={2}
            >
              変換対象フォーマット
            </Typography>
            <Box
              sx={{
                marginTop: 1,
                paddingBottom: 2,
                overflowX: "scroll",
                whiteSpace: "nowrap",
              }}
            >
              {markdownConverters.map((v) => (
                <Chip
                  sx={{
                    marginRight: 1,
                  }}
                  onClick={() => onFormatSelected(v.formatName())}
                  label={v.formatLabel()}
                  variant={
                    v.formatName() === selectedItem?.format
                      ? "filled"
                      : "outlined"
                  }
                  color={
                    v.formatName() === selectedItem?.format
                      ? "primary"
                      : "default"
                  }
                  clickable
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  source
                </Typography>
                <TextField
                  multiline
                  rows={15}
                  value={src}
                  onChange={(e) => setSrc(e.target.value)}
                />
              </Box>
              <Box sx={{ paddingX: 1 }}>
                <ArrowForwardIosIcon />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <Typography variant="body1" color="text.secondary">
                  markdown
                </Typography>
                <TextField
                  multiline
                  value={dist}
                  rows={15}
                  onChange={(e) => setDist(e.target.value)}
                />
              </Box>
            </Box>
            <MarkdownPreview
              sx={{
                flex: 1,
                marginTop: 1,
                padding: 2,
                border: "1px solid gainsboro",
                borderRadius: "8px",
              }}
              markdownText={dist}
            />
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}
export default MarkdownConvert;
