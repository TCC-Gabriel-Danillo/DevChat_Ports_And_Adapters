import "@ui/src/config/firabaseConfig";
import { Navigation } from "@ui/src/navigation"
import { useCustomFonts } from "./src/hooks";
import { AuthProviderComposer } from "./src/composes/AuthProviderComposer";
import { AlertContextProvider } from "./src/context";

export default function App() {
  const [isFontLoaded] = useCustomFonts()

  if (!isFontLoaded) return

  return (
    <AlertContextProvider>
      <AuthProviderComposer>
        <Navigation />
      </AuthProviderComposer>
    </AlertContextProvider>
  );
}

