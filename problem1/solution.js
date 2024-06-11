var sum_to_n_a = function (n) {
  var total = 0;
  for (var i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};

var sum_to_n_b = function (n) {
  if (typeof n === 'undefined') return 0;
  return Array(n)
    .fill(1)
    .reduce((a, e, i) => (a += e + i), 0);
};

var sum_to_n_c = function (n) {
  var num = n || 0;
  return (num * (num + 1)) / 2;
};
