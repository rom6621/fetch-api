declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_BASE_URL: string;
    readonly NEXT_PUBLIC_BACKEND_URL: string;
    readonly NEXTAUTH_URL: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;

    readonly NEXT_PUBLIC_FIREBASE_DEV_TENANT: string;
    readonly NEXT_PUBLIC_FIREBASE_PROD_TENANT: string;

    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    readonly NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;
  }
}
