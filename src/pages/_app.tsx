import { customTheme } from "@/utils/theme";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

interface PageProps {
  session: Session;
}

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<PageProps>) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={customTheme}>
        <Container maxW="container.lg" minH="calc(100vh - 80px)" as="main">
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;
