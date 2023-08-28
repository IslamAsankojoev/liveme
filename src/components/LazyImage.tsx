import { FC } from 'react';
import NextImage, { ImageProps } from 'next/image';
import {
  styled,
  // bgcolor,
  // compose,
  // spacing,
  // borderRadius,
  // SpacingProps,
  // BordersProps,
} from '@mui/system';

// type Props = ImageProps & BordersProps & SpacingProps;

// compose(spacing, borderRadius, bgcolor)

const LazyImage = styled<FC<ImageProps>>((props) => <NextImage {...props} />)({
  width: '100%',
  objectFit: 'contain',
});

export default LazyImage;
