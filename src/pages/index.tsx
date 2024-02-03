import { TestForm } from "@/components/TestForm";
import { useApi } from "@/hooks/useApi";
import { devAuth, prodAuth } from "@/utils/firebase";
import { Grid, GridItem, Select } from "@chakra-ui/react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Home = () => {
  const { data: session, status } = useSession();
  const { result, error, fetchApi } = useApi();
  const [firebaseIdToken, setFirebaseIdToken] = useState("");

  const getIdToken = async (idToken: string) => {
    const credential = GoogleAuthProvider.credential(idToken);
    const auth = getValues("environment") === "開発環境" ? devAuth : prodAuth;
    const { user } = await signInWithCredential(auth, credential);
    setFirebaseIdToken(await user.getIdToken());
  };

  const onClickSignOut = async () => {
    signOut();
    devAuth.signOut();
    prodAuth.signOut();
  };

  useEffect(() => {
    if (session?.credential.idToken) {
      getIdToken(session.credential.idToken);
    }
  }, [session]);

  useEffect(() => {
    const unsub = onAuthStateChanged(devAuth, (user) => {
      if (user) {
        setValue("environment", "開発環境");
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(prodAuth, (user) => {
      if (user) {
        setValue("environment", "本番環境");
      }
    });
    return unsub;
  });

  type Environment = "本番環境" | "開発環境";
  const { register, setValue, getValues } = useForm<{
    environment: Environment;
  }>({
    defaultValues: {
      environment: "開発環境",
    },
  });

  const [authTenant, setTenant] = useState(
    process.env.NEXT_PUBLIC_FIREBASE_DEV_AUTH_DOMAIN
  );

  return (
    <Grid py={4} gap={5} templateColumns="repeat(6, 1fr)">
      <GridItem colSpan={6}>
        {authTenant}
        <Select
          bg="white"
          disabled={devAuth.currentUser || prodAuth.currentUser ? true : false}
          {...register("environment")}
        >
          <option value="開発環境">開発環境</option>
          <option value="本番環境">本番環境</option>
        </Select>
      </GridItem>
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
          signOut={onClickSignOut}
          fetchApi={fetchApi}
        />
      </GridItem>
    </Grid>
  );
};

export default Home;
