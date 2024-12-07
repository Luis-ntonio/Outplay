import React, {useState} from 'react';
import ImageColumns from '../ImageColumns/ImageColumns';
import '../ImageColumns/ImageColumns.css';
import './GeneralBox.css';

interface GeneralBoxProps {
  item: string;
  images: string[];
  icons: string[];
}

const GeneralBox: React.FC<GeneralBoxProps> = ({ item, images, icons }) => {
  const [expanded, setExpanded] = useState(false);

  const handleBoxClick = () => {
    setExpanded(!expanded);
  };
  // Calculate number of images per column
  const handleInnerBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Prevent event propagation to parent (outer) box
    event.stopPropagation();
  };

  let var_ = item+ "Box";
  return (
    <div className={`GeneralBox ${expanded ? 'active' : ''}`} onClick={handleBoxClick}>
      <div className={`GeneralText`} >
        <img className="icon" style={{height: "100%"}} src={`/assets/images/png/icons/${item}.svg`} alt={`${item}`} />
        <span className="text52">Encabezado {item}</span>
      </div>
      <div id={`${item}Box`} className={`collapsible ${expanded ? 'active' : ''}`}onClick={handleInnerBoxClick}>
        <ImageColumns type={item} images={images}/>
      </div>
    </div>
  );
};

export default GeneralBox;

