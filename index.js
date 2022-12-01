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
 * Returns the string representation of a number rounded to a maximum of 15
 * decimal places
 *
 * @param      {Number} num     The number to show.
 */
function round(num) {
  const str = num.toPrecision(15).replace(/(^\d*\..*?)0*$/g, '$1'); 
  return str.endsWith('.') ? str.slice(0, -1) : str;
}
console.log(round(150))
console.log(round(42.0))
console.log(round(69.00420))

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

  if ([p1.x, p1.y, p2.x, p2.y, p3.x, p3.y].some(Number.isNaN)) {
    return showError('One or more input fields are invalid.');
  }

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
  $('#result1').text(`(${round(res1.x)}, ${round(res1.y)})`);
  $('#result2').text(`(${round(res2.x)}, ${round(res2.y)})`);
  $('#result3').text(`(${round(res3.x)}, ${round(res3.y)})`);

  console.log(res1, res2, res3);
});
