import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routers } from "./route/route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { SocketProvider } from "./contexts/socketContext";
import { ChannelProvider } from "./contexts/channelContext";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SocketProvider>
          <ChannelProvider>
            <RouterProvider router={routers} />
          </ChannelProvider>
        </SocketProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
