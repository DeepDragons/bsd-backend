export function getRandomElement<T>(list: T[]): T {
  return list[Math.floor(Math.random()*list.length)];
}

export function arraySum(list: number[]) {
  return list.reduce((total, current) => {
    return total + current;
  }, 0);
}
