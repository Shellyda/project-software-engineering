import React from 'react';

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  value: string;
}

const Tag: React.FC<TagProps> = ({ id, value, ...rest }) => (
  <div
    id={id}
    className="bg-black-primary border rounded-xl p-2 flex items-center justify-center"
    {...rest}
  >
    <p className="text-white text-xs truncate" style={{ fontSize: '10px' }}>
      {value}
    </p>
  </div>
);

export default Tag;
