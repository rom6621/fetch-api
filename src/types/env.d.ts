declare namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly NEXT_PUBLIC_FETCH_HOST: string;
    readonly FIREBASE_API_KEY: string;
    readonly FIREBASE_AUTH_DOMAIN: string;
  }
}
