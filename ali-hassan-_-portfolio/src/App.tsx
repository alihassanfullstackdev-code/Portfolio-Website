import { useState } from 'react';
import About from './components/About';
import AiWork from './components/AiWork';
import AvatarStage from './components/AvatarStage';
import Career from './components/Career';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import TechStack from './components/TechStack';
import Work from './components/Work';
import { useSectionRoutes } from './lib/useSectionRoutes';

export default function App() {
  const [ready, setReady] = useState(false);
  useSectionRoutes(ready);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Navbar />
      <div className="relative">
        <AvatarStage />
        <main>
          <Hero ready={ready} />
          <About />
          <AiWork />
          <Work />
          <TechStack />
          <Career />
          <Contact />
        </main>
      </div>
    </>
  );
}
