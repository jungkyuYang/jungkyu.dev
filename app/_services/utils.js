export const getTechIconUrl = (techName) => {
    if (!techName) return null;
    
    const slug = techName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "")
      .replace(/\./g, "dot"); 
      
    return `https://cdn.simpleicons.org/${slug}`;
  };