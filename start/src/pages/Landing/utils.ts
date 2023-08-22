export function formatDollar(num: number) {
  if (num >= 1e12) {
    return "$" + (num / 1e12).toFixed(3) + "T"; // Trillion
  } else if (num >= 1e9) {
    return "$" + (num / 1e9).toFixed(3) + "B"; // Billion
  } else if (num >= 1e6) {
    return "$" + (num / 1e6).toFixed(3) + "M"; // Million
  } else if (num >= 1e3) {
    return "$" + (num / 1e3).toFixed(0) + "K"; // Thousand
  }
  return "$" + num.toString();
}

export function formatPercentage(decimal: number) {
  return (decimal * 100).toFixed(2) + "%";
}
