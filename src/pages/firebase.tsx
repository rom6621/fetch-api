import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { TestForm } from "@/components/TestForm";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { GetStaticProps, NextPage } from "next";

interface Props {
  firebaseApiKey?: string;
  firebaseAuthDomain?: string;
}

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    },
  };
};

const Home: NextPage<Props> = ({ firebaseApiKey, firebaseAuthDomain }) => {
  const { result, error, fetchApi } = useApi();

  const [isLoading, setLoading] = useState(false);
  const [isSignIn, setSignIn] = useState(false);
  const [idToken, setIdToken] = useState("");

  const app = initializeApp({
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
  });
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setSignIn(true);
        setIdToken(await user.getIdToken());
      } else {
        setSignIn(false);
        setIdToken("");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [auth, setIdToken]);

  return (
    <Grid py={4} gap={5} templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6}>
        <TestForm
          isLoading={isLoading}
          isSignIn={isSignIn}
          idToken={idToken}
          result={result}
          error={error}
          signIn={async () => {
            await signInWithPopup(auth, provider);
          }}
          signOut={async () => {
            await signOut(auth);
          }}
          fetchApi={fetchApi}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
