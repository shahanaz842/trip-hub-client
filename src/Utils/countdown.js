export const getTimeLeft = (date, time) => {
  const target = new Date(`${date}T${time}`).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return { expired: true };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};
