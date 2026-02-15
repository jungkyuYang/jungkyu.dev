export const mapLevelToColor = (stacks) => {
    if (!stacks) return [];
    
    const colors = {
      "상": "bg-emerald-500",
      "중": "bg-amber-500",
      "하": "bg-slate-400"
    };
  
    return stacks.map(stack => ({
      ...stack,
      color: colors[stack.level] || "bg-zinc-500"
    }));
  };