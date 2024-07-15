import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FormulaInput from "../components/FormulaInput";

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-4 rounded-lg shadow-md w-2/4">
          <FormulaInput />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default Home;
