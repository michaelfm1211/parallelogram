/**
 * This class describes a point.
 */
class Point {
  /**
   * Create a new point given x and y coordinates.
   * @param      {number}  x       x coordinate of point
   * @param      {number}  y       y coordinate of point
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Returns slope of two points, and return NaN if slope is undefined.
   * @static
   * @param      {Point}  p1      The first point
   * @param      {Point}  p2      The second point
   * @return     {number}
   */
  static slope(p1, p2) {
    const slope = (p2.y - p1.y) / (p2.x - p1.x);
    if (Math.abs(slope) === Infinity) return NaN;
    else return slope;
  }

  /**
   * Returns distance between two points
   * @param      {Point}  p1      The first point
   * @param      {Point}  p2      The second point
   * @return     {number}
   */
  static dist(p1, p2) {
    return Math.sqrt((p2.x-p1.x)^2 + (p2.y-p1.y)^2);
  }
}

/**
 * This class describes a linear equation.
 */
class LinearEquation {
  /**
   * Make new linear equation from standard form.
   * @constructor
   * @param      {number}  a    The coefficent of the x term
   * @param      {number}  b    The coefficent of the y term
   * @param      {number}  c    The constant
   */
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  /**
   * Makes a new linear equation from point-slope form
   * @param      {Point}   point    A point on the line
   * @param      {number}  slope    The slope of the line
   * @return     {LinearEquation}
   */
  static fromPointSlope(point, slope) {
    return new LinearEquation(-slope, 1, -slope*point.x + point.y);
  }

  /**
   * Solve a system of two linear equations using Cramer's Rule
   * @param      {LinearEquation}  eq1     The first equation
   * @param      {LinearEquation}  eq2     The second equation
   * @return     {Point}
   */
  static solveTwo(eq1, eq2) {
    const x = (eq1.c*eq2.b - eq1.b*eq2.c) / (eq1.a*eq2.b - eq1.b*eq2.a);
    const y = (eq1.a*eq2.c - eq1.c*eq2.a) / (eq1.a*eq2.b - eq1.b*eq2.a);
    return new Point(x, y);
  }
}

export {LinearEquation, Point};
