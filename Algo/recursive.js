const fizzbuzz = (n) => {
  let result = [];
  fizzbuzzRecursive(1, n, result);

  return result;
};

const fizzbuzzRecursive = (count, n, result) => {
  if (count > n) {
    return result;
  }

  const value =
    count % 15 === 0
      ? "FizzBuzz"
      : count % 3 === 0
      ? "fizz"
      : count % 5 === 0
      ? "buzz"
      : count.toString();

  result.push(value);
  count = count + 1;

  fizzbuzzRecursive(count, n, result);
};

let args = process.argv.slice(2);

args[0]
  ? console.log("The results of Fizzbuzz : " + fizzbuzz(parseInt(args[0])))
  : console.log("Put the n number in args please");