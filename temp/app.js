const CountdownDisplay = () => {
  const [displayedDays, setDisplayedDays] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = React.useState(-1);
  const [fadedDots, setFadedDots] = React.useState(new Set());
  
  // Calculate all date-related values upfront
  const dates = React.useMemo(() => {
    const startDate = new Date('2024-11-06T00:00:00-05:00'); // Election Day 2024
    const endDate = new Date('2029-01-20T12:00:00-05:00');   // Inauguration Day 2029
    const now = new Date();
    
    // Set time to midnight for consistent day calculations
    now.setHours(0, 0, 0, 0);
    const elapsedDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays - elapsedDays;
    
    return { elapsedDays, remainingDays, totalDays };
  }, []);
  
  // Constants
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
          if (next >= dates.remainingDays) {
            clearInterval(interval);
            setTimeout(() => setAnimationPhase(2), 100);
            return dates.remainingDays;
          }
          return next;
        });
      }, 1000 / (dates.remainingDays / 32));
      return () => clearInterval(interval);
    }
  }, [animationPhase, dates.remainingDays]);

  // Dot animation
  React.useEffect(() => {
    if (animationPhase === 2) {
      let frame = -1;
      
      const animate = () => {
        frame++;
        if (frame * 20 < dates.totalDays) {
          setLastVisibleIndex(frame * 20);
          requestAnimationFrame(animate);
        } else {
          setLastVisibleIndex(dates.totalDays - 1);
          setTimeout(() => {
            // Create set of all past days
            const pastDays = new Set();
            for (let i = 0; i <= dates.elapsedDays; i++) {
              pastDays.add(i);
            }
            setFadedDots(pastDays);
            setTimeout(() => setAnimationPhase(3), 200);
          }, 200);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [animationPhase, dates.totalDays, dates.elapsedDays]);

  const getDotStyle = (index) => {
    const isDemocrat = index < democratDays;
    const isPast = index <= dates.elapsedDays;
    const isToday = index === dates.elapsedDays + 1;
    const isScaled = isToday && animationPhase === 3;
    const isFaded = isPast;
    
    const baseStyle = {
      width: `${baseDotSize}px`,
      height: `${baseDotSize}px`,
      backgroundColor: isDemocrat ? '#0000FF' : '#FF0000',
      borderRadius: '50%',
      opacity: index <= lastVisibleIndex ? (isFaded ? 0.5 : 1) : 0,
      transition: isToday 
        ? 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)' 
        : 'opacity 0.15s ease',
      margin: `${baseSpacing/2}px`,
    };

    if (isScaled) {
      return {
        ...baseStyle,
        position: 'absolute',
        transform: `scale(${todayScale})`,
        transformOrigin: 'center',
        zIndex: 1,
        left: `${(index % dotsPerRow) * (baseDotSize + baseSpacing)}px`,
        top: `${Math.floor(index / dotsPerRow) * (baseDotSize + baseSpacing)}px`,
      };
    }

    return baseStyle;
  };

  const containerWidth = (dotsPerRow * (baseDotSize + baseSpacing));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div style={{ width: `${containerWidth}px`, maxWidth: '100%' }}>
        <div className="mb-4">
          <h1 className="text-6xl md:text-8xl font-bold leading-none">
            {displayedDays} DAYS
          </h1>
          <h2 className="text-xl md:text-3xl font-bold">
            UNTIL TRUMP LEAVES THE WHITE HOUSE
          </h2>
        </div>
        
        <div className="relative">
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 0,
              width: '100%',
              position: 'relative'
            }}
          >
            {[...Array(dates.totalDays)].map((_, index) => (
              <div
                key={index}
                style={getDotStyle(index)}
              />
            ))}
          </div>
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
