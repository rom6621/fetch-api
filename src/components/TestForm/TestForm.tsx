import {
  Skeleton,
  Stack,
  Heading,
  HStack,
  Button,
  InputGroup,
  Input,
  InputRightElement,
  FormLabel,
  Switch,
  Spacer,
  useClipboard,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Props {
  isLoading: boolean;
  isSignIn: boolean;
  idToken?: string | null;
  accessToken?: string | null;
  error?: string;
  result?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  fetchApi: (
    url: string,
    idToken?: string,
    accessToken?: string
  ) => Promise<void>;
}

export const TestForm = ({
  isLoading,
  isSignIn,
  idToken,
  accessToken,
  result,
  error,
  signIn,
  signOut,
  fetchApi,
}: Props) => {
  const {
    onCopy: copyIdToken,
    value: idTokenValue,
    hasCopied: isCopyIdToken,
  } = useClipboard(idToken ?? "未設定");

  const [fetchOrigin, setFetchOrigin] = useState<string>(
    process.env.NEXT_PUBLIC_FETCH_HOST
  );
  const [fetchResource, setFetchResource] = useState<string>("users/me");
  const [isAuth, setAuth] = useState(true);

  const {
    onCopy: copyAccessToken,
    value: accessTokenValue,
    hasCopied: isCopyAccessToken,
  } = useClipboard(accessToken ?? "未設定");

  const fetchUrl = `${fetchOrigin}/${fetchResource}`;

  return (
    <Skeleton isLoaded={!isLoading}>
      <Stack py={5} gap={3} direction="column">
        <Heading size="md">認証</Heading>
        <HStack>
          {!isSignIn ? (
            <Button colorScheme="twitter" onClick={signIn}>
              ログイン
            </Button>
          ) : (
            <Button colorScheme="red" onClick={signOut}>
              ログアウト
            </Button>
          )}
        </HStack>

        <Heading size="md">IDトークン</Heading>
        <InputGroup size="md">
          <Input
            value={idTokenValue}
            isDisabled={!isSignIn}
            bg="white"
            pr="4.5rem"
            readOnly
          />
          <InputRightElement width="4.5rem" mr="0.5rem">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="facebook"
              isDisabled={!isSignIn}
              onClick={copyIdToken}
            >
              {isCopyIdToken ? "Copied!" : "Copy"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Heading size="md">アクセストークン</Heading>
        <InputGroup size="md">
          <Input
            value={accessTokenValue}
            isDisabled={!isSignIn}
            bg="white"
            pr="4.5rem"
            readOnly
          />
          <InputRightElement width="4.5rem" mr="0.5rem">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="facebook"
              isDisabled={!isSignIn}
              onClick={copyAccessToken}
            >
              {isCopyAccessToken ? "Copied!" : "Copy"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Heading size="md">各種設定</Heading>
        <Heading size="sm">オリジン</Heading>
        <Input
          value={fetchOrigin}
          onChange={(e) => setFetchOrigin(e.currentTarget.value)}
          bg="white"
          pr="4.5rem"
        />
        <Heading size="sm">リソース</Heading>
        <Input
          value={fetchResource}
          onChange={(e) => setFetchResource(e.currentTarget.value)}
          bg="white"
          pr="4.5rem"
        />
        <Heading size="sm">フェッチURL</Heading>
        <Text>{fetchUrl}</Text>

        <Heading size="md">実行</Heading>
        <HStack direction="row" gap={3}>
          <FormLabel htmlFor="is-auth" mb="0">
            認証：
          </FormLabel>
          <Switch
            id="is-auth"
            size="lg"
            isDisabled={!isSignIn}
            isChecked={isAuth}
            onChange={() => setAuth(!isAuth)}
          />

          <Spacer />

          <Button
            colorScheme="green"
            onClick={() =>
              fetchApi(
                fetchUrl,
                isAuth ? idToken ?? undefined : undefined,
                accessToken ?? undefined
              )
            }
          >
            実行
          </Button>
        </HStack>

        <Heading size="md">実行結果</Heading>
        {error !== "" && <Text color="red">{error}</Text>}
        <SyntaxHighlighter>{result ?? "{}"}</SyntaxHighlighter>
      </Stack>
    </Skeleton>
  );
};
