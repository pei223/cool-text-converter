import {
  Box,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Layout from "../../components/blocks/common/Layout";
import { useCallback, useEffect, useState } from "react";
import { MarkdownConverter } from "../../services/converter/types";
import { markdownConverters, matchConverter } from "../../services/converter";
import { ConvertibleMarkdownFormats } from "../../services/consts/format";

const converterMap: Record<ConvertibleMarkdownFormats, MarkdownConverter> =
  markdownConverters.reduce((dict, v) => {
    dict[v.formatName()] = v;
    return dict;
  }, {} as Record<ConvertibleMarkdownFormats, MarkdownConverter>);

type SelectedItem = {
  format: ConvertibleMarkdownFormats;
  converter: MarkdownConverter;
};

type SelectableFormat = ConvertibleMarkdownFormats | "";

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
          <Box
            sx={{
              display: "flex",
              paddingY: 2,
              alignItems: "center",
            }}
          >
            <Typography
              color="text.secondary"
              variant="h6"
              component="p"
              marginRight={2}
            >
              変換対象フォーマット:
            </Typography>
            <Select
              sx={{
                minWidth: "100px",
              }}
              value={
                selectedItem == null ? "-" : selectedItem.converter.formatName()
              }
              onChange={(e) =>
                onFormatSelected(e.target.value as SelectableFormat)
              }
            >
              <MenuItem value={""}>-</MenuItem>
              {markdownConverters.map((v) => (
                <MenuItem value={v.formatName()}>{v.formatLabel()}</MenuItem>
              ))}
            </Select>
          </Box>
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
