var ulang = true;

while (ulang) {
    var a = parseInt(prompt("Masukkan Nilai Volume A :"));
    var b = parseInt(prompt("Masukkan Nilai Volume B :"));

    function jumlahVolumeDuaKubus(a, b) {
        return a * a * a + b * b * b;
    }

    var hasil = jumlahVolumeDuaKubus(a, b);
    alert("Total Volume dari Dua Kubus adalah: " + hasil);

    // Tanya apakah ingin mengulang lagi
    var konfirmasi = confirm("Ingin mengulang lagi?");
    ulang = konfirmasi;
}

// Parameter Variable yang Ditulis di dalam kurung ketika function dibuat
// Argument Nilai yang dikirim ke parameter
