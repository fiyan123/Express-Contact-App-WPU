function factorial(n) {
    // Basis case: factorial dari 0 atau 1 adalah 1
    if (n === 0 || n === 1) {
      return 1;
    } else {
      // Rekursi: memanggil dirinya sendiri dengan argumen yang lebih kecil
      return n * factorial(n - 1);
    }
  }
  
  // Contoh penggunaan
  console.log(factorial(20)); // Output: 120
  