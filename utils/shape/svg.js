const Svg = {};

Svg.pathToVertices = function (path, sampleLength) {

  var i, il, total, point, segment, segments,
    segmentsQueue, lastSegment,
    lastPoint, segmentIndex, points = [],
    lx, ly, length = 0, x = 0, y = 0;

  sampleLength = sampleLength || 15;

  var addPoint = function (px, py, pathSegType) {
    // all odd-numbered path types are relative except PATHSEG_CLOSEPATH (1)
    var isRelative = pathSegType % 2 === 1 && pathSegType > 1;

    // when the last point doesn't equal the current point add the current point
    if (!lastPoint || px != lastPoint.x || py != lastPoint.y) {
      if (lastPoint && isRelative) {
        lx = lastPoint.x;
        ly = lastPoint.y;
      } else {
        lx = 0;
        ly = 0;
      }

      var point = {
        x: lx + px,
        y: ly + py
      };

      // set last point
      if (isRelative || !lastPoint) {
        lastPoint = point;
      }

      points.push(point);

      x = lx + px;
      y = ly + py;
    }
  };

  var addSegmentPoint = function (segment) {
    var segType = segment.pathSegTypeAsLetter.toUpperCase();

    // skip path ends
    if (segType === 'Z')
      return;

    // map segment to x and y
    switch (segType) {

      case 'M':
      case 'L':
      case 'T':
      case 'C':
      case 'S':
      case 'Q':
        x = segment.x;
        y = segment.y;
        break;
      case 'H':
        x = segment.x;
        break;
      case 'V':
        y = segment.y;
        break;
    }

    addPoint(x, y, segment.pathSegType);
  };

  // ensure path is absolute
  Svg._svgPathToAbsolute(path);

  // get total length
  total = path.getTotalLength();

  // queue segments
  segments = [];
  for (i = 0; i < path.pathSegList.numberOfItems; i += 1)
    segments.push(path.pathSegList.getItem(i));

  segmentsQueue = segments.concat();

  // sample through path
  while (length < total) {
    // get segment at position
    segmentIndex = path.getPathSegAtLength(length);
    segment = segments[segmentIndex];

    // new segment
    if (segment != lastSegment) {
      while (segmentsQueue.length && segmentsQueue[0] != segment)
        addSegmentPoint(segmentsQueue.shift());

      lastSegment = segment;
    }

    // add points in between when curving
    // TODO: adaptive sampling
    switch (segment.pathSegTypeAsLetter.toUpperCase()) {

      case 'C':
      case 'T':
      case 'S':
      case 'Q':
      case 'A':
        point = path.getPointAtLength(length);
        addPoint(point.x, point.y, 0);
        break;

    }

    // increment by sample value
    length += sampleLength;
  }

  // add remaining segments not passed by sampling
  for (i = 0, il = segmentsQueue.length; i < il; ++i)
    addSegmentPoint(segmentsQueue[i]);

  return points;
};

Svg._svgPathToAbsolute = function (path) {
  // http://phrogz.net/convert-svg-path-to-all-absolute-commands
  // Copyright (c) Gavin Kistner
  // http://phrogz.net/js/_ReuseLicense.txt
  // Modifications: tidy formatting and naming
  var x0, y0, x1, y1, x2, y2, segs = path.pathSegList,
    x = 0, y = 0, len = segs.numberOfItems;

  for (var i = 0; i < len; ++i) {
    var seg = segs.getItem(i),
      segType = seg.pathSegTypeAsLetter;

    if (/[MLHVCSQTA]/.test(segType)) {
      if ('x' in seg) x = seg.x;
      if ('y' in seg) y = seg.y;
    } else {
      if ('x1' in seg) x1 = x + seg.x1;
      if ('x2' in seg) x2 = x + seg.x2;
      if ('y1' in seg) y1 = y + seg.y1;
      if ('y2' in seg) y2 = y + seg.y2;
      if ('x' in seg) x += seg.x;
      if ('y' in seg) y += seg.y;

      switch (segType) {

        case 'm':
          segs.replaceItem(path.createSVGPathSegMovetoAbs(x, y), i);
          break;
        case 'l':
          segs.replaceItem(path.createSVGPathSegLinetoAbs(x, y), i);
          break;
        case 'h':
          segs.replaceItem(path.createSVGPathSegLinetoHorizontalAbs(x), i);
          break;
        case 'v':
          segs.replaceItem(path.createSVGPathSegLinetoVerticalAbs(y), i);
          break;
        case 'c':
          segs.replaceItem(path.createSVGPathSegCurvetoCubicAbs(x, y, x1, y1, x2, y2), i);
          break;
        case 's':
          segs.replaceItem(path.createSVGPathSegCurvetoCubicSmoothAbs(x, y, x2, y2), i);
          break;
        case 'q':
          segs.replaceItem(path.createSVGPathSegCurvetoQuadraticAbs(x, y, x1, y1), i);
          break;
        case 't':
          segs.replaceItem(path.createSVGPathSegCurvetoQuadraticSmoothAbs(x, y), i);
          break;
        case 'a':
          segs.replaceItem(path.createSVGPathSegArcAbs(x, y, seg.r1, seg.r2, seg.angle, seg.largeArcFlag, seg.sweepFlag), i);
          break;
        case 'z':
        case 'Z':
          x = x0;
          y = y0;
          break;

      }
    }

    if (segType == 'M' || segType == 'm') {
      x0 = x;
      y0 = y;
    }
  }
};

export default Svg;
