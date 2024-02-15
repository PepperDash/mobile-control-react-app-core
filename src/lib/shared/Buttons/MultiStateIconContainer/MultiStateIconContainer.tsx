import { ReactNode } from "react";

export const MultiStateIconContainer = ({
  ActiveImage,
  DisabledImage,
  EnabledImage,
  active,
  disabled,
}: MultiStateIconContainerProps) => {
  return  disabled ? 
    DisabledImage 
   : active ? ActiveImage : EnabledImage;
};

export interface MultiStateIconContainerProps {
  ActiveImage: ReactNode;
  DisabledImage: ReactNode; 
  EnabledImage: ReactNode;
  active?: boolean;
  disabled?: boolean;
}
