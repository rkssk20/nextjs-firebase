const useColor = (color: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < color.length; i += 1) {
    hash = color.charCodeAt(i) + ((hash << 5) - hash);
  }

  let name = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    name += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return name;
}

export default useColor