const CountdownDisplay = () => {
  const [displayedDays, setDisplayedDays] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = React.useState(-1);
  const [fadedDots, setFadedDots] = React.useState(new Set());
  
  // Constants
  const totalDays = 1536;
  const democratDays = 75;
  const baseDotSize = 10;
  const baseSpacing = 5;
  const todayScale = 1.5;
  const dotsPerRow = 74;

  // Counter animation
  React.useEffect(() => {
    setTimeout(() => setAnimationPhase(1), 100);
  }, []);

  React.useEffect(() => {
    if (animationPhase === 1) {
      const interval = setInterval(() => {
        setDisplayedDays(prev => {
          const next = prev + 32;
          if (next >= totalDays) {
            clearInterval(interval);
            setTimeout(() => setAnimationPhase(2), 100);
            return totalDays;
          }
          return next;
        });
      }, 1000 / (totalDays / 32));
      return () => clearInterval(interval);
    }
  }, [animationPhase]);

  // Dot animation
  React.useEffect(() => {
    if (animationPhase === 2) {
      let frame = -1;
      
      const animate = () => {
        frame++;
        if (frame * 20 < totalDays) {
          setLastVisibleIndex(frame * 20);
          requestAnimationFrame(animate);
        } else {
          setLastVisibleIndex(totalDays - 1);
          setTimeout(() => {
            setFadedDots(new Set([0]));
            setTimeout(() => setAnimationPhase(3), 200);
          }, 200);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [animationPhase]);

  const getDotStyle = (index) => {
    const isDemocrat = index < democratDays;
    const isPast = index < 1;
    const isToday = index === 1;
    
    return {
      width: `${baseDotSize}px`,
      height: `${baseDotSize}px`,
      backgroundColor: isDemocrat ? '#0000FF' : '#FF0000',
      borderRadius: '50%',
      opacity: index <= lastVisibleIndex ? (fadedDots.has(index) ? '0.5' : '1') : 0,
      transition: isToday 
        ? 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
        : 'opacity 0.15s ease',
      transform: isToday && animationPhase === 3 ? `scale(${todayScale})` : 'scale(1)',
      transformOrigin: 'center',
      display: 'block'
    };
  };

  const containerWidth = (dotsPerRow * (baseDotSize)) + ((dotsPerRow - 1) * baseSpacing);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center p-8">
      <div className="mb-4">
        <h1 className="text-6xl md:text-8xl font-bold leading-none">
          {displayedDays} DAYS
        </h1>
        <h2 className="text-xl md:text-3xl font-bold">UNTIL TRUMP LEAVES THE WHITE HOUSE</h2>
      </div>
      
      <div className="flex">
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: `${baseSpacing}px`,
            width: `${containerWidth}px`
          }}
        >
          {[...Array(totalDays)].map((_, index) => (
            <div
              key={index}
              style={getDotStyle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Render the app
ReactDOM.render(
  <CountdownDisplay />,
  document.getElementById('root')
);
