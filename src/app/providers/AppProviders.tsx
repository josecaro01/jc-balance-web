import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { type ReactNode, Suspense } from "react";
import { queryClient } from "./query-client";
import { SnackbarProvider } from "@shared/providers";
import { LoadingComponent } from "@shared/components";

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
        <SnackbarProvider>
          <Suspense fallback={<LoadingComponent />}>
            {children}
          </Suspense>
        </SnackbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};