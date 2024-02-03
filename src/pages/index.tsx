import { TestForm } from "@/components/TestForm";
import { useApi } from "@/hooks/useApi";
import { auth } from "@/utils/firebase";
import { Grid, GridItem } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const { result, error, fetchApi } = useApi();
  const [firebaseIdToken, setFirebaseIdToken] = useState("");

  const getIdToken = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    const { user } = await signInWithCredential(auth, credential);
    setFirebaseIdToken(await user.getIdToken());
  };

  useEffect(() => {
    if (session?.credential.idToken) {
      getIdToken(session.credential.idToken);
    }
  }, [session]);

  return (
    <Grid py={4} gap={5} templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6}>
        <TestForm
          isLoading={status === "loading"}
          isSignIn={!!session}
          firebaseIdToken={firebaseIdToken}
          googleIdToken={session?.credential.idToken}
          googleAccessToken={session?.credential.accessToken}
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
