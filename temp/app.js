const CountdownDisplay = () => {
  const [displayedDays, setDisplayedDays] = React.useState(0);
  const [animationPhase, setAnimationPhase] = React.useState(0);
  const [lastVisibleIndex, setLastVisibleIndex] = React.useState(-1);
  const [fadedDots, setFadedDots] = React.useState(new Set());
  
  // Calculate all date-related values upfront with debugging
  const dates = React.useMemo(() => {
    const startDate = new Date('2024-11-06T00:00:00-05:00');
    const endDate = new Date('2029-01-20T12:00:00-05:00');
    const now = new Date();
    
    now.setHours(0, 0, 0, 0);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDays - elapsedDays;
    
    console.log('Date Calculations:', {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      now: now.toISOString(),
      totalDays,
      elapsedDays,
      remainingDays
    });
    
    return { elapsedDays, remainingDays, totalDays };
  }, []);

  // Let's also log what we're actually using to create the dots
  console.log('Dots being created:', {
    totalDotsArray: [...Array(dates.totalDays)].length,
    elapsedDays: dates.elapsedDays,
    today: dates.elapsedDays + 1,
  });

  // Rest of the component code remains the same...
  [...]
});
