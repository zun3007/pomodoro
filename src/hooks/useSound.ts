export const useSound = () => {
  const playClick = () => {
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/cartoon/pop.ogg'
    );
    audio.volume = 0.2;
    audio.play().catch(console.log);
  };

  const playSuccess = () => {
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'
    );
    audio.volume = 0.3;
    audio.play().catch(console.log);
  };

  const playTimerComplete = () => {
    const audio = new Audio(
      'https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg'
    );
    audio.volume = 0.4;
    audio.play().catch(console.log);
  };

  return { playClick, playSuccess, playTimerComplete };
};
