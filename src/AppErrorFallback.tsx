import { Button, Container } from "@mui/material";
import { type FallbackProps } from "react-error-boundary";

function AppErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const title = "エラー";
  const message = "予期しないエラーが発生しました。";
  const detail = `${error.message}: ${error.message}`;
  return (
    <Container sx={{ pt: 8 }}>
      <h1>{title}</h1>
      <p>{message}</p>
      {detail !== "" && (
        <div>
          <p>エラー詳細情報</p>
          <p>{detail}</p>
        </div>
      )}
      <Button sx={{ mt: 4 }} variant="contained" onClick={resetErrorBoundary}>
        リロードする
      </Button>
    </Container>
  );
}

export default AppErrorFallback;
