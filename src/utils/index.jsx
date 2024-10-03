/**
 * Check if a string is a valid JSON string
 * @param {string} str - The string to check
 * @returns {boolean} - True if the string is a valid JSON string, false otherwise
 */
function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return false;
    }
    throw e;
  }
  return true;
}

/**
 * Calculates the angles of a point in 3D space relative to the positive XY, YZ, and ZX planes.
 * The angles are measured clockwise from the positive quadrant of each plane.
 *
 * @param {number} x - The x-coordinate of the point in 3D space.
 * @param {number} y - The y-coordinate of the point in 3D space.
 * @param {number} z - The z-coordinate of the point in 3D space.
 * @returns {Object.<string, number>} An object containing the angles relative to the XY, YZ, and ZX planes in degrees.
 *  - `xyPlane` - Angle from the XY plane.
 *  - `yzPlane`: Angle from the YZ plane.
 *  - `zxPlane`: Angle from the ZX plane.
 * @example
 * const angles = calculateAngles(1, 1, 1);
 * console.log(angles);
 * // { xyPlane: 35.2, yzPlane: 35.2, zxPlane: 35.2 }
 */
function calculateAngles(x, y, z) {
  // Convert radians to degrees
  const radToDeg = (/** @type {number} */ radians) => Math.round((radians * 1800) / Math.PI) / 10;

  // Calculate the projection angles relative to each plane
  const xyPlane = radToDeg(Math.atan2(z, Math.sqrt(x * x + y * y))); // Angle between XY and Z axis
  const yzPlane = radToDeg(Math.atan2(x, Math.sqrt(y * y + z * z))); // Angle between YZ and X axis
  const zxPlane = radToDeg(Math.atan2(y, Math.sqrt(x * x + z * z))); // Angle between ZX and Y axis

  return {
    // todo: adjust according to the quadrant (Clockwise from positive axes)
    // xyPlane: xyPlane < 0 ? xyPlane + 360 : xyPlane,
    xyPlane: xyPlane,
    yzPlane: yzPlane,
    zxPlane: zxPlane,
  };
}

export { isJsonString, calculateAngles };
