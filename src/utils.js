
function bestColorByLuma(colors) {
  // Find the best color by luma
  var bestColor = colors[0];
  var bestLuma = 0;

  colors.forEach((color) => {
    var luma = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];

    if (luma > bestLuma) {
      bestLuma = luma;
      bestColor = color;
    }
  });

  return bestColor;
}

function sortColorsByLuma(colors) {
  // Sort colors by luma
  var sortedColors = [];

  colors.forEach((color) => {
    var luma = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];

    sortedColors.push([color, luma]);
  });

  sortedColors.sort((a, b) => {
    return b[1] - a[1];
  });
  
  return sortedColors.map((color) => {
    return color[0];
  });
}

const Color2RGB = (color) => {
  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}


const noteByKey = (key) => {
    var notes = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    return notes[key];
}

export { bestColorByLuma, sortColorsByLuma, Color2RGB, noteByKey };
