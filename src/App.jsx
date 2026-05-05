import { lazy, Suspense, useCallback, useRef, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const Models = lazy(() => import("./components/Models"));
const About = lazy(() => import("./components/About"));
const Gallery = lazy(() => import("./components/Gallery"));
const Services = lazy(() => import("./components/Services"));
const Contact = lazy(() => import("./components/Contact"));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const modelLoadedRef = useRef(false);

  const handleModelLoaded = useCallback(() => {
    if (modelLoadedRef.current) return;

    modelLoadedRef.current = true;
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-zenturo-black">
      <LoadingScreen isLoaded={isLoaded} onComplete={handleLoadingComplete} />
      <Navbar visible={showContent} />
      <Hero onModelLoaded={handleModelLoaded} showContent={showContent} />
      <Suspense fallback={null}>
        <Models />
        <About />
        <Gallery />
        <Services />
        <Contact />
      </Suspense>
    </div>
  );
}

export default App;
