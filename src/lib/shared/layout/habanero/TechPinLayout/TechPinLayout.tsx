import classes from './TechPinLayout.module.scss';

export const TechPinLayout = ({className, header, content}: TechLayoutProps ) => {
  
  return (
    <div className={`${className} ${classes.grid}`}>
      <div className={classes.header}>{header}</div>
      <div className={classes.content}>{content}</div>
    </div>
    );
}

interface TechLayoutProps {
  header: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}