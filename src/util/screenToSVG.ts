import IPoint from '../types/IPoint';

export default (svg: SVGSVGElement, x: number, y: number): IPoint => {
  const svgPoint = svg.createSVGPoint();
  svgPoint.x = x;
  svgPoint.y = y;
  const transform = svg.getScreenCTM();
  if (!transform) {
    throw new Error("Couldn't get screen transform");
  }
  return svgPoint.matrixTransform(transform.inverse());
};
