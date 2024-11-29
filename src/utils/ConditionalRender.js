
const ConditionalRender = ({ 
  data, 
  isArray = false, 
  isNumber = false, 
  isString = false, 
  children 
}) => {
  // Check if data is a valid array and not empty
  if (isArray && Array.isArray(data) && data.length > 0) {
    return children(data);
  }

  // Check if data is a valid number
  if (isNumber && typeof data === 'number') {
    return children(data);
  }

  // Check if data is a valid, non-empty string
  if (isString && typeof data === 'string' && data.trim()) {
    return children(data);
  }

  // Render nothing if no condition is satisfied
  return null;
};

export default ConditionalRender;
