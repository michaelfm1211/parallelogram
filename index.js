import $ from 'jquery';
import {LinearEquation, Point} from './math.js';

/**
 * Shows an error.
 *
 * @param      {string} error    The error text
 */
function showError(error) {
  $('#main').prepend(`
<div class="alert alert-danger alert-dismissible" role="alert">
  ${error}
  <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
</div>`);
}

/**
 * Finds a fourth point of parallelogram ABCD, given the inputs as ABC,
 * respectively and the output as D.
 * @param      {Point}  p1      The first point (adjacent to ouput)
 * @param      {Point}  p2      The second point (remote to output)
 * @param      {Point}  p3      The third point (adjacent to output)
 * @return     {Point}
 */
function findPoint(p1, p2, p3) {
  const slope1 = Point.slope(p2, p1);
  const slope2 = Point.slope(p2, p3);

  let eq1;
  if (isNaN(slope1)) eq1 = new LinearEquation(1, 0, p3.x);
  else eq1 = LinearEquation.fromPointSlope(p3, slope1);

  let eq2;
  if (isNaN(slope2)) eq2 = new LinearEquation(1, 0, p1.x);
  else eq2 = LinearEquation.fromPointSlope(p1, slope2);

  return LinearEquation.solveTwo(eq1, eq2);
}

$(() => {
  $('#results').hide();
});

$('#error-close').on('click', () => {
  $('#errors').hide();
});

$('#clear').on('clear', () => {
  $('#results').hide();
});

$('#points').on('submit', (e) => {
  e.preventDefault();

  const p1 = new Point(parseFloat($('#p1x').val()),
      parseFloat($('#p1y').val()));
  const p2 = new Point(parseFloat($('#p2x').val()),
      parseFloat($('#p2y').val()));
  const p3 = new Point(parseFloat($('#p3x').val()),
      parseFloat($('#p3y').val()));

  if (!p1.x || !p1.y || !p2.x || !p2.y || !p3.x || !p3.y) {
    return showError('One or more input fields are empty.');
  }

  // const res1 = findPoint(p1, p3, p2);
  // const res2 = findPoint(p2, p1, p3);
  // const res3 = findPoint(p3, p2, p1);
  let res1;
  let res2;
  let res3;
  try {
    res1 = findPoint(p1, p2, p3);
    res2 = findPoint(p2, p1, p3);
    res3 = findPoint(p1, p3, p2);
  } catch (error) {
    showError('Unexpected error while calculating points.');
    console.log(res1, res2, res3);
    return console.log(error);
  }

  $('#results').show();
  $('#result1').text(`(${res1.x}, ${res1.y})`);
  $('#result2').text(`(${res2.x}, ${res2.y})`);
  $('#result3').text(`(${res3.x}, ${res3.y})`);

  console.log(res1, res2, res3);
});
