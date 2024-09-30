import { ComponentWithAs, IconProps } from '@chakra-ui/react';
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

type IconsType =
  | ComponentWithAs<'svg', IconProps>
  | ForwardRefExoticComponent<
      Omit<SVGProps<SVGSVGElement>, 'ref'> & {
        title?: string;
        titleId?: string;
      } & RefAttributes<SVGSVGElement>
    >;

export interface IconButtonProps {
  isActive: boolean;
  outlineIcon: IconsType;
  solidIcon: IconsType;
  onClick: () => void;
  width?: number;
  height?: number;
}
