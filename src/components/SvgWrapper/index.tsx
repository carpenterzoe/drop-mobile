import { ReactSVG } from 'react-svg';

interface IProps {
  src?: string;
  color?: string;
  width?: string;
  height?: string;
}

/**
*   svg组件
*/
const SvgWrapper = ({
  src,
  color,
  width,
  height,
}: IProps) => {
  const beforeInjectionHandler = (svg: SVGSVGElement) => {
    svg.setAttribute('style', `height: ${height};width:${width}`);
    svg.childNodes.forEach((item) => {
      const it = item as HTMLElement;
      if (it.tagName === 'path' && color) {
        it.setAttribute('fill', color);
      }
    });
  };

  if (!src) {
    return null;
  }

  return (
    <ReactSVG
      src={src}
      wrapper="span"
      beforeInjection={beforeInjectionHandler}
    />
  );
};

SvgWrapper.defaultProps = {
  src: '',
  color: '',
  width: '20',
  height: '20',
};
export default SvgWrapper;
