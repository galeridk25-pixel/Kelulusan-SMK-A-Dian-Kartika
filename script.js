// ================= COUNTDOWN =================
const targetDate = new Date("2026-05-04T18:00:00+07:00").getTime();
// const targetDate = new Date("2026-04-30T21:02:00+07:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const selisih = targetDate - now;

  const el = document.getElementById("countdownText");
  const list = document.getElementById("listSiswa");

  if (!el) return;

  if (selisih <= 0) {
    el.innerHTML = "Pengumuman sudah dibuka";
    if (list) list.style.display = "grid";
    return;
  }

  const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
  const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((selisih / (1000 * 60)) % 60);
  const detik = Math.floor((selisih / 1000) % 60);

  el.innerHTML = `Dibuka dalam ${hari} hari ${jam} jam ${menit} menit ${detik} detik`;

  if (list) list.style.display = "none";
}

setInterval(updateCountdown, 1000);
updateCountdown();


// ================= INDEX =================
if (document.getElementById("listSiswa")) {
  const container = document.getElementById("listSiswa");

  siswa.forEach(s => {
    const card = document.createElement("div");
    card.className = "siswa-card";

    card.innerHTML = `
      <img src="${s.foto}">
      <p>${s.nama}</p>
    `;

    card.onclick = () => {
      const now = new Date().getTime();

      if (now < targetDate) {
        alert("Pengumuman belum dibuka!");
        return;
      }

      localStorage.setItem("nama", s.nama);
      window.location.href = "login.html";
    };

    container.appendChild(card);
  });
}


// ================= LOGIN =================
if (document.getElementById("code")) {
  window.cek = function () {
    const now = new Date().getTime();

    if (now < targetDate) {
      alert("Pengumuman belum dibuka!");
      window.location.href = "index.html";
      return;
    }

    const nama = localStorage.getItem("nama");
    const pass = document.getElementById("code").value;

    const data = siswa.find(s => s.nama === nama);

    if (data && data.code === pass) {
      localStorage.setItem("status", data.status);
      window.location.href = "result.html";
    } else {
      alert("Kode salah!");
    }
  };
}


// ================= RESULT =================
if (document.getElementById("hasil")) {
  const now = new Date().getTime();

  if (now < targetDate) {
    alert("Pengumuman belum dibuka!");
    window.location.href = "index.html";
  }

  const status = localStorage.getItem("status");

  setTimeout(() => {
    document.getElementById("loading").style.display = "none";

    const hasil = document.getElementById("hasil");
    hasil.style.display = "block";

    if (status === "LULUS") {
      hasil.innerHTML = "SELAMAT ANDA LULUS";
      hasil.style.color = "#00ffcc";
    } else {
      hasil.innerHTML = "SILAHKAN DATANG KE SEKOLAH";
      hasil.style.color = "#ff4d4d";
    }

  }, 3000);
}
