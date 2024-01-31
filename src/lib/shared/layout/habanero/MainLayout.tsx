import React from 'react';
import classes from './MainLayout.module.scss';

/**
 * The main layout, based on Habanero with a header, footer and content area with volume on the right side.
 * Uses CSS grid
 * @param param0 
 * @returns 
 */
export const MainLayout = ({header, footer, content, volume, showVolume}: MainLayoutProps) => {
  return (
    <div className={classes.grid}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
      {showVolume && <div className={classes.volume}>{volume}</div>}
      <div className={classes.footer}>{footer}</div>
    </div>
    );
}

interface MainLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
  volume: React.ReactNode;
  showVolume?: boolean;
}