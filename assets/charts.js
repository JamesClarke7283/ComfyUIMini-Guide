const vibrantPalette = {
  blue: "#003f5c",
  purple: "#58508d",
  pink: "#bc5090",
  orange: "#ff6361",
  yellow: "#ffa600",
};

const tooltipTitleCallback = (tooltipItems) => {
  const item = tooltipItems[0];
  let label = item.chart.data.labels[item.dataIndex];
  if (Array.isArray(label)) {
    return label.join(" ");
  }
  return label;
};

function wrapLabels(labels, maxWidth) {
  return labels.map((label) => {
    if (label.length <= maxWidth) {
      return label;
    }
    const words = label.split(" ");
    const lines = [];
    let currentLine = "";
    words.forEach((word) => {
      if (
        (currentLine + " " + word).trim().length > maxWidth &&
        currentLine.length > 0
      ) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = (currentLine + " " + word).trim();
      }
    });
    lines.push(currentLine);
    return lines;
  });
}

const sharedChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        font: {
          family: "'Inter', sans-serif",
          size: 16,
        },
        color: "#4a5568",
      },
    },
    tooltip: {
      callbacks: {
        title: tooltipTitleCallback,
      },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "#4a5568",
        font: { family: "'Inter', sans-serif" },
      },
      grid: { color: "#e2e8f0" },
    },
    x: {
      ticks: {
        color: "#4a5568",
        font: { family: "'Inter', sans-serif" },
      },
      grid: { display: false },
    },
  },
};

new Chart(document.getElementById("promptAnatomyChart"), {
  type: "bar",
  data: {
    labels: ["Subject", "Style / Medium", "Context & Details"],
    datasets: [
      {
        label: "Importance in Prompt",
        data: [70, 20, 10],
        backgroundColor: [
          vibrantPalette.pink,
          vibrantPalette.purple,
          vibrantPalette.yellow,
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  },
  options: {
    ...sharedChartOptions,
    indexAxis: "y",
    plugins: {
      ...sharedChartOptions.plugins,
      legend: { display: false },
    },
    scales: {
      x: {
        ...sharedChartOptions.scales.x,
        title: {
          display: true,
          text: "Relative Importance (%)",
          color: "#4a5568",
        },
      },
      y: sharedChartOptions.scales.y,
    },
  },
});

new Chart(document.getElementById("modelComparisonChart"), {
  type: "radar",
  data: {
    labels: wrapLabels(
      [
        "Natural Language Understanding",
        "Direct Control",
        "Negative Prompt Power",
        "Ease for Beginners",
        "Text Generation",
      ],
      16,
    ),
    datasets: [
      {
        label: "Chroma",
        data: [8, 9, 9, 8, 7],
        fill: true,
        backgroundColor: "rgba(188, 80, 144, 0.2)",
        borderColor: vibrantPalette.pink,
        pointBackgroundColor: vibrantPalette.pink,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: vibrantPalette.pink,
      },
      {
        label: "FLUX.1",
        data: [10, 4, 3, 5, 9],
        fill: true,
        backgroundColor: "rgba(88, 80, 141, 0.2)",
        borderColor: vibrantPalette.purple,
        pointBackgroundColor: vibrantPalette.purple,
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: vibrantPalette.purple,
      },
    ],
  },
  options: {
    ...sharedChartOptions,
    scales: {
      r: {
        angleLines: { color: "#e2e8f0" },
        grid: { color: "#e2e8f0" },
        pointLabels: {
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#4a5568",
        },
        ticks: {
          display: false,
          stepSize: 2,
        },
        min: 0,
        max: 10,
      },
    },
  },
});

new Chart(document.getElementById("negativePromptChart"), {
  type: "doughnut",
  data: {
    labels: [
      "General Quality Control",
      "Active Style Steering",
      "Specific Object Removal",
    ],
    datasets: [
      {
        label: "Negative Prompt Usage",
        data: [65, 30, 5],
        backgroundColor: [
          vibrantPalette.purple,
          vibrantPalette.yellow,
          vibrantPalette.orange,
        ],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 4,
      },
    ],
  },
  options: {
    ...sharedChartOptions,
    cutout: "60%",
    plugins: {
      ...sharedChartOptions.plugins,
      legend: { position: "bottom" },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
});
