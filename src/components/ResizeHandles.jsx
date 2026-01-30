const HANDLES = [
  { position: "top", cursor: "ns-resize" },
  { position: "bottom", cursor: "ns-resize" },
  { position: "left", cursor: "ew-resize" },
  { position: "right", cursor: "ew-resize" },
  { position: "top-left", cursor: "nwse-resize" },
  { position: "top-right", cursor: "nesw-resize" },
  { position: "bottom-left", cursor: "nesw-resize" },
  { position: "bottom-right", cursor: "nwse-resize" },
];

const ResizeHandles = ({ onResizeStart }) => {
  return (
    <>
      {HANDLES.map(({ position, cursor }) => (
        <div
          key={position}
          className={`resize-handle resize-${position}`}
          style={{ cursor }}
          data-handle={position}
          onMouseDown={(e) => onResizeStart(e, position)}
        />
      ))}
    </>
  );
};

export default ResizeHandles;
