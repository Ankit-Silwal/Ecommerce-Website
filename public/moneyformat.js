export function convertDollars(cents){
  return `$${(cents / 100).toFixed(2)}`;

}