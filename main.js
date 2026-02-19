class LottoBall extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const number = this.getAttribute('number');
    const color = this.getColor(number);
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --ball-color: ${color};
        }
        .ball {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
          background: radial-gradient(circle at 20px 20px, var(--ball-color), #fff);
          box-shadow: 0 5px 10px rgba(0,0,0,0.15);
          transition: transform 0.3s ease-in-out;
        }
        .ball:hover {
          transform: scale(1.1);
        }
      </style>
      <div class="ball">${number}</div>
    `;
  }

  getColor(number) {
    if (number <= 10) return '#ffeb3b'; // Yellow
    if (number <= 20) return '#4caf50'; // Green
    if (number <= 30) return '#2196f3'; // Blue
    if (number <= 40) return '#9c27b0'; // Purple
    return '#f44336'; // Red
  }
}

customElements.define('lotto-ball', LottoBall);

// Lotto Generation Logic
document.getElementById('generate-btn').addEventListener('click', () => {
    const numbersContainer = document.getElementById('numbers-container');
    numbersContainer.innerHTML = '';
    const numbers = new Set();
    while(numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    
    const sortedNumbers = [...numbers].sort((a,b) => a-b);
    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('lotto-ball');
            ball.setAttribute('number', number);
            numbersContainer.appendChild(ball);
        }, index * 100);
    });
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    }
});
