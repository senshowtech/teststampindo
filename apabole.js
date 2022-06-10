let tampung = "";
for (let i = 1; i <= 100; i++) {
  let number = i;
  if (number % 5 === 0 && number % 3 === 0) {
    tampung += "ApaBole,";
  } else if (number % 3 === 0) {
    tampung += "Apa,";
  } else if (number % 5 === 0) {
    tampung += "Bole,";
  } else {
    tampung += String(number + ",");
  }
}
console.log(tampung);
