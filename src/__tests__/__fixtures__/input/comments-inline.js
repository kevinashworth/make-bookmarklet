(function () {
  const x = 3; // a comment at the end of the line
  const y = x === 3 ? 2 /* a weird place for an in-line comment */ : 1;
  console.log(x, y);
})();
