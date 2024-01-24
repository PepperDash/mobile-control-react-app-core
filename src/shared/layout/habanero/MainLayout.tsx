import React from 'react';
import './MainLayout.scss';

/**
 * The main layout, based on Habanero with a header, footer and content area with volume on the right side.
 * Uses CSS grid
 * @param param0 
 * @returns 
 */
const MainLayout = ({header, footer, content, volume}: MainLayoutProps) => {
  return (
    <div className='grid'>
      <div className='header'>{header}</div>
      <div className='content'>{content}</div>
      <div className='volume'>{volume}</div>
      <div className='footer'>{footer}</div>
    </div>
    );
}

export default MainLayout;

interface MainLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
  volume: React.ReactNode;
}