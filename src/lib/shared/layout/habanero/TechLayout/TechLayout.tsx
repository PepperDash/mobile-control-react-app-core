import React from 'react';

import classes from './TechLayout.module.scss';

export const TechLayout = ({header, content, leftNav}: TechLayoutProps ) => {
  
  return (
    <div className={classes.grid}>
      <div className={classes.header}>{header}</div>
      <div className={classes.leftNav}>{leftNav}</div>
      <div className={classes.content}>{content}</div>
    </div>
    );
}

interface TechLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  leftNav: React.ReactNode;
}