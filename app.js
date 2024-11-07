const CountdownDisplay = () => {
  const [displayedDays, setDisplayedDays] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = React.useState(-1);
  const [fadedDots, setFadedDots] = React.useState(new Set());
  
  // Calculate dates and days
  const getElapsedAndRemainingDays = () => {
    const startDate = new Date('2024-11-06T00:00:00-05:00'); // Election Day 2024
    const endDate = new Date('2029-01-20T12:00:00-05:00');   // Inauguration Day 2029
    const now = new Date();
    
    // Set time to midnight for consistent day calculations
    now.setHours(0, 0, 0, 0);
    const elapsedDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    
    return { elapsedDays, remainingDays };
  };

  const { elapsedDays, remainingDays } = getElapsedAndRemainingDays();
  const totalDays = 1505; // Corrected total
  const democratDays = 75;
  const baseDotSize = 10;
  const baseSpacing = 5;
  const todayScale = 1.5;
  const dotsPerRow = 74;

  // Rest of the component remains the same...
  // [Previous code continues unchanged]

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
            {[...Array(totalDays)].map((_, index) => (
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
