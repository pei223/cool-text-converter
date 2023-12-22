import { Box, SxProps, Typography } from "@mui/material";
import markdownit from "markdown-it";
import styled from "styled-components";

const md = markdownit({
  html: true,
});

type Props = {
  markdownText: string;
  sx?: SxProps;
};

const StyledPre = styled.pre`
  code {
    padding: 12px;
    display: block;
    background-color: gainsboro;
    border-radius: 4px;
    text-wrap: wrap;
  }
  table {
    min-width: 200px;
  }
  table,
  th,
  td {
    border: 1px solid gainsboro;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 6px 12px;
  }
`;

function MarkdownPreview({ markdownText, sx }: Props) {
  return (
    <Box sx={sx}>
      <Typography color="text.secondary" variant="h5">
        Preview
      </Typography>
      <StyledPre
        dangerouslySetInnerHTML={{ __html: md.render(markdownText) }}
      />
    </Box>
  );
}

export default MarkdownPreview;
