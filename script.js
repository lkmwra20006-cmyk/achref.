const canvas = document.getElementById("ai-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let number = 80;

// إنشاء النقاط
for (let i = 0; i < number; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 1,
    vy: (Math.random() - 0.5) * 1
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // رسم النقاط
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // ارتداد من الحواف
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "#00ffcc";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  });

  // رسم الخطوط (شبكة)
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = "rgba(0,255,200," + (1 - dist / 120) + ")";
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

// تشغيل فقط إذا ليست الصفحة الثانية
if (!window.location.pathname.includes("page2")) {
  animate();
}