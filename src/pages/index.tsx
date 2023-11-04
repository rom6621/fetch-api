import { TestForm } from "@/components/TestForm";
import { useApi } from "@/hooks/useApi";
import { Grid, GridItem } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

const Home = () => {
  const { data: session, status } = useSession();
  const { result, error, fetchApi } = useApi();

  return (
    <Grid py={4} gap={5} templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6}>
        <TestForm
          isLoading={status === "loading"}
          isSignIn={!!session}
          idToken={session?.credential.idToken}
          accessToken={session?.credential.idToken}
          result={result}
          error={error}
          signIn={async () => {
            await signIn("google");
          }}
          signOut={signOut}
          fetchApi={fetchApi}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
