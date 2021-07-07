import numeric from "numeric";

// Common Trig functions
let cos = Math.cos;
let sin = Math.sin;
let pi = Math.PI;
let sqrt = Math.sqrt;
let atan2 = Math.atan2;
let acos = Math.acos;

// 3D rotation matricies
// See: https://en.wikipedia.org/wiki/Rotation_matrix
function rotateX(t) {
    return [[1, 0, 0], [0, cos(t), -sin(t)], [0, sin(t), cos(t)]];
}

function rotateY(t) {
    return [[cos(t), 0, sin(t)], [0, 1, 0], [-sin(t), 0, cos(t)]];
}

function rotateZ(t) {
    return [[cos(t), -sin(t), 0], [sin(t), cos(t), 0], [0, 0, 1]];
}

// Unit vectors
let up = [[1], [0], [0]];
let north = [[0],[0],[1]];
let east = [[0], [1], [0]];

// Display degrees

export const toDeg = radians => {
    let deg = radians / pi * 180;
    return Math.round(deg * 100) / 100.0;
}

// -------------------------------------------
// Astronomical constants
// -------------------------------------------

// See: http://www.astrophysicsspectator.com/tables/Earth.html
// See: http://www.timeanddate.com/astronomy/perihelion-aphelion-solstice.html (for perihelion)
// See: http://www.timeanddate.com/calendar/december-solstice.html (for solstice)
// See: http://www.esrl.noaa.gov/gmd/grad/solcalc/ (for solstice_longitude, found by trial and error to be 107.2E)

// Orbit
let sidereal_rotation = 86164.09054;       // seconds
let sidereal_orbit = 365.242190;           // days
let axial_tilt = 23.44;                    // degrees

// Summer Solstice (Southern Hemisphere)
let summer_solstice = Date.UTC(2015, 11, 22, 4, 49, 0); // Solstice
let solstice_longitude = 107.2 // At 107.2E, Solar noon coincides with the summer solstice

// Eccentricity of orbit
let orbit_eccentricity = 0.01671022;
let perihelion = Date.UTC(2016, 0, 2, 22, 49, 0);
let solstice_to_perihelion = (perihelion - summer_solstice) / 1000; // seconds between solstice and perihelion

// -------------------------------------------
// Kepler's equations
// -------------------------------------------

// Calculate eccentric anomaly (E) from eccentricity (e) and mean anomaly (M)
// See: http://www.jgiesen.de/kepler/kepler.html
// See: https://en.wikipedia.org/wiki/True_anomaly
function E(e, M) {
    // Solve Kepler's equations with 5 iterations of Newton's method
    // 0 = f(E) = E - e * sin(E) - M
    function f(E) {
        return E - e * sin(E) - M;
    }
    function df(E) { // first derivative of f(E)
        return 1 - e * cos(E)
    }
    // Newton's method
    let x = M;
    for (let i=0; i < 2; i++) {
        x = x - f(x) / df(x);
    }
    return x;
}

// Calculate true anomaly from eccentricity (e) and eccentric anomaly (E)
// See: http://www.jgiesen.de/kepler/kepler.html
// See: https://en.wikipedia.org/wiki/True_anomaly
function phi(e, E) {
    return 2 * atan2(sqrt(1 + e) * sin(E / 2), sqrt(1 - e) * cos(E / 2));
}


// -------------------------------------------
// Compute Earth's rotation and Sun position
// -------------------------------------------

function rotateEarth(currentTime, latitude, longitude) {
    // Convert coordinates to radians
    latitude = latitude / 180 * pi;
    longitude = longitude / 180 * pi;

    // Rotate for latitude
    let rotation = rotateY(-latitude);
    // Rotate for longitude
    rotation = numeric.dot(rotateZ(longitude), rotation);
    // Correct for solstice longitude
    rotation = numeric.dot(rotateZ(-solstice_longitude / 180 * pi), rotation)
    // Spin the planet according to time since solstice
    rotation = numeric.dot(rotateZ(currentTime / sidereal_rotation * 2 * pi), rotation)
    // Tilt for earth's axis
    rotation = numeric.dot(rotateY(-axial_tilt / 180 * pi), rotation)

    return rotation;
}

export const sunVector = (currentTime, useEccentricity) => {
    // -------------------------------------------------------------
    // What is the angle of the earth? (assuming circular orbit)
    let sun_angle = currentTime / 24.0 / 60 / 60 / sidereal_orbit * 2 * pi;

    // Get the correct sun_angle if we're using an elliptical orbit
    if (useEccentricity) {
        let mean_anomaly = (currentTime - solstice_to_perihelion) / 24.0 / 60 / 60 / sidereal_orbit * 2 * pi;
        let solstice_mean_anomaly = -solstice_to_perihelion / 24.0 / 60 / 60 / sidereal_orbit * 2 * pi;
        let solstice_angle = phi(orbit_eccentricity, E(orbit_eccentricity, solstice_mean_anomaly));
        let true_eccentricity = phi(orbit_eccentricity, E(orbit_eccentricity, mean_anomaly));
        sun_angle = true_eccentricity - solstice_angle;
    }

    // Get the position of the earth
    let earth = [[-1], [0], [0]];
    earth = numeric.dot(rotateZ(sun_angle), earth);

    // Sun vector is the inverse of the Earth vector
    let sun = numeric.neg(earth);
    return sun;
}


export const currentUTC = (Year, Month, Day, Hour, Minutes, TimeZone) => {
        let utc = Date.UTC(Year, Month - 1, Day, Hour, Minutes);
        utc = utc - TimeZone * 1000 * 60 * 60;
        return utc;
    };

// -------------------------------------------
// Elevation and Azimuth of the Sun, from Earth
// -------------------------------------------

export const elevation = (currentUTC, latitude, longitude, useEccentricity) => {

    let time_utc = (currentUTC - summer_solstice) / 1000.0
    let sun = sunVector(time_utc, useEccentricity);
    let rot = rotateEarth(time_utc, latitude, longitude);
    let dot = numeric.dot(numeric.transpose(sun), numeric.dot(rot, up));
    let angle = acos(dot);
    return pi/2-angle;
}

export const azimuth = (currentUTC, latitude, longitude, useEccentricity) => {
    let time_utc = (currentUTC - summer_solstice) / 1000.0
    let sun = sunVector(time_utc, useEccentricity);
    let rot = rotateEarth(time_utc, latitude, longitude);
    let dotN = numeric.dot(numeric.transpose(sun), numeric.dot(rot, north));
    let dotE = numeric.dot(numeric.transpose(sun), numeric.dot(rot, east));
    let angle = atan2(dotE, dotN);
    return angle;

}


