import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "../styles/globals.scss";
import { store } from "@/utils/store/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  );
}
